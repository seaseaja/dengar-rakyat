"use client";

import { useRef } from "react";

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function ChartContainer({
  title,
  children,
  description,
  onRefresh,
  isRefreshing = false,
}: ChartContainerProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (!chartRef.current) return;

    try {
      // Simple export using html2canvas (would need to install)
      // For now, just show alert
      alert("Fitur export chart akan segera tersedia!");
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm" ref={chartRef}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        <div className="flex gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
              title="Refresh data"
            >
              <svg
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          )}
          <button
            onClick={handleExportImage}
            className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
            title="Export as image"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
