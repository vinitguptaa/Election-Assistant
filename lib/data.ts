import { prisma } from "./prisma";
import { mockBooths, mockCandidates, mockElectionEvents, mockElections, mockNews, mockParties } from "./mock-data";

const useMocks = process.env.NEXT_PUBLIC_ENABLE_MOCKS !== "false";

export async function getTimeline(region?: string) {
  if (useMocks) {
    return mockElectionEvents.filter((event) => !region || event.region.toLowerCase() === region.toLowerCase());
  }

  return prisma.electionEvent.findMany({
    where: region ? { region: { equals: region, mode: "insensitive" } } : undefined,
    include: { election: true },
    orderBy: { startsAt: "asc" }
  });
}

export async function getElections(region?: string) {
  if (useMocks) {
    return mockElections.filter((election) => !region || election.region.toLowerCase() === region.toLowerCase());
  }

  return prisma.election.findMany({
    where: region ? { region: { equals: region, mode: "insensitive" } } : undefined,
    orderBy: { startDate: "asc" }
  });
}

export async function getCandidates(filters: { region?: string; constituency?: string; q?: string } = {}) {
  if (useMocks) {
    return mockCandidates
      .filter((candidate) => !filters.region || candidate.region.toLowerCase() === filters.region.toLowerCase())
      .filter((candidate) => !filters.constituency || candidate.constituency.toLowerCase().includes(filters.constituency.toLowerCase()))
      .filter((candidate) => !filters.q || candidate.name.toLowerCase().includes(filters.q.toLowerCase()))
      .map((candidate) => ({
        ...candidate,
        party: mockParties.find((party) => party.id === candidate.partyId)
      }));
  }

  return prisma.candidate.findMany({
    where: {
      region: filters.region ? { equals: filters.region, mode: "insensitive" } : undefined,
      constituency: filters.constituency ? { contains: filters.constituency, mode: "insensitive" } : undefined,
      name: filters.q ? { contains: filters.q, mode: "insensitive" } : undefined
    },
    include: { party: { include: { performance: true } } }
  });
}

export async function getBooths(filters: { region?: string; pinCode?: string; q?: string } = {}) {
  if (useMocks) {
    return mockBooths
      .filter((booth) => !filters.region || booth.region.toLowerCase() === filters.region.toLowerCase())
      .filter((booth) => !filters.pinCode || booth.pinCode === filters.pinCode)
      .filter((booth) => !filters.q || `${booth.name} ${booth.address}`.toLowerCase().includes(filters.q.toLowerCase()));
  }

  return prisma.pollingBooth.findMany({
    where: {
      region: filters.region ? { equals: filters.region, mode: "insensitive" } : undefined,
      pinCode: filters.pinCode,
      OR: filters.q
        ? [{ name: { contains: filters.q, mode: "insensitive" } }, { address: { contains: filters.q, mode: "insensitive" } }]
        : undefined
    }
  });
}

export async function getNews(filters: { region?: string; verified?: boolean } = {}) {
  if (useMocks) {
    return mockNews
      .filter((article) => !filters.region || article.region.toLowerCase() === filters.region.toLowerCase())
      .filter((article) => filters.verified === undefined || article.verified === filters.verified);
  }

  return prisma.newsArticle.findMany({
    where: {
      region: filters.region ? { equals: filters.region, mode: "insensitive" } : undefined,
      verified: filters.verified
    },
    orderBy: { publishedAt: "desc" }
  });
}

export function getPartyPerformance() {
  return mockParties.flatMap((party) =>
    party.performance.map((row) => ({
      party: party.shortName,
      color: party.color,
      ...row
    }))
  );
}
