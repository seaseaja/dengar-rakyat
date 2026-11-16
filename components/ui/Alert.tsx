import { ReactNode } from "react";

interface Props {
  type: "error" | "success" | "warning" | "info";
  children?: ReactNode;
  message?: ReactNode;
}

export default function Alert({ type, children, message }: Props) {
  const content = children ?? message;
  const color =
    type === "error"
      ? "bg-red-50 text-red-700 border-red-200"
      : type === "warning"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : type === "info"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <div className={`rounded-xl border px-4 py-2.5 text-sm ${color}`}>{content}</div>
  );
}