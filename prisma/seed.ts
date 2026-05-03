import { PrismaClient, Role } from "@prisma/client";
import { mockBooths, mockCandidates, mockElectionEvents, mockElections, mockNews, mockParties } from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.adminLog.deleteMany();
  await prisma.voterQuery.deleteMany();
  await prisma.chatHistory.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.pollingBooth.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.partyPerformance.deleteMany();
  await prisma.party.deleteMany();
  await prisma.electionEvent.deleteMany();
  await prisma.election.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      email: "admin@civicpulse.local",
      name: "Election Data Admin",
      role: Role.ADMIN,
      region: "Delhi"
    }
  });

  for (const party of mockParties) {
    await prisma.party.create({
      data: {
        id: party.id,
        name: party.name,
        shortName: party.shortName,
        ideology: party.ideology,
        manifesto: party.manifesto,
        color: party.color,
        website: party.website,
        performance: { create: party.performance }
      }
    });
  }

  for (const election of mockElections) {
    await prisma.election.create({
      data: {
        id: election.id,
        title: election.title,
        region: election.region,
        country: election.country,
        status: election.status,
        description: election.description,
        startDate: new Date(election.startDate),
        endDate: new Date(election.endDate),
        rules: election.rules
      }
    });
  }

  for (const event of mockElectionEvents) {
    await prisma.electionEvent.create({
      data: {
        ...event,
        startsAt: new Date(event.startsAt),
        endsAt: event.endsAt ? new Date(event.endsAt) : null
      }
    });
  }

  for (const candidate of mockCandidates) {
    await prisma.candidate.create({ data: candidate });
  }

  for (const booth of mockBooths) {
    await prisma.pollingBooth.create({ data: booth });
  }

  for (const article of mockNews) {
    await prisma.newsArticle.create({
      data: {
        ...article,
        publishedAt: new Date(article.publishedAt)
      }
    });
  }

  await prisma.adminLog.create({
    data: {
      actorId: admin.id,
      action: "SEED_DATABASE",
      entity: "system",
      metadata: { records: "mock civic data" }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
