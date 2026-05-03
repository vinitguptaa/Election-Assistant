import type { ElectionStatus } from "@prisma/client";

export const mockParties = [
  {
    id: "party-civic-progress",
    name: "Civic Progress Party",
    shortName: "CPP",
    ideology: "Public services, digital governance, inclusive growth",
    manifesto: "Expand accessible public services, improve transparent procurement, strengthen local infrastructure, and invest in digital literacy.",
    color: "#2563eb",
    website: "https://example.gov/cpp",
    performance: [
      { year: 2016, seats: 42, voteShare: 31.4 },
      { year: 2021, seats: 55, voteShare: 37.8 },
      { year: 2024, seats: 61, voteShare: 39.1 }
    ]
  },
  {
    id: "party-green-local",
    name: "Green Local Alliance",
    shortName: "GLA",
    ideology: "Climate resilience, ward-level planning, clean mobility",
    manifesto: "Prioritize clean buses, urban tree cover, resilient drainage, community health centers, and open ward budgets.",
    color: "#16a34a",
    website: "https://example.gov/gla",
    performance: [
      { year: 2016, seats: 18, voteShare: 18.2 },
      { year: 2021, seats: 26, voteShare: 23.6 },
      { year: 2024, seats: 31, voteShare: 25.3 }
    ]
  },
  {
    id: "party-peoples-front",
    name: "People's Federal Front",
    shortName: "PFF",
    ideology: "Cooperative federalism, jobs, small business support",
    manifesto: "Create apprenticeship corridors, simplify small business compliance, and strengthen district-level grievance redressal.",
    color: "#dc2626",
    website: "https://example.gov/pff",
    performance: [
      { year: 2016, seats: 37, voteShare: 28.6 },
      { year: 2021, seats: 33, voteShare: 26.1 },
      { year: 2024, seats: 29, voteShare: 24.4 }
    ]
  }
];

export const mockElections = [
  {
    id: "election-delhi-2026",
    title: "Delhi Assembly Election 2026",
    region: "Delhi",
    country: "India",
    status: "UPCOMING" as ElectionStatus,
    description: "State legislative assembly election with phased voter services, candidate nomination, polling, counting, and result publication.",
    startDate: "2026-06-10T03:30:00.000Z",
    endDate: "2026-08-18T12:30:00.000Z",
    rules: {
      minimumAge: 18,
      citizenship: "Indian",
      acceptedIds: ["EPIC voter ID", "Aadhaar", "Passport", "Driving License"],
      registrationDeadlineDaysBeforePoll: 10
    }
  },
  {
    id: "election-maharashtra-urban-2026",
    title: "Maharashtra Urban Local Bodies Election 2026",
    region: "Maharashtra",
    country: "India",
    status: "ACTIVE" as ElectionStatus,
    description: "Municipal and ward elections covering urban civic bodies with local booth assignments and ward-specific candidate lists.",
    startDate: "2026-04-25T03:30:00.000Z",
    endDate: "2026-06-20T12:30:00.000Z",
    rules: {
      minimumAge: 18,
      citizenship: "Indian",
      acceptedIds: ["EPIC voter ID", "Aadhaar", "PAN card"],
      registrationDeadlineDaysBeforePoll: 7
    }
  }
];

export const mockElectionEvents = [
  {
    electionId: "election-delhi-2026",
    title: "Voter Registration Window",
    phase: "registration",
    region: "Delhi",
    description: "New voters and address-change applicants can submit or update voter registration before the roll freeze.",
    startsAt: "2026-06-10T03:30:00.000Z",
    endsAt: "2026-07-05T12:30:00.000Z",
    sourceUrl: "https://eci.gov.in"
  },
  {
    electionId: "election-delhi-2026",
    title: "Candidate Nomination Filing",
    phase: "nomination",
    region: "Delhi",
    description: "Candidates file nomination papers, declarations, affidavits, and deposit details with the returning officer.",
    startsAt: "2026-07-08T04:30:00.000Z",
    endsAt: "2026-07-15T10:30:00.000Z",
    sourceUrl: "https://eci.gov.in"
  },
  {
    electionId: "election-delhi-2026",
    title: "Campaign Silence Period",
    phase: "campaigning",
    region: "Delhi",
    description: "Campaigning ends 48 hours before polling. Voters can review verified candidate information and booth details.",
    startsAt: "2026-08-06T12:30:00.000Z",
    endsAt: "2026-08-08T12:30:00.000Z",
    sourceUrl: "https://eci.gov.in"
  },
  {
    electionId: "election-delhi-2026",
    title: "Voting Day",
    phase: "polling",
    region: "Delhi",
    description: "Polling booths open for eligible registered voters. Carry accepted ID and check queue status before visiting.",
    startsAt: "2026-08-09T01:30:00.000Z",
    endsAt: "2026-08-09T12:30:00.000Z",
    sourceUrl: "https://eci.gov.in"
  },
  {
    electionId: "election-delhi-2026",
    title: "Counting and Result Declaration",
    phase: "counting",
    region: "Delhi",
    description: "Postal ballots and EVM results are counted under observer supervision, followed by result publication.",
    startsAt: "2026-08-18T03:30:00.000Z",
    endsAt: "2026-08-18T12:30:00.000Z",
    sourceUrl: "https://eci.gov.in"
  },
  {
    electionId: "election-maharashtra-urban-2026",
    title: "Ward Roll Verification",
    phase: "registration",
    region: "Maharashtra",
    description: "Citizens verify ward assignment, spelling, address, and polling station mapping.",
    startsAt: "2026-04-25T03:30:00.000Z",
    endsAt: "2026-05-08T12:30:00.000Z",
    sourceUrl: "https://sec.maharashtra.gov.in"
  },
  {
    electionId: "election-maharashtra-urban-2026",
    title: "Polling Day",
    phase: "polling",
    region: "Maharashtra",
    description: "Municipal polling across notified urban wards with accessibility support and queue dashboards.",
    startsAt: "2026-06-12T01:30:00.000Z",
    endsAt: "2026-06-12T12:30:00.000Z",
    sourceUrl: "https://sec.maharashtra.gov.in"
  }
];

