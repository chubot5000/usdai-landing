import Image from "next/image";

export function GearboxIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/gearbox.png"
      alt="Gearbox"
      width={328}
      height={415}
      className={className}
    />
  );
}
