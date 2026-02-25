import { z } from "zod";
import {
  Metrics,
  DealCoordinate,
  Deal,
  stakingApySchema,
  expectedApySchema,
  tvlSchema,
  totalWalletsSchema,
  proofOfReservesSchema,
  dealFullSchema,
} from "./types";

const BASE_URL = process.env.BACKEND_API_URL;

export async function getMetrics(): Promise<Metrics> {
  if (!BASE_URL) {
    console.warn("BACKEND_API_URL not configured, using default metrics");
    return {
      currentApr: 4.37,
      expectedApr: 18.9,
      totalDeposits: 18_000_000,
      users: 239_039,
    };
  }

  try {
    const [currentApyRes, expectedApyRes, tvlRes, walletsRes] =
      await Promise.all([
        fetch(`${BASE_URL}/usdai/dashboard/current-apy`),
        fetch(`${BASE_URL}/usdai/dashboard/expected-apy`),
        fetch(`${BASE_URL}/usdai/dashboard/tvl`),
        fetch(`${BASE_URL}/usdai/wallets/totalWallets`),
      ]);

    const [currentApyData, expectedApyData, tvlData, walletsData] =
      await Promise.all([
        currentApyRes.json(),
        expectedApyRes.json(),
        tvlRes.json(),
        walletsRes.json(),
      ]);

    const currentApy = stakingApySchema.parse(currentApyData);
    const expectedApy = expectedApySchema.parse(expectedApyData);
    const tvl = tvlSchema.parse(tvlData);
    const wallets = totalWalletsSchema.parse(walletsData);

    return {
      currentApr: currentApy.result,
      expectedApr: expectedApy.result?.projectedApy ?? 0,
      totalDeposits: tvl.tvl,
      users: wallets.totalWallets,
    };
  } catch (error) {
    console.error("Failed to fetch metrics:", error);
    return {
      currentApr: 4.37,
      expectedApr: 18.9,
      totalDeposits: 18_000_000,
      users: 239_039,
    };
  }
}

export async function getDealCoordinates(): Promise<DealCoordinate[]> {
  if (!BASE_URL) {
    console.warn("BACKEND_API_URL not configured, using empty coordinates");
    return [];
  }

  try {
    const res = await fetch(`${BASE_URL}/usdai/dashboard/proof-of-reserves`);
    const data = await res.json();
    const deals = proofOfReservesSchema.parse(data);

    return deals
      .filter(
        (deal) =>
          deal.type !== "TBILL" &&
          deal.locationLatitude != null &&
          deal.locationLongitude != null
      )
      .map((deal) => ({
        lat: deal.locationLatitude!,
        lng: deal.locationLongitude!,
        name: deal.name,
        location: deal.locationName ?? "",
      }));
  } catch (error) {
    console.error("Failed to fetch deal coordinates:", error);
    return [];
  }
}

export async function getDeals(): Promise<Deal[]> {
  if (!BASE_URL) {
    console.warn("BACKEND_API_URL not configured, using empty deals");
    return [];
  }

  try {
    const res = await fetch(`${BASE_URL}/usdai/dashboard/proof-of-reserves`);
    const data = await res.json();
    const deals = z.array(dealFullSchema).parse(data);

    return deals.filter(
      (deal) =>
        deal.type !== "TBILL" &&
        deal.locationLatitude != null &&
        deal.locationLatitude !== 0 &&
        deal.locationLongitude != null &&
        deal.locationLongitude !== 0 &&
        deal.locationName != null &&
        deal.locationName !== ""
    ) as Deal[];
  } catch (error) {
    console.error("Failed to fetch deals:", error);
    return [];
  }
}
