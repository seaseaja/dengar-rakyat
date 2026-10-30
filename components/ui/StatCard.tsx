export default function StatCard({
  label,
  value,
  accent = "blue",
}: {
  label: string;
  value: number | string;
  accent?: "blue" | "amber" | "indigo" | "green" | "gray";
}) {
  const ACCENT: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    green: "border-green-200 bg-green-50 text-green-700",
    gray: "border-gray-200 bg-gray-50 text-gray-700",
  };

  return (
    <div className={`rounded-xl border p-4 ${ACCENT[accent]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium opacity-80">{label}</p>
    </div>
  );
}