export const mockCandidates = [
  {
    electionId: "election-delhi-2026",
    partyId: "party-civic-progress",
    name: "Anika Rao",
    constituency: "New Delhi",
    region: "Delhi",
    age: 44,
    education: "MA Public Policy",
    profession: "Urban governance advisor",
    criminalCases: 0,
    declaredAssets: "12400000.00",
    publicPriorities: ["Public transport", "Air quality", "Citizen service delivery"],
    affidavitUrl: "https://example.gov/affidavits/anika-rao"
  },
  {
    electionId: "election-delhi-2026",
    partyId: "party-green-local",
    name: "Kabir Mehta",
    constituency: "New Delhi",
    region: "Delhi",
    age: 39,
    education: "B.Tech Environmental Engineering",
    profession: "Clean mobility entrepreneur",
    criminalCases: 0,
    declaredAssets: "8600000.00",
    publicPriorities: ["Clean buses", "Waste segregation", "Ward climate plans"],
    affidavitUrl: "https://example.gov/affidavits/kabir-mehta"
  },
  {
    electionId: "election-maharashtra-urban-2026",
    partyId: "party-peoples-front",
    name: "Meera Patil",
    constituency: "Pune Ward 21",
    region: "Maharashtra",
    age: 51,
    education: "LLB",
    profession: "Cooperative sector leader",
    criminalCases: 1,
    declaredAssets: "17500000.00",
    publicPriorities: ["Local jobs", "Market licensing", "Water reliability"],
    affidavitUrl: "https://example.gov/affidavits/meera-patil"
  }
];

export const mockBooths = [
  {
    electionId: "election-delhi-2026",
    name: "NDMC School Polling Station 14",
    address: "Mandir Marg, New Delhi, Delhi",
    region: "Delhi",
    pinCode: "110001",
    latitude: 28.633,
    longitude: 77.212,
    accessibility: true,
    queueLevel: 2,
    openingTime: "07:00",
    closingTime: "18:00"
  },
  {
    electionId: "election-delhi-2026",
    name: "Community Centre Booth 31",
    address: "Lodhi Road, New Delhi, Delhi",
    region: "Delhi",
    pinCode: "110003",
    latitude: 28.591,
    longitude: 77.225,
    accessibility: true,
    queueLevel: 4,
    openingTime: "07:00",
    closingTime: "18:00"
  },
  {
    electionId: "election-maharashtra-urban-2026",
    name: "Pune Municipal School Ward 21",
    address: "Koregaon Park, Pune, Maharashtra",
    region: "Maharashtra",
    pinCode: "411001",
    latitude: 18.536,
    longitude: 73.893,
    accessibility: true,
    queueLevel: 3,
    openingTime: "07:30",
    closingTime: "17:30"
  }
];

export const mockNews = [
  {
    electionId: "election-delhi-2026",
    title: "Delhi draft voter roll verification window opens",
    summary: "Election officials opened the verification window for draft rolls, with online correction support and district helpdesks.",
    source: "Election Commission Bulletin",
    sourceUrl: "https://eci.gov.in",
    region: "Delhi",
    verified: true,
    sentiment: "neutral",
    misinformation: 0.03,
    publishedAt: "2026-05-01T05:00:00.000Z"
  },
  {
    electionId: "election-maharashtra-urban-2026",
    title: "Urban ward polling teams receive accessibility training",
    summary: "Polling personnel completed accessibility and queue management training ahead of municipal polling.",
    source: "State Election Update",
    sourceUrl: "https://sec.maharashtra.gov.in",
    region: "Maharashtra",
    verified: true,
    sentiment: "positive",
    misinformation: 0.02,
    publishedAt: "2026-05-02T06:30:00.000Z"
  },
  {
    electionId: null,
    title: "Unverified message claims voting date changed",
    summary: "Fact-checkers found no official notification changing notified polling dates. Voters should rely on commission websites and district notices.",
    source: "Civic Fact Check Desk",
    sourceUrl: "https://example.gov/fact-checks/voting-date-rumor",
    region: "National",
    verified: false,
    sentiment: "negative",
    misinformation: 0.82,
    publishedAt: "2026-05-03T04:00:00.000Z"
  }
];

export const processSteps = [
  { title: "Register", detail: "Submit new voter registration or update address before the roll freeze.", icon: "UserPlus" },
  { title: "Verify Roll", detail: "Confirm name, polling part, constituency, and accepted ID requirements.", icon: "BadgeCheck" },
  { title: "Review Candidates", detail: "Compare candidates, affidavits, manifestos, and public priorities.", icon: "Scale" },
  { title: "Vote", detail: "Visit assigned booth, verify identity, use EVM, and confirm VVPAT slip.", icon: "Vote" },
  { title: "Count", detail: "Votes are counted under supervision with audit trails and published results.", icon: "BarChart3" }
];

export const faqKnowledge = [
  {
    question: "What ID can I carry to vote?",
    answer: "Carry your EPIC voter ID if available. If allowed by the election notification, other government IDs such as Aadhaar, passport, driving license, or PAN may be accepted."
  },
  {
    question: "Can I vote if I recently moved?",
    answer: "You should update your address in the electoral roll before the registration deadline. The assistant can show the next deadline for your region."
  },
  {
    question: "How does VVPAT work?",
    answer: "After pressing the EVM button, VVPAT briefly displays a printed slip with the candidate choice before it drops into a sealed box."
  }
];
