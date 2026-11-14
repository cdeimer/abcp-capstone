export type PillarId = 'housing' | 'streets' | 'culture';

export interface TalkingPoint {
  id: string;
  pillarId: PillarId;
  shortLabel: string;
  headline: string;
  description: string;
  emailSentence: string;
}

export interface PillarData {
  id: PillarId;
  title: string;
  shortTitle: string;
  tagline: string;
  accentColor: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  heroButtonSubtitle: string;
  intro: string;
  points: TalkingPoint[];
}

export const RESIDENT_STATUSES = [
  {
    id: 'renter',
    label: 'Renter',
    introPhrase: 'As an Allston-Brighton renter',
  },
  {
    id: 'student',
    label: 'College / Grad Student',
    introPhrase: 'As a student living and spending my days in Allston-Brighton',
  },
  {
    id: 'young-pro',
    label: 'Recent Grad / Young Professional',
    introPhrase: 'As a young professional who wants to stay and build a life in Allston-Brighton',
  },
  {
    id: 'artist-musician',
    label: 'Artist / Musician / Nightlife Worker',
    introPhrase: 'As a creative and cultural worker rooted in Allston-Brighton',
  },
  {
    id: 'local-worker',
    label: 'Local Worker / Commuter',
    introPhrase: 'As someone who works and commutes in Allston-Brighton every day',
  },
  {
    id: 'homeowner-ally',
    label: 'Homeowner Ally',
    introPhrase: 'As an Allston-Brighton homeowner who wants our neighborhood to welcome everyone',
  },
] as const;

export const NEIGHBORHOOD_SPOTS = [
  { id: 'allston-village', label: 'Allston Village / Harvard Ave' },
  { id: 'packards-corner', label: "Packard's Corner / Comm Ave" },
  { id: 'lower-allston', label: 'Lower Allston / Western Ave' },
  { id: 'union-square', label: 'Union Square (Allston)' },
  { id: 'brighton-center', label: 'Brighton Center' },
  { id: 'oak-square', label: 'Oak Square' },
  { id: 'cleveland-circle', label: 'Cleveland Circle / Chiswick Rd' },
  { id: 'whole-neighborhood', label: 'Across Allston-Brighton' },
] as const;

