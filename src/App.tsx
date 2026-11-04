/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { User, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  MarcaEfectoLogo,
  EventStarCalendarIcon,
  EventClockIcon,
  EventPinIcon,
  OutlinedGradientNumber,
  FlagColombia,
  FlagUSA,
  FlagDominicanRepublic,
} from './components/MarcaEfectoLogo';
import { TicketModal, VideoPreviewModal } from './components/Modals';

interface SpeakerData {
  id: string;
  name?: string;
  role?: string;
  image: string;
  flag?: React.ReactNode;
  defaultBioOpen?: boolean;
  bioHeading?: string;
  bioText?: string;
}

const SPEAKERS: SpeakerData[] = [
  {
    id: 'speak-1',
    name: 'MONIK MONTANEZ',
    role: 'ASSESSOR EN REDES SOCIALES, INGENIERA DE SISTEMAS, VISIONARIA EN MARKETING DIGITAL',
    image: '/assets/extracted/speak1.jpg',
  },
  {
    id: 'speak-2',
    role: 'COMUNICADOR SOCIAL, ESCRITOR DE DOS LIBROS Y CONFERENCISTA',
    image: '/assets/extracted/speak2.jpg',
  },
  {
    id: 'speak-3',
    name: 'KAREN ESPINAL',
    role: 'ASESORA DE IMAGEN PÚBLICA Y COMUNICADORA',
    image: '/assets/extracted/speak3.jpg',
  },
  {
    id: 'speak-4',
    name: 'FLORAIDA THOMAS',
    role: 'ASESORA DE IMAGEN PÚBLICA Y COMUNICADORA',
    image: '/assets/extracted/speak4.jpg',
  },
  {
    id: 'speak-5',
    image: '/assets/extracted/speak5.jpg',
  },
  {
    id: 'speak-6',
    image: '/assets/extracted/speak6.jpg',
  },
  {
    id: 'speak-7',
    image: '/assets/extracted/speak7.jpg',
  },
  {
    id: 'speak-8',
    image: '/assets/extracted/speak8.jpg',
  },
];

const TOPICS_ROW_1 = [
  {
    title: 'Dars of Ihya Ulum al-Din',
    description:
      'An exploration of Imam Al-Ghazali’s renowned work, examining its spiritual teachings, ethical principles and guidance for personal transformation.',
  },
  {
    title: 'Wilayah: Spiritual Ranks and the Principles of Spiritual Obedience',
    description:
      'Exploring the concept of Wilayah, the diversity of spiritual stations and the principles that guide the journey towards closeness to Allah.',
  },
  {
    title: 'Shaykh and Tariqah: The Radiance of Spirituality',
    description:
      'Examining the role of the spiritual guide and the Tariqah in nurturing spiritual discipline, self-purification and inner development.',
  },
  {
    title: "Imam al-Haddad (RA): Ba'Alawi Roots that Enlightened Kerala",
    description:
      "Discovering the spiritual heritage of Imam al-Haddad and the influence of Ba'Alawi traditions in shaping Kerala's Islamic spiritual landscape.",
  },
  {
    title: 'Tasawwuf: A Life of Religious Commitment',
    description:
      "Understanding Tasawwuf as a way of life rooted in faith, devotion and discipline, shaping one's relationship with Allah and society.",
  },
];

const TOPICS_ROW_2 = [
  {
    title: 'Mysticism, Rationality and Music: Secular Expressions in Contemporary Sufism',
    description:
      'Investigating the relationship between mystical experience, intellectual reasoning and music, with particular attention to their expressions in contemporary Sufism.',
  },
  {
    title: 'Knowledge, Adab and Conduct: The Beauty of the Teacher–Student Relationship',
    description:
      'Understanding the values of respect, humility and ethical conduct that define the relationship between teachers and students in Islamic tradition.',
  },
  {
    title: 'Spirituality: Distortions and False Paths',
    description:
      'Identifying misconceptions and deviations in spiritual practices while highlighting the importance of authentic teachings and sound spiritual guidance.',
  },
  {
    title: 'Ilm al-Tasawwuf: The Exchange of Practical Applications',
    description:
      'Exploring how the principles of Tasawwuf translate into practical spiritual exercises, personal discipline and everyday conduct.',
  },
  {
    title: 'Western Literature: Sufi Readings of Literary Works',
    description:
      'Exploring literary works through the lens of Sufi thought, uncovering spiritual meanings, philosophical reflections and deeper interpretations.',
  },
];

const TOPICS = [...TOPICS_ROW_1, ...TOPICS_ROW_2];

const SPONSORS = [
  { name: 'Sponsor 1', src: '/assets/sponsors/sponsor1.png', heightClass: 'h-12 sm:h-16 md:h-20' },
  { name: 'Sponsor 2', src: '/assets/sponsors/sponsor2.png', heightClass: 'h-12 sm:h-16 md:h-20' },
  { name: 'Sponsor 3', src: '/assets/sponsors/sponsor3.png', heightClass: 'h-12 sm:h-16 md:h-20' },
  { name: 'Sponsor 4', src: '/assets/sponsors/sponsor4.png', heightClass: 'h-12 sm:h-16 md:h-20' },
  { name: 'Sponsor 5', src: '/assets/sponsors/sponsor5.png', heightClass: 'h-12 sm:h-16 md:h-20' },
];

