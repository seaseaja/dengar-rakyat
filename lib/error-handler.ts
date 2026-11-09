/**
 * Error Handler - Iterasi 2 H5
 * - Sanitize errors (remove stack traces in production)
 * - Generic error messages
 * - Structured logging
 */

import { NextResponse } from "next/server";

interface ErrorResponse {
  error: string;
  code?: string;
  details?: any;
}

/**
 * Handle API errors safely (FAIL-CLOSED)
 * @param error Error object
 * @param context Additional context for logging
 * @returns NextResponse with sanitized error
 * 
 * IMPORTANT: Fail-closed policy
 * - On error, deny access by default (return 500/401, NOT 200)
 * - Never expose sensitive info (stack traces, DB structure)
 */
export function handleApiError(
  error: unknown,
  context?: string
): NextResponse<ErrorResponse> {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Log full error server-side (with timestamp & context)
  // FIX: Avoid format string injection - use proper format strings
  const contextStr = context ? ` - ${context.replace(/%/g, "%%")}` : "";
  console.error(`[API Error${contextStr}] ${new Date().toISOString()}:`, error);

  // Determine error type
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(isDevelopment && { details: error.details }),
      },
      { status: error.status }
    );
  }

  // Database errors (CAREFUL: don't leak schema info)
  if (error && typeof error === "object" && "code" in error) {
    const dbError = error as { code: string; message: string; sqlMessage?: string };

    // MySQL error codes
    switch (dbError.code) {
      case "ER_DUP_ENTRY":
        return NextResponse.json(
          { error: "Data sudah ada", code: "DUPLICATE_ENTRY" },
          { status: 409 }
        );
      
      case "ER_NO_REFERENCED_ROW":
      case "ER_NO_REFERENCED_ROW_2":
        return NextResponse.json(
          { error: "Referensi data tidak valid", code: "INVALID_REFERENCE" },
          { status: 400 }
        );

      case "ER_BAD_FIELD_ERROR":
        return NextResponse.json(
          {
            error: "Kesalahan konfigurasi database",
            code: "DB_CONFIG_ERROR",
            // NEVER expose sqlMessage in production (leaks schema)
            ...(isDevelopment && { details: dbError.sqlMessage || dbError.message }),
          },
          { status: 500 }
        );
      
      case "ECONNREFUSED":
      case "ENOTFOUND":
        // Database connection failed
        return NextResponse.json(
          {
            error: "Layanan tidak tersedia",
            code: "SERVICE_UNAVAILABLE",
          },
          { status: 503 }
        );
    }
  }

  // FAIL-CLOSED: Unknown errors = 500 (NOT 200)
  // Generic error (don't leak details in production)
  return NextResponse.json(
    {
      error: "Terjadi kesalahan server",
      code: "INTERNAL_ERROR",
      // Only show details in development
      ...(isDevelopment && {
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    },
    { status: 500 }
  );
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest(message: string, details?: any): ApiError {
    return new ApiError(message, 400, "BAD_REQUEST", details);
  }

  static unauthorized(message: string = "Unauthorized"): ApiError {
    return new ApiError(message, 401, "UNAUTHORIZED");
  }

  static forbidden(message: string = "Forbidden"): ApiError {
    return new ApiError(message, 403, "FORBIDDEN");
  }

  static notFound(message: string = "Not found"): ApiError {
    return new ApiError(message, 404, "NOT_FOUND");
  }

  static conflict(message: string, details?: any): ApiError {
    return new ApiError(message, 409, "CONFLICT", details);
  }

  static tooManyRequests(message: string = "Too many requests"): ApiError {
    return new ApiError(message, 429, "RATE_LIMITED");
  }

  static internal(message: string = "Internal server error"): ApiError {
    return new ApiError(message, 500, "INTERNAL_ERROR");
  }
}

/**
 * Validation error helper
 */
export function validationError(errors: string[]): NextResponse {
  return NextResponse.json(
    {
      error: "Validasi gagal",
      code: "VALIDATION_ERROR",
      details: errors,
    },
    { status: 400 }
  );
}