export const PILLARS: PillarData[] = [
  {
    id: 'housing',
    title: 'More housing',
    shortTitle: 'More housing',
    tagline: 'Stop letting landlords hold all the cards.',
    accentColor: '#FF4D00',
    bgClass: 'bg-housing',
    textClass: 'text-housing',
    borderClass: 'border-housing',
    heroButtonSubtitle: 'Quality options, landlord competition & fewer bank branches',
    intro:
      'Over 75% of Allston-Brighton residents rent, yet outdated zoning makes building new apartments next to impossible. When housing is scarce, tenants compete for overpriced, poorly maintained apartments—instead of landlords competing for us.',
    points: [
      {
        id: 'housing-quality',
        pillarId: 'housing',
        shortLabel: 'More, higher-quality apartment options near transit',
        headline: 'More, higher-quality options',
        description:
          'Legalize modern mid-rise and multi-family housing near transit corridors so students, recent grads, and families aren’t all fighting over the same crumbling triple-deckers every September 1st.',
        emailSentence:
          'We need zoning that allows substantially more, higher-quality multi-family housing near transit so renters are not forced to compete over scarce, aging apartments every September 1st.',
      },
      {
        id: 'housing-landlords',
        pillarId: 'housing',
        shortLabel: 'Pit landlords against each other (end the housing shortage)',
        headline: 'Pit landlords against each other',
        description:
          'When vacancy rates are near zero, landlords can hike rents and ignore broken heaters because you have nowhere else to go. Building enough homes flips the market so landlords have to compete on price and maintenance to win tenants.',
        emailSentence:
          'Adding real housing supply is essential to give tenants leverage—forcing landlords to compete for renters with fairer prices and better maintenance rather than exploiting a chronic shortage.',
      },
      {
        id: 'housing-by-right',
        pillarId: 'housing',
        shortLabel: 'Allow housing & small local retail "by right" (fewer banks/PE coffee chains)',
        headline: 'Fewer banks & PE coffee chains',
        description:
          'Right now, bad things (corporate banks and private-equity coffee chains) are easy to build "by right," while good things (apartments and small local storefronts) take years of variances. Rethink what is allowed by right so housing and indie shops can actually get built.',
        emailSentence:
          'We must rethink what is allowed "by right" in Allston-Brighton: it should be effortless to build mixed-use housing with small, affordable ground-floor spaces for independent businesses rather than massive commercial footprints that only banks and private-equity coffee chains can lease.',
      },
    ],
  },
  {
    id: 'streets',
    title: 'Better transit & safer streets',
    shortTitle: 'Better transit & safer streets',
    tagline: 'Move people, not just gridlocked cars.',
    accentColor: '#0057FF',
    bgClass: 'bg-streets',
    textClass: 'text-streets',
    borderClass: 'border-streets',
    heroButtonSubtitle: 'Faster 57/66/86 buses, street safety & everyday walkability',
    intro:
      'Allston-Brighton is one of the most transit-dependent neighborhoods in New England, yet our main corridors still treat bus riders, pedestrians, and cyclists like an afterthought.',
    points: [
      {
        id: 'streets-buses',
        pillarId: 'streets',
        shortLabel: 'Faster buses with dedicated bus lanes & signal priority (57, 66, 86, 64, 70)',
        headline: 'Faster buses',
        description:
          'Dedicated bus lanes and transit signal priority on key routes like the 57, 66, 86, 64, and 70—plus upgrades that speed up the B Branch on Comm Ave so buses aren’t trapped behind solo drivers.',
        emailSentence:
          'Please prioritize dedicated bus lanes and transit signal priority for critical routes like the 57, 66, 86, 64, and 70, alongside Green Line improvements, so thousands of daily transit riders stop losing hours to car congestion.',
      },
      {
        id: 'streets-safety',
        pillarId: 'streets',
        shortLabel: 'Street safety: protected bike lanes & safer intersections',
        headline: 'Street safety',
        description:
          'Physical protection for bike lanes (not faded paint in the door zone), raised crosswalks, daylighted intersections, and traffic calming on Brighton Ave, Cambridge St, Western Ave, and Market St.',
        emailSentence:
          'Our main corridors need physical street safety upgrades—including curb-protected bike lanes, daylighted corners, and raised crosswalks—so walking, rolling, and biking through Allston-Brighton does not feel like a hazard.',
      },
      {
        id: 'streets-walkability',
        pillarId: 'streets',
        shortLabel: 'Walkability: wider sidewalks, shade trees & pedestrian plazas',
        headline: 'Walkability',
        description:
          'Wider, unobstructed sidewalks, street trees for summer shade, better lighting for late-night walks home, and pedestrian-friendly plazas around our neighborhood squares.',
        emailSentence:
          'The plan should champion everyday walkability with wider sidewalks, street trees, better night lighting, and pedestrian-friendly public plazas in our squares.',
      },
    ],
  },
  {
    id: 'culture',
    title: 'Livelier neighborhood',
    shortTitle: 'Livelier neighborhood',
    tagline: 'Space for music, nightlife, and working artists.',
    accentColor: '#FF007A',
    bgClass: 'bg-culture',
    textClass: 'text-culture',
    borderClass: 'border-culture',
    heroButtonSubtitle: 'Live music permitted, later hours, rooftop patios & artist space',
    intro:
      'Allston-Brighton thrives on DIY spaces, small venues, late-night diners, and working artists. Restrictive zoning and permitting red tape have choked out music and nightlife—the Community Plan can bring that energy back.',
    points: [
      {
        id: 'culture-music',
        pillarId: 'culture',
        shortLabel: 'Live music permitted by-right in commercial corridors',
        headline: 'Live music permitted',
        description:
          'Allow cafés, bars, bookstores, and community spaces to host live music and small performances by right without prohibitive legal fees or endless licensing hurdles.',
        emailSentence:
          'To keep Allston-Brighton a cultural hub, the plan should permit small and mid-sized live music and performance spaces by right across our commercial districts.',
      },
      {
        id: 'culture-hours',
        pillarId: 'culture',
        shortLabel: 'Later operating hours for food, coffee & third spaces',
        headline: 'Later operating hours',
        description:
          'Not everyone works a 9-to-5. Support late-night dining, late-night coffee shops, and welcoming third spaces for students, hospital/service workers, and night owls.',
        emailSentence:
          'Please support later operating hours for independent restaurants, late-night cafes, and third spaces so students, service workers, and residents have welcoming places to gather after dark.',
      },
      {
        id: 'culture-patios',
        pillarId: 'culture',
        shortLabel: 'Rooftop patios & outdoor dining without red tape',
        headline: 'Rooftop patios',
        description:
          'Make rooftop patios, courtyard gardens, and sidewalk dining easy to permit so local restaurants and bars can create great outdoor social spaces.',
        emailSentence:
          'Streamlining zoning for rooftop patios and outdoor dining will bring vibrant street life and help neighborhood restaurants thrive.',
      },
      {
        id: 'culture-artists',
        pillarId: 'culture',
        shortLabel: 'Dedicated space for art, rehearsal rooms & working artists',
        headline: 'Space for art and artists',
        description:
          'Incentivize affordable rehearsal spaces, maker studios, galleries, and creative storefronts as part of new neighborhood developments.',
        emailSentence:
          'Finally, the plan must actively protect and create space for art and artists—including affordable rehearsal rooms, maker studios, galleries, and creative ground-floor uses.',
      },
    ],
  },
];
