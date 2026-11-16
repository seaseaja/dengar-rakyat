"use client";

import { useEffect, useState } from "react";

interface DashboardStatsState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Refresh live dashboard aggregates on a short interval and when the tab regains focus. */
export function useDashboardStats<T>(endpoint: string, enabled = true): DashboardStatsState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let active = true;
    let inFlight = false;
    let hasLoaded = false;

    const refresh = async () => {
      if (inFlight || document.visibilityState === "hidden") return;
      inFlight = true;
      try {
        const response = await fetch(endpoint, {
          credentials: "include",
          cache: "no-store",
        });
        if (!response.ok) throw new Error(`Gagal memuat statistik (${response.status})`);
        const nextData = await response.json() as T;
        if (active) {
          setData(nextData);
          setError(null);
          hasLoaded = true;
        }
      } catch (cause) {
        if (active && !hasLoaded) {
          setError(cause instanceof Error ? cause.message : "Gagal memuat statistik");
        }
      } finally {
        inFlight = false;
        if (active) setLoading(false);
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") void refresh();
    };

    void refresh();
    const interval = window.setInterval(() => void refresh(), 5_000);
    window.addEventListener("focus", onVisibilityChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", onVisibilityChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [endpoint, enabled]);

  return { data, loading, error };
}
