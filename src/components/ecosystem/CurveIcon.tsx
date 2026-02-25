import { SVGProps } from "react";

export function CurveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M30 55 Q40 35, 50 50 T70 45"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="75"
        textAnchor="middle"
        fill="currentColor"
        fontSize="12"
        fontWeight="bold"
      >
        CURVE
      </text>
    </svg>
  );
}
