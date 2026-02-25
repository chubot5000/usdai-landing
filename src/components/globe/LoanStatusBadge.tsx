import { getLoanStatusVariant } from "@/lib/utils/dealFormatters";

interface LoanStatusBadgeProps {
  status: string;
  stage: number;
}

const variantStyles = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  default: "bg-stone-100 text-stone-800 border-stone-200",
};

export function LoanStatusBadge({ status, stage }: LoanStatusBadgeProps) {
  const variant = getLoanStatusVariant(stage);
  const styles = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}
