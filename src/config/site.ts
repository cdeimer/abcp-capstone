/**
 * ============================================================================
 * CENTRAL SITE CONFIGURATION — Allston-Brighton Community Plan Action Portal
 * ============================================================================
 * Edit this file to update recipient email addresses, subject line templates,
 * official Boston Planning Department links, and public meeting announcements.
 */

export interface TimelineStep {
  phase: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
}

export const SITE_CONFIG = {
  /** Official agency name used throughout the portal and generated comments */
  organizationName: 'Boston Planning Department',

  /** Target window for the final Allston-Brighton Community Plan release */
  planReleaseTarget: 'Early 2027',

  /**
   * EMAIL RECIPIENT CONFIGURATION
   * Add or replace email addresses in `to` and `cc` whenever you are ready.
   * Multiple emails are automatically joined with commas in mailto: & Gmail links.
   */
  commentRecipients: {
    to: ['allstonbrightonplan@boston.gov'],
    cc: [] as string[],
  },

  /**
   * EXTERNAL LINKS
   * Official Boston Planning Department links for the ABCP initiative.
   */
  links: {
    officialPlanUrl:
      'https://www.bostonplans.org/planning/planning-initiatives/allston-brighton-community-plan',
    officialCommentFormUrl:
      'https://www.bostonplans.org/planning/planning-initiatives/allston-brighton-community-plan',
    mailingListUrl:
      'https://www.bostonplans.org/planning/planning-initiatives/allston-brighton-community-plan',
  },

  /**
   * UPCOMING MEETINGS & TIMELINE BANNER
   * Toggle `showBanner` or update the text below as new workshops or public
   * meetings are announced between now and Early 2027.
   */
  upcomingMeetings: {
    showBanner: true,
    badgeText: 'PUBLIC INPUT OPEN NOW • PLAN RELEASE: EARLY 2027',
    headline: 'Final Plan Slated for Early 2027 — Stay Tuned for Public Meetings!',
    description:
      'The Boston Planning Department is drafting zoning and street recommendations right now. Additional public meetings and workshops will happen between now and Early 2027—send a comment today and follow the official project page so you do not miss the next meeting.',
    ctaLabel: 'Official ABCP Page & Meeting Updates',
  },

  /**
   * TIMELINE STEPS
   * Displayed in the Timeline & Next Steps section.
   */
  timeline: [
    {
      phase: 'PHASE 01',
      date: 'PAST',
      title: 'Initial Surveys & Visioning',
      description:
        'Early community outreach and neighborhood baseline studies across Allston & Brighton.',
      status: 'completed',
    },
    {
      phase: 'PHASE 02',
      date: 'RIGHT NOW',
      title: 'Drafting Zoning, Streets & Culture Rules',
      description:
        'Planners are deciding what gets allowed "by right." Renters, students, and young residents need to speak up NOW.',
      status: 'active',
    },
    {
      phase: 'PHASE 03',
      date: 'UPCOMING',
      title: 'Public Meetings & Draft Workshops',
      description:
        'Stay tuned for public meetings where residents weigh in on draft recommendations before they are locked in.',
      status: 'upcoming',
    },
    {
      phase: 'PHASE 04',
      date: 'EARLY 2027',
      title: 'Final Community Plan Release',
      description:
        'The final Allston-Brighton Community Plan is slated for release in Early 2027, shaping the neighborhood for decades.',
      status: 'upcoming',
    },
  ] satisfies TimelineStep[],
};
