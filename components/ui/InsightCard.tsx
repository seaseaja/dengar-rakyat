interface InsightCardProps {
  icon: string;
  title: string;
  description: string;
  color?: "blue" | "green" | "yellow" | "red" | "purple";
}

const colorStyles = {
  blue: "border-blue-200 bg-gradient-to-br from-blue-50 to-white",
  green: "border-green-200 bg-gradient-to-br from-green-50 to-white",
  yellow: "border-yellow-200 bg-gradient-to-br from-yellow-50 to-white",
  red: "border-red-200 bg-gradient-to-br from-red-50 to-white",
  purple: "border-purple-200 bg-gradient-to-br from-purple-50 to-white",
};

const iconColorStyles = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  red: "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
};

export default function InsightCard({
  icon,
  title,
  description,
  color = "blue",
}: InsightCardProps) {
  return (
    <div className={`rounded-xl border-2 p-4 ${colorStyles[color]}`}>
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${iconColorStyles[color]}`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
