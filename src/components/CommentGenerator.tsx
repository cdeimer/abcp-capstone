import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Send,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import {
  PILLARS,
  RESIDENT_STATUSES,
  NEIGHBORHOOD_SPOTS,
  type PillarId,
} from '../data/pillars';

const DEFAULT_SELECTED_POINTS = [
  'housing-quality',
  'housing-by-right',
  'streets-buses',
  'culture-music',
];

const SUBJECT_TEMPLATES: Record<PillarId | 'mixed', string[]> = {
  housing: [
    'Public Comment: Prioritize By-Right Housing & Renter Affordability in the ABCP',
  ],
  streets: [
    'Public Comment: Better Transit & Safer Streets in the Allston-Brighton Community Plan',
  ],
  culture: [
    'Public Comment: Support Live Music, Late Hours & Artist Space in the ABCP',
  ],
  mixed: [
    'Public Comment on the Allston-Brighton Community Plan: Housing, Transit & Neighborhood Culture',
  ],
};

export default function CommentGenerator() {
  const [statusId, setStatusId] = useState<string>(RESIDENT_STATUSES[0].id);
  const [spotId, setSpotId] = useState<string>(NEIGHBORHOOD_SPOTS[0].id);
  const [selectedPoints, setSelectedPoints] = useState<string[]>(DEFAULT_SELECTED_POINTS);
  const [personalNote, setPersonalNote] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [activeFilterBanner, setActiveFilterBanner] = useState<string | null>(null);

  const [customSubject, setCustomSubject] = useState<string | null>(null);
  const [customBody, setCustomBody] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState<'none' | 'body' | 'email'>('none');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme')?.toLowerCase() as PillarId | undefined;

    if (themeParam && ['housing', 'streets', 'culture'].includes(themeParam)) {
      const pillar = PILLARS.find((p) => p.id === themeParam);
      if (pillar) {
        setSelectedPoints(pillar.points.map((pt) => pt.id));
        setActiveFilterBanner(`Focused on ${pillar.title}`);
      }
    }

    const handleSelectPillar = (e: Event) => {
      const detail = (e as CustomEvent<{ pillarId: PillarId }>).detail;
      const pillar = PILLARS.find((p) => p.id === detail?.pillarId);
      if (!pillar) return;

      const pillarPointIds = pillar.points.map((pt) => pt.id);
      setSelectedPoints((prev) => Array.from(new Set([...prev, ...pillarPointIds])));
      setCustomBody(null);
      setCustomSubject(null);
      setActiveFilterBanner(`Added "${pillar.title}" points to your comment.`);
    };

    window.addEventListener('abcp:select-pillar', handleSelectPillar);
    return () => {
      window.removeEventListener('abcp:select-pillar', handleSelectPillar);
    };
  }, []);

  const togglePoint = (pointId: string) => {
    setCustomBody(null);
    setCustomSubject(null);
    setSelectedPoints((prev) =>
      prev.includes(pointId)
        ? prev.filter((id) => id !== pointId)
        : [...prev, pointId]
    );
  };

  const selectAllPoints = () => {
    setCustomBody(null);
    setCustomSubject(null);
    setSelectedPoints(PILLARS.flatMap((p) => p.points.map((pt) => pt.id)));
  };

  const { generatedSubject, generatedBody } = useMemo(() => {
    const statusObj =
      RESIDENT_STATUSES.find((s) => s.id === statusId) || RESIDENT_STATUSES[0];
    const spotObj =
      NEIGHBORHOOD_SPOTS.find((n) => n.id === spotId) || NEIGHBORHOOD_SPOTS[0];

    const allPoints = PILLARS.flatMap((p) => p.points);
    const chosenPoints = allPoints.filter((pt) => selectedPoints.includes(pt.id));

    const activePillarIds = Array.from(
      new Set(chosenPoints.map((pt) => pt.pillarId))
    );

    let subjectCategory: PillarId | 'mixed' = 'mixed';
    if (activePillarIds.length === 1) {
      subjectCategory = activePillarIds[0];
    }

    const templates = SUBJECT_TEMPLATES[subjectCategory];
    const subject = `${templates[0]} (${spotObj.label})`;

    const lines: string[] = [];
    lines.push(`Dear ${SITE_CONFIG.organizationName} Allston-Brighton Community Plan Team,`);
    lines.push('');

    const introLine = `${statusObj.introPhrase} connected to ${spotObj.label}, I am writing to share my priorities for the Allston-Brighton Community Plan ahead of its ${SITE_CONFIG.planReleaseTarget} release. It is vital that this plan reflects the voices of renters, students, workers, and young residents—not just the small group of homeowners who typically dominate planning processes.`;
    lines.push(introLine);

    if (personalNote.trim()) {
      lines.push('');
      lines.push(personalNote.trim());
    }

    if (chosenPoints.length > 0) {
      lines.push('');
      lines.push(
        'Specifically, I urge the Boston Planning Department to lock the following priorities into the final Community Plan and zoning recommendations:'
      );
      lines.push('');
      chosenPoints.forEach((pt) => {
        lines.push(`• ${pt.emailSentence}`);
      });
    } else {
      lines.push('');
      lines.push(
        'I urge the Boston Planning Department to legalize more multi-family housing by right, prioritize dedicated bus lanes and safer streets, and protect Allston-Brighton’s live music and late-night cultural spaces.'
      );
    }

    lines.push('');
    lines.push(
      'Allston-Brighton thrives when it is affordable, easy to get around without a car, and welcoming to artists, musicians, and independent businesses. Please deliver a bold plan that allows these good things "by right."'
    );
    lines.push('');
    lines.push('Sincerely,');
    lines.push(
      userName.trim()
        ? `${userName.trim()}\n${statusObj.label} — ${spotObj.label}`
        : `An Allston-Brighton ${statusObj.label} (${spotObj.label})`
    );

    return {
      generatedSubject: subject,
      generatedBody: lines.join('\n'),
    };
  }, [statusId, spotId, selectedPoints, personalNote, userName]);

  const effectiveSubject = customSubject !== null ? customSubject : generatedSubject;
  const effectiveBody = customBody !== null ? customBody : generatedBody;

  const toAddressString = SITE_CONFIG.commentRecipients.to.join(',');
  const ccAddressString = SITE_CONFIG.commentRecipients.cc.join(',');

  const mailtoHref = useMemo(() => {
    const params = new URLSearchParams();
    if (ccAddressString) params.set('cc', ccAddressString);
    params.set('subject', effectiveSubject);
    params.set('body', effectiveBody);
    const queryString = params.toString().replace(/\+/g, '%20');
    return `mailto:${toAddressString}?${queryString}`;
  }, [toAddressString, ccAddressString, effectiveSubject, effectiveBody]);

  const gmailHref = useMemo(() => {
    const params = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: toAddressString,
      su: effectiveSubject,
      body: effectiveBody,
    });
    if (ccAddressString) params.set('cc', ccAddressString);
    return `https://mail.google.com/mail/?${params.toString()}`;
  }, [toAddressString, ccAddressString, effectiveSubject, effectiveBody]);

  const handleCopyBody = async () => {
    try {
      const fullClipboardText = `To: ${toAddressString}\nSubject: ${effectiveSubject}\n\n${effectiveBody}`;
      await navigator.clipboard.writeText(fullClipboardText);
      setCopiedState('body');
      setTimeout(() => setCopiedState('none'), 2500);
    } catch {
      const el = document.createElement('textarea');
      el.value = effectiveBody;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedState('body');
      setTimeout(() => setCopiedState('none'), 2500);
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(toAddressString);
      setCopiedState('email');
      setTimeout(() => setCopiedState('none'), 2500);
    } catch {
      // ignore
    }
  };

  const handleResetEdits = () => {
    setCustomSubject(null);
    setCustomBody(null);
    setSelectedPoints(DEFAULT_SELECTED_POINTS);
    setPersonalNote('');
    setActiveFilterBanner(null);
  };

  return (
    <section
      id="comment"
      className="scroll-mt-16 border-t-4 border-ink bg-highlight/20 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 border-b-2 border-ink pb-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Send your comment to the {SITE_CONFIG.organizationName}
            </h2>
            <p className="mt-2 max-w-2xl text-base font-medium text-ink/85">
              Pick what matters to you and send a comment directly to city planners.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={selectAllPoints}
              className="zine-btn bg-white px-3 py-2 text-xs text-ink"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={handleResetEdits}
              className="zine-btn bg-white px-3 py-2 text-xs text-ink"
              title="Reset selections to default"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {activeFilterBanner && (
          <div className="mb-6 flex items-center justify-between border-2 border-ink bg-highlight px-4 py-2.5 text-xs font-bold shadow-zine-sm">
            <span>{activeFilterBanner}</span>
            <button
              type="button"
              onClick={() => setActiveFilterBanner(null)}
              className="underline hover:text-culture"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN: Controls */}
          <div className="space-y-6 lg:col-span-7">
            {/* STEP 1: About You */}
            <div className="zine-card bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold">
                1. Your connection to Allston-Brighton
              </h3>

              <div className="mt-4">
                <label className="block text-xs font-bold uppercase text-ink/75">
                  I am a:
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {RESIDENT_STATUSES.map((status) => {
                    const active = statusId === status.id;
                    return (
                      <button
                        key={status.id}
                        type="button"
                        onClick={() => {
                          setStatusId(status.id);
                          setCustomBody(null);
                        }}
                        className={`border-2 border-ink px-3 py-1.5 text-xs font-bold transition-all ${
                          active
                            ? 'bg-ink text-highlight shadow-zine-sm'
                            : 'bg-paper text-ink hover:bg-highlight/50'
                        }`}
                      >
                        {status.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="abcp-spot-select"
                    className="block text-xs font-bold uppercase text-ink/75"
                  >
                    Neighborhood spot:
                  </label>
                  <select
                    id="abcp-spot-select"
                    value={spotId}
                    onChange={(e) => {
                      setSpotId(e.target.value);
                      setCustomBody(null);
                      setCustomSubject(null);
                    }}
                    className="mt-1.5 w-full border-2 border-ink bg-paper px-3 py-2 font-sans text-sm font-bold text-ink shadow-zine-sm focus:bg-white focus:outline-none"
                  >
                    {NEIGHBORHOOD_SPOTS.map((spot) => (
                      <option key={spot.id} value={spot.id}>
                        {spot.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="abcp-user-name"
                    className="block text-xs font-bold uppercase text-ink/75"
                  >
                    Your name (optional):
                  </label>
                  <input
                    id="abcp-user-name"
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setCustomBody(null);
                    }}
                    placeholder="e.g. Alex Rivera"
                    className="mt-1.5 w-full border-2 border-ink bg-paper px-3 py-2 font-sans text-sm font-semibold text-ink placeholder:text-ink/40 shadow-zine-sm focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: Priorities (Cleaned up, no redundant headers/badges) */}
            <div className="zine-card bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold">
                2. Pick your priorities
              </h3>

              <div className="mt-4 space-y-5">
                {PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="border-2 border-ink bg-paper/60 p-4"
                  >
                    <h4 className="mb-3 font-display text-base font-bold">
                      {pillar.title}
                    </h4>

                    <div className="space-y-2">
                      {pillar.points.map((pt) => {
                        const isChecked = selectedPoints.includes(pt.id);
                        return (
                          <label
                            key={pt.id}
                            className={`flex cursor-pointer items-start gap-3 border-2 p-2.5 transition-all ${
                              isChecked
                                ? 'border-ink bg-white shadow-zine-sm'
                                : 'border-transparent bg-transparent opacity-75 hover:opacity-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => togglePoint(pt.id)}
                              className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                            />
                            <span className="text-xs font-bold leading-snug sm:text-sm">
                              {pt.shortLabel}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 3: Optional Personal Detail */}
            <div className="zine-card bg-white p-5 sm:p-6">
              <label
                htmlFor="abcp-personal-note"
                className="block font-display text-xl font-bold"
              >
                3. Add a personal note (optional)
              </label>
              <p className="mt-1 text-xs font-medium text-ink/75 sm:text-sm">
                Mention your bus route, rent increase, or favorite local spot so planners
                know you're a real person.
              </p>
              <textarea
                id="abcp-personal-note"
                rows={2}
                value={personalNote}
                onChange={(e) => {
                  setPersonalNote(e.target.value);
                  setCustomBody(null);
                }}
                placeholder="e.g., My rent went up $250/month last year and I rely on the 57 and 66 buses every day."
                className="mt-3 w-full border-2 border-ink bg-paper p-3 font-sans text-sm font-medium text-ink placeholder:text-ink/45 shadow-zine-sm focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Live Editable Preview & Send Actions */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="zine-card bg-white p-5 sm:p-6">
              <div className="border-b-2 border-ink pb-3">
                <h3 className="font-display text-xl font-bold">
                  4. Review & send
                </h3>
              </div>

              {/* Recipient Bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-2 border-ink bg-paper px-3 py-2 text-xs">
                <div className="truncate">
                  <span className="font-bold uppercase text-ink/70">To: </span>
                  <span className="font-mono font-bold text-ink">{toAddressString}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="text-xs font-bold underline hover:text-culture"
                >
                  {copiedState === 'email' ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              {/* Subject Line Input */}
              <div className="mt-3">
                <label
                  htmlFor="abcp-email-subject"
                  className="block text-xs font-bold uppercase text-ink/70"
                >
                  Subject:
                </label>
                <input
                  id="abcp-email-subject"
                  type="text"
                  value={effectiveSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="mt-1 w-full border-2 border-ink bg-paper px-3 py-2 font-sans text-xs font-bold text-ink focus:bg-white focus:outline-none sm:text-sm"
                />
              </div>

              {/* Editable Message Body */}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="abcp-email-body"
                    className="block text-xs font-bold uppercase text-ink/70"
                  >
                    Message (editable):
                  </label>
                  {(customBody !== null || customSubject !== null) && (
                    <button
                      type="button"
                      onClick={() => {
                        setCustomBody(null);
                        setCustomSubject(null);
                      }}
                      className="text-xs font-bold text-culture underline"
                    >
                      Re-sync with checkboxes
                    </button>
                  )}
                </div>
                <textarea
                  id="abcp-email-body"
                  rows={12}
                  value={effectiveBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  className="mt-1 w-full border-2 border-ink bg-paper p-3 font-sans text-xs leading-relaxed text-ink focus:bg-white focus:outline-none sm:text-sm"
                />
              </div>

              {/* Send & Copy Buttons: Open in Gmail is #1 Priority */}
              <div className="mt-5 space-y-3">
                <a
                  href={gmailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zine-btn w-full bg-streets px-4 py-3 text-sm text-white"
                >
                  <Send className="h-4 w-4" />
                  <span>Open in Gmail</span>
                </a>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <a
                    href={mailtoHref}
                    className="zine-btn bg-housing px-3 py-2.5 text-xs text-white"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Open in Email App</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBody}
                    className="zine-btn bg-highlight px-3 py-2.5 text-xs text-ink"
                  >
                    {copiedState === 'body' ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Full Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 border-t border-ink/20 pt-3 text-xs text-ink/80">
                <p className="font-medium">
                  Or copy the text above and submit via the{' '}
                  <a
                    href={SITE_CONFIG.links.officialCommentFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-ink underline hover:text-culture"
                  >
                    <span>official {SITE_CONFIG.organizationName} ABCP page</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
