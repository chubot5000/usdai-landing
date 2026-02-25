import { Deal } from "@/lib/backend/types";
import {
  formatDealAmount,
  formatTerm,
  formatApr,
  getLoanStageLabel,
} from "@/lib/utils/dealFormatters";
import { LoanStatusBadge } from "./LoanStatusBadge";

interface DealItemProps {
  deal: Deal;
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="font-medium text-stone-900">{value}</span>
    </div>
  );
}

export function DealItem({ deal }: DealItemProps) {
  const principal = formatDealAmount(deal.amount);
  const term = formatTerm(deal.term);
  const apr = formatApr(deal.apr);
  const status = getLoanStageLabel(deal.stage);

  return (
    <div className="flex flex-col gap-3 border-t border-stone-200 p-4 first:border-t-0">
      <div className="flex items-center justify-between gap-2">
        <h5 className="flex-1 text-base font-medium text-stone-900">
          {deal.name}
        </h5>
        <LoanStatusBadge status={status} stage={deal.stage} />
      </div>

      <div className="flex flex-col gap-2">
        <DetailRow label="Principal" value={principal} />
        <DetailRow label="Term" value={term} />
        <DetailRow label="APR" value={apr} />
      </div>
    </div>
  );
}
