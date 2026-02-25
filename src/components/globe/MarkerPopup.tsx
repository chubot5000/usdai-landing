import { Deal } from "@/lib/backend/types";
import {
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Popup } from "./Popup";
import { DealItem } from "./DealItem";

interface MarkerPopupProps {
  deals: Deal[];
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
}

export function MarkerPopup({
  deals,
  isOpen,
  position,
  onClose,
}: MarkerPopupProps) {
  if (!deals || deals.length === 0) return null;

  const locationName = deals[0].locationName;
  const loanCount = deals.length;

  return (
    <Popup.Container isOpen={isOpen} position={position} onClose={onClose}>
      <Popup.Header className="bg-stone-50">
        <div className="flex items-center justify-between w-full">
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="inline size-4 text-stone-600" />
            <span className="text-stone-900">
              {loanCount} loan{loanCount !== 1 ? "s" : ""} in {locationName}
            </span>
          </span>
          <a
            href="https://app.usd.ai/reserves"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-[#a99482] hover:text-[#8b7355] transition-colors whitespace-nowrap"
          >
            More details
            <ArrowTopRightOnSquareIcon className="size-3.5" />
          </a>
        </div>
      </Popup.Header>
      <Popup.Content>
        {deals.map((deal, idx) => (
          <DealItem key={deal.documentId || idx} deal={deal} />
        ))}
      </Popup.Content>
    </Popup.Container>
  );
}
