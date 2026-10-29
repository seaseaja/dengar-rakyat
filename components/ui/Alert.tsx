import { ReactNode } from "react";

interface Props {
  type: "error" | "success";
  children: ReactNode;
}

export default function Alert({ type, children }: Props) {
  const color =
    type === "error"
      ? "bg-red-500/10 text-red-300 border-red-500/30"
      : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
  return (
    <div className={`rounded-xl border px-4 py-2.5 text-sm ${color}`}>{children}</div>
  );
}