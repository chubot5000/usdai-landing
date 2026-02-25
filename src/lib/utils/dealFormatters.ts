/**
 * Utility functions for formatting deal data
 */

/**
 * Convert amount from wei (18 decimals) to USD
 * "479935480000000000000000" → "$479,935.48"
 */
export function formatDealAmount(amountWei: string): string {
  try {
    const amount = BigInt(amountWei);
    const usd = Number(amount) / 1e18;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(usd);
  } catch (error) {
    console.error("Failed to format deal amount:", error);
    return "$0";
  }
}

/**
 * Convert term from seconds to human-readable duration
 * 93312000 seconds → "3 years"
 */
export function formatTerm(seconds: number): string {
  if (!seconds || seconds === 0) return "N/A";

  const days = Math.floor(seconds / 86400);
  const years = Math.floor(days / 365);
  const months = Math.floor(days / 30);

  if (years >= 1) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  } else if (months >= 1) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  } else {
    return `${days} day${days !== 1 ? "s" : ""}`;
  }
}

/**
 * Map stage number to loan status label
 */
export function getLoanStageLabel(stage: number): string {
  const labels: Record<number, string> = {
    1: "Upcoming",
    2: "In Review",
    3: "In Progress",
    4: "Pending",
    5: "Approved",
    6: "Active",
    7: "Completed",
    8: "Cancelled",
  };
  return labels[stage] || "Unknown";
}

/**
 * Get status color/variant for badge
 */
export function getLoanStatusVariant(
  stage: number
): "success" | "warning" | "info" | "default" {
  if (stage === 6) return "success"; // Active
  if (stage === 3) return "warning"; // In Progress
  if (stage === 1) return "info"; // Upcoming
  return "default";
}

/**
 * Format APR as percentage
 */
export function formatApr(apr: number): string {
  if (!apr || apr === 0) return "N/A";
  return `${apr.toFixed(1)}%`;
}
