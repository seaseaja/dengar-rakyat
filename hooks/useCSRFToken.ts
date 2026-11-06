/**
 * CSRF Token Hook - Iterasi 2 H6
 * Fetch dan manage CSRF token untuk API calls
 */

"use client";

import { useEffect, useState } from "react";

export function useCSRFToken() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      setLoading(true);
      setError(null);

      // Note: Endpoint ini perlu dibuat di H6
      const response = await fetch("/api/auth/csrf", {
        credentials: "include", // Include session cookie
      });

      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }

      const data = await response.json();
      setCsrfToken(data.token);
    } catch (err) {
      console.error("CSRF token fetch error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = () => {
    fetchCsrfToken();
  };

  return {
    csrfToken,
    loading,
    error,
    refreshToken,
  };
}

/**
 * Helper function to include CSRF token in fetch options
 */
export function withCSRF(csrfToken: string | null, options: RequestInit = {}): RequestInit {
  if (!csrfToken) return options;

  return {
    ...options,
    headers: {
      ...options.headers,
      "X-CSRF-Token": csrfToken,
    },
  };
}
