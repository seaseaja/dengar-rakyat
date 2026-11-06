/**
 * Health Check Endpoint - Iterasi 3 P2
 * System health monitoring for load balancers, uptime monitors
 */

import { NextResponse } from "next/server";
import { checkSystemHealth } from "@/lib/monitoring";

export async function GET() {
  try {
    const health = await checkSystemHealth();

    const statusCode = {
      healthy: 200,
      degraded: 200,
      critical: 503,
    }[health.status];

    return NextResponse.json(
      {
        status: health.status,
        timestamp: new Date().toISOString(),
        checks: health.checks,
      },
      { status: statusCode }
    );
  } catch (err) {
    console.error("Health check error:", err);
    return NextResponse.json(
      {
        status: "critical",
        error: "Health check failed",
      },
      { status: 503 }
    );
  }
}