// Initial countdown matching the exact design: 01 Days, 21 Hours, 01 Minutes, 33 Seconds
const INITIAL_SECONDS = 1 * 86400 + 21 * 3600 + 1 * 60 + 33;

export default function App() {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(INITIAL_SECONDS);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(0);
  const [desktopSpeakerPage, setDesktopSpeakerPage] = useState(0);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length === 0) return;
    const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeSpeakerIndex && closestIndex >= 0 && closestIndex < SPEAKERS.length) {
      setActiveSpeakerIndex(closestIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      setActiveSpeakerIndex(index);
    }
  };

  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'error' | 'success'>('idle');

  // Footer newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success'>('idle');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : INITIAL_SECONDS));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const days = String(Math.floor(remainingSeconds / 86400)).padStart(2, '0');
  const hours = String(Math.floor((remainingSeconds % 86400) / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !contactName.trim() ||
      !contactEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)
    ) {
      setContactStatus('error');
      return;
    }
    setContactStatus('success');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  return (
    <div id="top" className="min-h-screen w-full bg-[#140a1b] text-white overflow-x-hidden">
      {/* =====================================================================
          1. HEADER & HERO SECTION
         ===================================================================== */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 40% 35%, #561d22 0%, #421418 38%, #2d0b0f 72%, #1c0507 100%)',
        }}
      >
        {/* Subtle Warm Atmospheric Overlays matching reference */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_25%_45%,rgba(245,215,140,0.08)_0%,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_80%_60%,rgba(215,160,80,0.12)_0%,transparent_50%)]"
        />
        {/* Seamless bottom transition into Section 2 canvas */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#180c22] to-transparent pointer-events-none"
        />

        <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-14 sm:pb-18">
          {/* Top Bar */}
          <header className="flex items-center justify-between gap-4">
            <a href="#top" className="inline-block shrink-0 focus:outline-none" aria-label="Al-Wijdan">
              <MarcaEfectoLogo size="sm" />
            </a>

            <button
              type="button"
              onClick={() => setTicketModalOpen(true)}
              className="rounded-full bg-gradient-to-b from-[#FDE28A] via-[#E8B54A] to-[#C99026] hover:brightness-105 active:scale-[0.98] px-6 sm:px-8 py-2.5 sm:py-2.5 text-[12px] sm:text-[13px] font-semibold text-[#320D12] shadow-[0_4px_16px_rgba(201,144,38,0.25)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Register Now
            </button>
          </header>

          {/* Hero Composition: Left Text Block & Right Book Graphic */}
          <div className="mt-10 sm:mt-14 md:mt-18 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Hero Text Block */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Main Heading: AL-WIJDAN */}
              <h1 className="text-[44px] sm:text-[62px] md:text-[76px] lg:text-[84px] xl:text-[92px] font-serif font-bold uppercase leading-[0.95] tracking-[0.02em] text-[#F7E5BD] drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                AL-WIJDAN
              </h1>

              {/* Subtitle: Tasawwuf Conference */}
              <h2 className="mt-2 sm:mt-3 text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px] font-medium tracking-[0.01em] text-[#F1DCBD] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Tasawwuf Conference
              </h2>

              {/* Description: Italicized, refined ivory */}
              <p className="mt-4 sm:mt-5 text-[13.5px] sm:text-[15px] md:text-[16px] leading-[1.65] text-[#E8D4C0]/90 italic font-light max-w-[490px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                A scholarly gathering that explores the intellectual, spiritual and cultural dimensions of Tasawwuf in the contemporary world.
              </p>

              {/* CTA Button: Register Now */}
              <div className="mt-7 sm:mt-8">
                <button
                  type="button"
                  onClick={() => setTicketModalOpen(true)}
                  className="rounded-full bg-gradient-to-b from-[#FDE28A] via-[#E8B54A] to-[#C99026] hover:brightness-105 active:scale-[0.98] px-8 sm:px-11 py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-bold tracking-[0.02em] text-[#320D12] shadow-[0_8px_28px_rgba(201,144,38,0.35)] transition-all cursor-pointer whitespace-nowrap"
                >
                  Register Now
                </button>
              </div>
            </div>

            {/* Right Book Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[460px]">
                {/* Subtle warm golden back-glow behind the book */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(235,185,85,0.18)_0%,transparent_70%)] blur-2xl"
                />
                <img
                  src="/assets/extracted/hero-book.png"
                  alt="Ihya Ulum al-Din - Tasawwuf Conference"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)] select-none transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* Glassmorphic Event Details Bar - Maroon & Gold Palette */}
          <div className="mt-12 sm:mt-16 lg:mt-20 max-w-[1056px] mx-auto rounded-[22px] border border-[#d4af37]/35 bg-[#25080c]/70 backdrop-blur-md px-5 sm:px-8 md:px-10 py-6 sm:py-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 items-start">
              {/* Item 1: Event Name */}
              <div className="md:col-span-5 flex items-start gap-3.5 pb-5 md:pb-0 md:pr-6 border-b md:border-b-0 border-[#d4af37]/20 relative">
                <div className="pt-0.5">
                  <EventStarCalendarIcon />
                </div>
                <div>
                  <h2 className="text-[14px] sm:text-[16px] font-bold uppercase text-[#F5DC9A] tracking-wider leading-snug">
                    EVENT NAME
                  </h2>
                  <p className="mt-1 text-[12.5px] sm:text-[13px] leading-[1.5] text-[#F5EBE1]">
                    Al-Wijdan 2026: Tasawwuf Conference
                  </p>
                </div>
                {/* Vertical gradient divider on desktop */}
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute right-0 top-1 bottom-1 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/45 to-transparent"
                />
              </div>

              {/* Item 2: Date & Time */}
              <div className="md:col-span-3 flex items-start gap-3.5 pb-5 md:pb-0 md:px-6 border-b md:border-b-0 border-[#d4af37]/20 relative">
                <div className="pt-0.5">
                  <EventClockIcon />
                </div>
                <div>
                  <h2 className="text-[14px] sm:text-[16px] font-bold uppercase text-[#F5DC9A] tracking-wider leading-snug">
                    DATE &amp; TIME
                  </h2>
                  <p className="mt-1 text-[12.5px] sm:text-[13px] leading-[1.5] text-[#F5EBE1]">
                    Sunday, 13 December 2026
                  </p>
                </div>
                {/* Vertical gradient divider on desktop */}
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute right-0 top-1 bottom-1 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/45 to-transparent"
                />
              </div>

              {/* Item 3: Location */}
              <div className="md:col-span-4 flex items-start gap-3.5 md:pl-7">
                <div className="pt-0.5">
                  <EventPinIcon />
                </div>
                <div>
                  <h2 className="text-[14px] sm:text-[16px] font-bold uppercase text-[#F5DC9A] tracking-wider leading-snug">
                    LOCATION
                  </h2>
                  <p className="mt-1 text-[12.5px] sm:text-[13px] leading-[1.5] text-[#F5EBE1]">
                    Tajul Asfiya Square, Kuttippuram, Malappuram, Kerala, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. COUNTDOWN + SPEAKER + NUESTROS PATROCINANTES UNIFIED GRADIENT CANVAS
         ===================================================================== */}
      <div
        style={{
          background:
            'linear-gradient(180deg, #180c22 0%, #241335 12%, #3a2057 26%, #56317b 46%, #361e4f 68%, #211231 85%, #13091a 100%)',
        }}
      >
        {/* 2A. COUNTDOWN BAR */}
        <section aria-label="Cuenta regresiva del evento" className="max-w-[1050px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-10 sm:pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 sm:gap-x-8 place-items-center">
            {[
              { num: days, label: 'Days' },
              { num: hours, label: 'Hours' },
              { num: minutes, label: 'Minutes' },
              { num: seconds, label: 'Seconds' },
            ].map((item) => (
              <div key={item.label} className="flex items-baseline justify-center">
                <OutlinedGradientNumber value={item.num} />
                <span className="text-[18px] sm:text-[23px] md:text-[26px] font-bold text-white tracking-tight -ml-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 2B. SPEAKER SECTION */}
        <section id="speakers" className="max-w-[1180px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden sm:overflow-visible">
          <h2 className="text-center text-[28px] sm:text-[36px] font-bold uppercase tracking-[0.02em] text-white mb-9 sm:mb-12">
            SPEAKER
          </h2>

          {/* Speaker Card Render Helper */}
          {(() => {
            const renderSpeakerCard = (sp: SpeakerData, idx: number, isDesktop = false) => (
              <div
                key={sp.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (!isDesktop) {
                    if (e.key === 'ArrowRight' && idx < SPEAKERS.length - 1) {
                      e.preventDefault();
                      scrollToIndex(idx + 1);
                    } else if (e.key === 'ArrowLeft' && idx > 0) {
                      e.preventDefault();
                      scrollToIndex(idx - 1);
                    }
                  }
                }}
                className={`${
                  isDesktop
                    ? 'w-full lg:min-h-[422px]'
                    : 'w-[80vw] max-w-[285px] sm:w-[300px] shrink-0 snap-center'
                } speaker-border-gradient p-[2.5px] rounded-tl-[48px] rounded-br-[48px] shadow-[0_14px_34px_rgba(10,5,20,0.45)] transition-all duration-300 hover:-translate-y-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-[#13D89A]`}
              >
                <div className="w-full h-full rounded-tl-[46px] rounded-br-[46px] bg-[#0B0B14] overflow-hidden flex flex-col">
                  {/* Speaker Photograph */}
                  <div className="relative w-full aspect-[264/275] overflow-hidden shrink-0 bg-[#0B0B14] flex items-center justify-center">
                    {sp.image ? (
                      <img
                        src={sp.image}
                        alt={sp.name || sp.role || `Speaker ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#241335] via-[#1a0f2b] to-[#120a1f]">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                          <User className="w-8 h-8 sm:w-10 sm:h-10 text-white/50" strokeWidth={1.5} />
                        </div>
                      </div>
                    )}
                    {/* Smooth gradient dissolve into card bottom matching mockup */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-[#3b358f]/85 to-[#222258]" />
                  </div>

                  {/* Speaker Details: Name & Professional Designation */}
                  <div className="flex-1 bg-gradient-to-b from-[#222258] via-[#15183B] to-[#090A12] px-3.5 pt-4 pb-6 flex flex-col items-center justify-start text-center">
                    {sp.name && (
                      <h3 className="text-[15px] sm:text-[15.5px] font-bold uppercase tracking-[0.02em] text-[#13D89A]">
                        {sp.name}
                      </h3>
                    )}
                    {sp.role && (
                      <p
                        className={`${
                          sp.name ? 'mt-1.5' : 'mt-0.5'
                        } text-[10px] sm:text-[10.3px] font-semibold uppercase leading-[1.45] text-white/95 max-w-[235px]`}
                      >
                        {sp.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <>
                {/* DESKTOP VIEW: 4 Cards per Row with Left/Right Navigation Arrows and Smooth Sliding Transition */}
                <div className="relative hidden lg:block">
                  {/* Left Navigation Arrow */}
                  <button
                    type="button"
                    onClick={() => setDesktopSpeakerPage(0)}
                    disabled={desktopSpeakerPage === 0}
                    aria-label="Previous speakers"
                    className={`absolute -left-5 xl:-left-7 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#1c0f2d]/90 hover:bg-[#2d1847] border border-white/20 text-white flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#13D89A] hover:scale-105 active:scale-95 cursor-pointer ${
                      desktopSpeakerPage === 0
                        ? 'opacity-0 pointer-events-none invisible'
                        : 'opacity-100'
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2.2} />
                  </button>

                  {/* Sliding Viewport Container */}
                  <div className="overflow-hidden w-full py-3 px-1 -my-3 -mx-1">
                    <div
                      className="flex transition-transform duration-600 ease-out will-change-transform"
                      style={{
                        transform: `translateX(-${desktopSpeakerPage * 100}%)`,
                      }}
                    >
                      {/* Group 1: First 4 speakers */}
                      <div className="w-full shrink-0 grid grid-cols-4 gap-6 items-stretch">
                        {SPEAKERS.slice(0, 4).map((sp, idx) => renderSpeakerCard(sp, idx, true))}
                      </div>

                      {/* Group 2: Second 4 speakers */}
                      <div className="w-full shrink-0 grid grid-cols-4 gap-6 items-stretch">
                        {SPEAKERS.slice(4, 8).map((sp, idx) => renderSpeakerCard(sp, idx + 4, true))}
                      </div>
                    </div>
                  </div>

                  {/* Right Navigation Arrow */}
                  <button
                    type="button"
                    onClick={() => setDesktopSpeakerPage(1)}
                    disabled={desktopSpeakerPage === 1}
                    aria-label="Next speakers"
                    className={`absolute -right-5 xl:-right-7 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#1c0f2d]/90 hover:bg-[#2d1847] border border-white/20 text-white flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#13D89A] hover:scale-105 active:scale-95 cursor-pointer ${
                      desktopSpeakerPage === 1
                        ? 'opacity-0 pointer-events-none invisible'
                        : 'opacity-100'
                    }`}
                  >
                    <ChevronRight className="w-6 h-6 text-white" strokeWidth={2.2} />
                  </button>

                  {/* Desktop Carousel Indicators */}
                  <div
                    className="flex justify-center items-center gap-2.5 mt-8"
                    aria-label="Speaker desktop pagination"
                  >
                    {[0, 1].map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setDesktopSpeakerPage(page)}
                        aria-label={`View speakers ${page * 4 + 1} to ${page * 4 + 4}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          desktopSpeakerPage === page
                            ? 'w-8 bg-gradient-to-r from-[#10ce99] via-[#6866a9] to-[#ab1cb6]'
                            : 'w-2.5 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* MOBILE VIEW: Horizontal Swipeable Carousel (no desktop arrows) */}
                <div className="block lg:hidden">
                  <div
                    ref={carouselRef}
                    onScroll={handleCarouselScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth items-stretch pb-4 px-4 -mx-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x gap-5"
                  >
                    {SPEAKERS.map((sp, idx) => renderSpeakerCard(sp, idx, false))}
                  </div>

                  {/* Mobile Carousel Pagination Indicators (All 8 Speakers) */}
                  <div
                    className="flex justify-center items-center gap-2 mt-6"
                    aria-label="Speaker carousel pagination"
                  >
                    {SPEAKERS.map((sp, idx) => (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => scrollToIndex(idx)}
                        aria-label={`Go to speaker ${idx + 1}: ${sp.name || sp.role || `Speaker ${idx + 1}`}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          activeSpeakerIndex === idx
                            ? 'w-7 bg-gradient-to-r from-[#10ce99] via-[#6866a9] to-[#ab1cb6]'
                            : 'w-2 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </>
            );
          })()}

          <div className="mt-10 sm:mt-12 text-center">
            <button
              type="button"
              onClick={() => setTicketModalOpen(true)}
              className="rounded-full btn-marca-gradient px-9 sm:px-11 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.04em] text-white shadow-lg transition-transform active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              BUY TICKETS
            </button>
          </div>
        </section>

        {/* 2C. OUR SPONSORS SECTION */}
        <section aria-label="Our Sponsors" className="w-full pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
            <h2 className="text-center text-[25px] sm:text-[36px] font-bold uppercase tracking-[0.02em] text-white mb-10 sm:mb-14">
              OUR SPONSORS
            </h2>
          </div>

          {/* Marquee Wrapper with Edge Fade Mask */}
          <div className="relative w-full overflow-hidden marquee-mask py-3 sm:py-4">
            <div className="animate-marquee-infinite flex items-center">
              {/* Primary Sequence */}
              <div className="flex shrink-0 items-center gap-12 sm:gap-16 md:gap-24 pr-12 sm:pr-16 md:pr-24">
                {[...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
                  <div
                    key={`primary-${sponsor.name}-${idx}`}
                    className="flex items-center justify-center shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                    {...(idx >= SPONSORS.length ? { 'aria-hidden': 'true' } : {})}
                  >
                    <img
                      src={sponsor.src}
                      alt={idx < SPONSORS.length ? sponsor.name : ''}
                      referrerPolicy="no-referrer"
                      className={`${sponsor.heightClass} w-auto max-w-none object-contain`}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate Sequence for seamless infinite loop */}
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center gap-12 sm:gap-16 md:gap-24 pr-12 sm:pr-16 md:pr-24"
              >
                {[...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
                  <div
                    key={`dup-${sponsor.name}-${idx}`}
                    className="flex items-center justify-center shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                  >
                    <img
                      src={sponsor.src}
                      alt=""
                      referrerPolicy="no-referrer"
                      className={`${sponsor.heightClass} w-auto max-w-none object-contain`}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================================
          3. GREEN "MARCA EFECTO" ABOUT BANNER
         ===================================================================== */}
      <section
        className="relative w-full overflow-hidden py-16 sm:py-24"
        style={{
          background:
            'radial-gradient(circle at 8% 45%, #0b966e 0%, #097c5c 28%, #0e4a3d 62%, #131b1d 100%)',
        }}
      >
        {/* Subtle organic contour pattern on left side matching Band 3 */}
        <svg
          aria-hidden="true"
          viewBox="0 0 800 540"
          fill="none"
          className="absolute left-0 top-0 h-full w-auto opacity-[0.12] pointer-events-none"
        >
          <path
            d="M-60 60 C 90 10, 170 160, 310 120 C 450 80, 480 240, 620 210 C 720 190, 760 310, 830 340"
            stroke="#38F2B8"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <path
            d="M-80 210 C 60 150, 150 290, 290 260 C 430 230, 460 390, 610 360"
            stroke="#38F2B8"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M-40 370 C 110 320, 190 460, 350 420 C 490 385, 520 510, 690 490"
            stroke="#38F2B8"
            strokeWidth="22"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6">
            <h2 className="text-[28px] sm:text-[36px] font-bold uppercase text-white leading-tight">
              ABOUT AL-WIJDAN
            </h2>
            <p className="mt-4 text-[13px] sm:text-[14px] leading-[1.7] text-white/95 font-normal max-w-[465px]">
              Al-Wijdan: A Gathering of Remembrance, Refinement and Spiritual Closeness. Al-Wijdan is a Tasawwuf conference organised by Samastha Kerala Jem-iyyathul Ulama, offering a meaningful platform to explore the intellectual heritage, spiritual dimensions and contemporary relevance of Tasawwuf. More than a conference, it is a gathering that brings together scholars, students and representatives from diverse fields to engage with the traditions of Islamic spirituality, the purification of the heart and the cultivation of noble character. Through knowledge, reflection and meaningful dialogue, Al-Wijdan seeks to reconnect spiritual heritage with contemporary society.
            </p>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => setTicketModalOpen(true)}
                className="rounded-full btn-marca-gradient px-9 sm:px-11 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.04em] text-white shadow-lg transition-transform active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                REGISTER NOW
              </button>
            </div>
          </div>

          {/* Right Large Brand Lockup */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <MarcaEfectoLogo size="lg" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CONFERENCE TOPICS SECTION
         ===================================================================== */}
      <section id="topics" className="w-full bg-[#13091a] py-16 sm:py-24 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-[26px] sm:text-[36px] font-bold uppercase tracking-[0.01em] text-white">
              CONFERENCE TOPICS
            </h2>
            <p className="mt-1.5 text-[13.5px] sm:text-[16px] font-medium text-white/95">
              Exploring the Intellectual, Spiritual and Contemporary Dimensions of Tasawwuf
            </p>
          </div>
        </div>

        {/* Two Vertically Stacked Independent Marquee Rows */}
        <div className="mt-10 sm:mt-14 w-full">
          {/* FIRST ROW – FIVE TOPICS (Right to Left) */}
          <div className="relative w-full overflow-hidden topic-marquee-mask py-2">
            <div className="animate-marquee-left flex items-stretch">
              {/* Primary Set */}
              <div className="flex shrink-0 items-stretch gap-6 sm:gap-8 pr-6 sm:pr-8">
                {TOPICS_ROW_1.map((topic, idx) => (
                  <div
                    key={`row1-set1-${idx}`}
                    className="w-[85vw] max-w-[360px] sm:w-[500px] md:w-[540px] lg:w-[550px] shrink-0 topic-border-fade p-[2px] rounded-[26px] flex"
                  >
                    <div className="w-full h-full rounded-[24px] bg-[#13091a] px-6 sm:px-9 py-7 sm:py-8 flex flex-col justify-center text-left">
                      <h3 className="text-[16px] sm:text-[18.5px] md:text-[19.5px] font-bold uppercase leading-[1.3] text-white">
                        {topic.title}
                      </h3>
                      <p className="mt-3 text-[12px] sm:text-[12.8px] md:text-[13px] leading-[1.65] text-white/90 font-normal">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicate Set for Seamless Infinite Loop */}
              <div
                aria-hidden="true"
                className="flex shrink-0 items-stretch gap-6 sm:gap-8 pr-6 sm:pr-8"
              >
                {TOPICS_ROW_1.map((topic, idx) => (
                  <div
                    key={`row1-set2-${idx}`}
                    className="w-[85vw] max-w-[360px] sm:w-[500px] md:w-[540px] lg:w-[550px] shrink-0 topic-border-fade p-[2px] rounded-[26px] flex"
                  >
                    <div className="w-full h-full rounded-[24px] bg-[#13091a] px-6 sm:px-9 py-7 sm:py-8 flex flex-col justify-center text-left">
                      <h3 className="text-[16px] sm:text-[18.5px] md:text-[19.5px] font-bold uppercase leading-[1.3] text-white">
                        {topic.title}
                      </h3>
                      <p className="mt-3 text-[12px] sm:text-[12.8px] md:text-[13px] leading-[1.65] text-white/90 font-normal">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECOND ROW – FIVE TOPICS (Left to Right) */}
          <div className="relative w-full overflow-hidden topic-marquee-mask py-2 mt-6 sm:mt-8">
            <div className="animate-marquee-right flex items-stretch">
              {/* Primary Set */}
              <div className="flex shrink-0 items-stretch gap-6 sm:gap-8 pr-6 sm:pr-8">
                {TOPICS_ROW_2.map((topic, idx) => (
                  <div
                    key={`row2-set1-${idx}`}
                    className="w-[85vw] max-w-[360px] sm:w-[500px] md:w-[540px] lg:w-[550px] shrink-0 topic-border-fade p-[2px] rounded-[26px] flex"
                  >
                    <div className="w-full h-full rounded-[24px] bg-[#13091a] px-6 sm:px-9 py-7 sm:py-8 flex flex-col justify-center text-left">
                      <h3 className="text-[16px] sm:text-[18.5px] md:text-[19.5px] font-bold uppercase leading-[1.3] text-white">
                        {topic.title}
                      </h3>
                      <p className="mt-3 text-[12px] sm:text-[12.8px] md:text-[13px] leading-[1.65] text-white/90 font-normal">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicate Set for Seamless Infinite Loop */}
              <div
                aria-hidden="true"
                className="flex shrink-0 items-stretch gap-6 sm:gap-8 pr-6 sm:pr-8"
              >
                {TOPICS_ROW_2.map((topic, idx) => (
                  <div
                    key={`row2-set2-${idx}`}
                    className="w-[85vw] max-w-[360px] sm:w-[500px] md:w-[540px] lg:w-[550px] shrink-0 topic-border-fade p-[2px] rounded-[26px] flex"
                  >
                    <div className="w-full h-full rounded-[24px] bg-[#13091a] px-6 sm:px-9 py-7 sm:py-8 flex flex-col justify-center text-left">
                      <h3 className="text-[16px] sm:text-[18.5px] md:text-[19.5px] font-bold uppercase leading-[1.3] text-white">
                        {topic.title}
                      </h3>
                      <p className="mt-3 text-[12px] sm:text-[12.8px] md:text-[13px] leading-[1.65] text-white/90 font-normal">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            onClick={() => setTicketModalOpen(true)}
            className="rounded-full btn-marca-gradient px-9 sm:px-11 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.04em] text-white shadow-lg transition-transform active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            BUY TICKETS
          </button>
        </div>
      </section>

      {/* =====================================================================
          5. EVENT OBJECTIVES SECTION
         ===================================================================== */}
      <section
        className="relative w-full overflow-hidden py-16 sm:py-24"
        style={{
          background:
            'linear-gradient(115deg, #5c3b91 0%, #482e6d 46%, #59358c 78%, #6e3ea9 100%)',
        }}
      >
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-6">
            <h2 className="text-[28px] sm:text-[36px] font-bold uppercase text-white leading-tight">
              CONFERENCE OBJECTIVES
            </h2>
            <p className="mt-1 text-[14.5px] sm:text-[16.5px] font-medium text-white">
              Our Principal Objectives
            </p>
            <p className="mt-4 text-[12.5px] sm:text-[13.5px] leading-[1.68] text-white/95 font-normal max-w-[525px]">
              Preserving Intellectual Heritage: Explore and highlight the rich intellectual traditions of Tasawwuf and their enduring contribution to Islamic scholarship and civilisation. Spiritual Refinement and Ethical Development: Encourage the purification of the heart, sincerity, humility, patience and the cultivation of noble character. Contemporary Relevance and Engagement: Examine the relevance of Tasawwuf in addressing contemporary realities and challenges through meaningful intellectual dialogue. Join Al-Wijdan in a collective journey of remembrance, refinement and spiritual closeness, bringing together knowledge, heritage and contemporary perspectives.
            </p>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => setTicketModalOpen(true)}
                className="rounded-full btn-marca-gradient px-9 sm:px-11 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.04em] text-white shadow-lg transition-transform active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                EXPLORE AL-WIJDAN
              </button>
            </div>
          </div>

          {/* Right Stage Video Card with Offset Gradient Backing */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[445px] pr-5 sm:pr-8 pb-5 sm:pb-8">
              {/* Subtle circular speaker ring motif behind the card matching Band 4 */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 sm:-inset-10 flex items-center justify-center"
              >
                <div className="w-[290px] sm:w-[360px] h-[290px] sm:h-[360px] rounded-full border-[14px] border-white/[0.06] shadow-[0_0_40px_rgba(0,0,0,0.25)] flex items-center justify-center">
                  <div className="w-[220px] sm:w-[280px] h-[220px] sm:h-[280px] rounded-full border border-dashed border-white/15" />
                </div>
              </div>

              {/* Offset Gradient Backing Card */}
              <div
                aria-hidden="true"
                className="absolute top-5 sm:top-7 left-6 sm:left-11 right-0 bottom-0 rounded-[18px] bg-gradient-to-r from-[#AF20B8] via-[#5B74A7] to-[#10D39A] shadow-xl"
              />

              {/* Foreground Stage Thumbnail Card */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="group relative block w-full rounded-[18px] overflow-hidden shadow-2xl focus:outline-none cursor-pointer aspect-[414/306]"
                aria-label="Reproducir video de objetivos del evento"
              >
                <img
                  src="/assets/extracted/objectives-stage.webp"
                  alt="Músicos y presentación en vivo en Marca Efecto"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {/* Play Button Centered Overlay */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                    <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="w-4 h-4 ml-0.5"
                        aria-hidden="true"
                      >
                        <path d="M5 3.8L16.2 10L5 16.2V3.8Z" fill="#7B1D8D" />
                      </svg>
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. CONTACTOS + AMETHYST CRYSTALS + FOOTER SECTION
         ===================================================================== */}
      <section id="contactos" className="relative w-full bg-[#16171e] overflow-hidden">
        {/* Upper Nebula Sky + Amethyst Crystals Artwork */}
        <div className="relative w-full bg-[#473a63]">
          {/* Subtle Concentric Orbit Hairlines behind Contact Form */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-6 flex justify-center overflow-hidden"
          >
            <div className="w-[460px] sm:w-[540px] h-[460px] sm:h-[540px] rounded-full border border-white/[0.06] flex items-center justify-center">
              <div className="w-[340px] sm:w-[410px] h-[340px] sm:h-[410px] rounded-full border border-white/[0.05] flex items-center justify-center">
                <div className="w-[230px] sm:w-[280px] h-[230px] sm:h-[280px] rounded-full border border-white/[0.05]" />
              </div>
            </div>
          </div>

          {/* Contact Form Block */}
          <div className="relative z-20 max-w-[430px] mx-auto px-4 pt-16 sm:pt-24 text-center">
            <h2 className="text-[28px] sm:text-[36px] font-bold uppercase text-white tracking-[0.02em]">
              GET IN TOUCH
            </h2>
            <p className="mt-1 text-[13.5px] sm:text-[15.5px] text-white/95 font-normal">
              Feel free to share your questions with us
            </p>

            <form onSubmit={handleContactSubmit} className="mt-7 space-y-3 text-left" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name*"
                    value={contactName}
                    onChange={(e) => {
                      setContactName(e.target.value);
                      if (contactStatus !== 'idle') setContactStatus('idle');
                    }}
                    aria-label="Full Name"
                    className="w-full bg-white/[0.13] border border-white/[0.14] pl-3.5 pr-9 py-2.5 text-[12px] text-white placeholder:text-white/85 focus:outline-none focus:border-[#12D89E]"
                  />
                  <User
                    className="w-3.5 h-3.5 text-white/85 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address*"
                    value={contactEmail}
                    onChange={(e) => {
                      setContactEmail(e.target.value);
                      if (contactStatus !== 'idle') setContactStatus('idle');
                    }}
                    aria-label="Email Address"
                    className="w-full bg-white/[0.13] border border-white/[0.14] pl-3.5 pr-9 py-2.5 text-[12px] text-white placeholder:text-white/85 focus:outline-none focus:border-[#12D89E]"
                  />
                  <Mail
                    className="w-3.5 h-3.5 text-white/85 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Write your message here..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  aria-label="Message"
                  className="w-full h-[90px] bg-white/[0.13] border border-white/[0.14] p-3.5 text-[12px] text-white placeholder:text-white/85 resize-none focus:outline-none focus:border-[#12D89E]"
                />
              </div>

              {contactStatus === 'error' && (
                <p className="text-center text-xs text-[#ff9bb3]">
                  Please enter your name and a valid email address.
                </p>
              )}
              {contactStatus === 'success' && (
                <p className="text-center text-xs text-[#19e6a8]">
                  Message sent! Thank you for contacting Al-Wijdan.
                </p>
              )}

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="rounded-full btn-marca-gradient px-8 sm:px-9 py-3 sm:py-3.5 text-[12px] sm:text-[12.5px] font-semibold uppercase tracking-[0.04em] text-white shadow-lg transition-transform active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>

          {/* Crystal Cluster Illustration Band */}
          <div className="relative -mt-10 sm:-mt-20 md:-mt-28 min-h-[260px] sm:min-h-[370px] md:min-h-[450px] flex flex-col justify-end pb-8 sm:pb-10">
            <img
              src="/assets/extracted/crystals-bg.webp"
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-[50%_58%]"
            />
            {/* Top blend into #473a63 and bottom blend into #16171e */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-[#473a63] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#16171e] to-transparent"
            />

            {/* Footer Brand Lockup at Base of Crystals */}
            <div className="relative z-10 flex justify-center px-4">
              <a href="#top" aria-label="Back to top">
                <MarcaEfectoLogo size="md" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Columns on #16171e */}
        <footer className="relative z-10 bg-[#16171e] pb-12 sm:pb-16">
          <div className="max-w-[1030px] mx-auto px-4 sm:px-6">
            <div className="border-t border-white/80" />

            <div className="pt-8 sm:pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start">
              {/* Column 1: ABOUT AL-WIJDAN */}
              <div className="md:col-span-4">
                <h3 className="text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wide text-white">
                  ABOUT AL-WIJDAN
                </h3>
                <p className="mt-2.5 text-[11.5px] sm:text-[12px] leading-[1.65] text-white/85 max-w-[280px]">
                  Al-Wijdan is a Tasawwuf conference organised by Samastha Kerala Jem-iyyathul Ulama. It brings together scholars, students and delegates to explore the spiritual heritage and contemporary relevance of Tasawwuf.
                </p>
              </div>

              {/* Column 2: CONTACT */}
              <div className="md:col-span-4">
                <h3 className="text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wide text-white">
                  CONTACT
                </h3>
                <p className="mt-2.5 text-[11.5px] sm:text-[12px] leading-[1.6] text-white/85">
                  Connect with the Al-Wijdan organising team.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  {/* Instagram Icon */}
                  <a
                    href="#contactos"
                    aria-label="Instagram"
                    className="w-7 h-7 rounded-[7px] bg-white text-[#16171e] flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className="w-4 h-4">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                      <circle cx="12" cy="12" r="4.2" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>

                  {/* WhatsApp Icon */}
                  <a
                    href="https://wa.me/582120000000"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="w-7 h-7 rounded-full bg-white text-[#16171e] flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM17.36 16.22C17.13 16.86 16.02 17.44 15.48 17.52C14.98 17.6 14.35 17.63 13.65 17.41C13.23 17.27 12.69 17.09 12 16.79C9.1 15.54 7.21 12.62 7.06 12.43C6.92 12.24 5.88 10.86 5.88 9.43C5.88 8 6.63 7.3 6.89 7.01C7.16 6.72 7.47 6.65 7.66 6.65C7.85 6.65 8.05 6.65 8.22 6.66C8.4 6.67 8.64 6.59 8.88 7.16C9.12 7.75 9.71 9.18 9.78 9.33C9.85 9.47 9.9 9.64 9.8 9.83C9.71 10.02 9.66 10.14 9.51 10.31C9.37 10.48 9.21 10.69 9.08 10.82C8.93 10.97 8.78 11.13 8.95 11.42C9.12 11.71 9.7 12.66 10.56 13.43C11.67 14.42 12.6 14.72 12.89 14.87C13.18 15.01 13.35 14.99 13.52 14.8C13.69 14.61 14.24 13.96 14.43 13.67C14.62 13.38 14.82 13.43 15.08 13.53C15.35 13.62 16.77 14.32 17.06 14.47C17.35 14.61 17.54 14.69 17.61 14.81C17.68 14.93 17.68 15.58 17.36 16.22Z" />
                    </svg>
                  </a>

                  {/* Phone Gradient Pill */}
                  <a
                    href="tel:+582120000000"
                    className="inline-flex items-center gap-1.5 rounded-full btn-marca-gradient px-3.5 py-1.5 text-[11px] sm:text-[11.5px] font-medium text-white whitespace-nowrap shadow-md"
                  >
                    <Phone className="w-3 h-3 fill-white text-white shrink-0" />
                    <span className="tabular-nums">+91 9539071681</span>
                  </a>
                </div>
              </div>

              {/* Column 3: FOLLOW AL-WIJDAN UPDATES */}
              <div className="md:col-span-4 w-full">
                <h3 className="text-[12.5px] sm:text-[13px] font-bold uppercase leading-[1.45] tracking-wide text-white">
                  FOLLOW AL-WIJDAN UPDATES
                </h3>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="mt-3.5 flex items-stretch w-full max-w-[335px] rounded-full bg-[#2c2c34] overflow-hidden"
                  noValidate
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                    }}
                    aria-label="Email address for subscription"
                    className="flex-1 min-w-0 bg-transparent pl-4 pr-2 py-2.5 text-[11.5px] text-white placeholder:text-white/75 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-5 sm:px-6 py-2.5 rounded-r-full btn-marca-gradient text-[11px] sm:text-[11.5px] font-semibold uppercase tracking-wide text-white whitespace-nowrap cursor-pointer"
                  >
                    SUBSCRIBE
                  </button>
                </form>

                {newsletterStatus === 'error' && (
                  <p className="mt-1.5 text-[11px] text-[#ff9bb3]">
                    Please enter a valid email address.
                  </p>
                )}
                {newsletterStatus === 'success' && (
                  <p className="mt-1.5 text-[11px] text-[#19e6a8]">
                    Thank you for subscribing to Al-Wijdan updates!
                  </p>
                )}
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Interactive Modals */}
      <TicketModal isOpen={ticketModalOpen} onClose={() => setTicketModalOpen(false)} />
      <VideoPreviewModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onBookClick={() => setTicketModalOpen(true)}
      />
    </div>
  );
}
