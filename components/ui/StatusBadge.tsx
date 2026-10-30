const STATUS_STYLE: Record<string, string> = {
  Diterima: "bg-amber-100 text-amber-800",
  Diverifikasi: "bg-blue-100 text-blue-800",
  Diproses: "bg-indigo-100 text-indigo-800",
  Selesai: "bg-green-100 text-green-800",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLE[status] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}