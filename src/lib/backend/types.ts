import { z } from "zod";

export const stakingApySchema = z.object({
  result: z.number(),
});

export const expectedApySchema = z.object({
  result: z
    .object({
      projectedApy: z.number(),
    })
    .nullable(),
});

export const tvlSchema = z.object({
  tvl: z.number(),
});

export const totalWalletsSchema = z.object({
  totalWallets: z.number(),
});

export interface Metrics {
  currentApr: number;
  expectedApr: number;
  totalDeposits: number;
  users: number;
}

export const dealSchema = z.object({
  type: z.string(),
  name: z.string(),
  locationName: z.string().optional(),
  locationLongitude: z.number().optional(),
  locationLatitude: z.number().optional(),
});

export const proofOfReservesSchema = z.array(dealSchema);

export interface DealCoordinate {
  lat: number;
  lng: number;
  name: string;
  location: string;
}

// Comprehensive Deal interface matching actual API response
// Note: locationName, locationLongitude, locationLatitude are required
// because we filter out deals without locations in getDeals()
export interface Deal {
  documentId: string;
  type: "DEAL" | "LEGACY_DEAL" | "TBILL";
  name: string;
  chain: number;
  borrower: string;
  stage: number;
  locationName: string;
  locationLongitude: number;
  locationLatitude: number;
  amount: string;
  term: number;
  apr: number;
  offTake: number | null;
  pool?: string;
  share?: number;
}

// Zod schema for full deal data with optional fields
export const dealFullSchema = z.object({
  documentId: z.string().optional().default(""),
  type: z.string(),
  name: z.string(),
  chain: z.number().optional().default(0),
  borrower: z.string().optional().default(""),
  stage: z.number().optional().default(0),
  locationName: z.string().optional().default(""),
  locationLongitude: z.number().optional().default(0),
  locationLatitude: z.number().optional().default(0),
  amount: z.string().optional().default("0"),
  term: z.number().optional().default(0),
  apr: z.number().optional().default(0),
  offTake: z.number().nullable().optional(),
  pool: z.string().optional(),
  share: z.number().optional(),
});
