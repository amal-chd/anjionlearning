import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import BenefitsSection from "./components/BenefitsSection.jsx";
import EventExperience from "./components/EventExperience.jsx";
import RegistrationSection from "./components/RegistrationSection.jsx";
import TrustSection from "./components/TrustSection.jsx";
import StickyMobileCTA from "./components/StickyMobileCTA.jsx";
import Footer from "./components/Footer.jsx";

const FALLBACK_TRACKS = {
  fci: {
    id: "fci",
    name: "FCI (Food Corporation of India)",
    shortName: "FCI",
    tagline: "FCI Assistant Grade III & Manager Exam Strategy",
    heroImage: "/assets/Focused Study with Grain Silos in the Background.png",
    eventDate: "Sunday, 24th November 2026",
    eventTime: "7:00 PM - 8:15 PM IST",
    duration: "75 Minutes",
    platform: "Private Live Stream (Link shared via SMS/WhatsApp)",
    language: "Malayalam & English (Bilingual)",
    whoShouldAttend: [
      {
        title: "Fresh Graduates & Beginners",
        desc: "Aspirants targeting FCI Grade III / Depot / General / Accounts for the first time who need a structured start."
      },
      {
        title: "Working Professionals",
        desc: "Aspirants with limited daily study hours who need high-yield study blocks and efficient practice schedules."
      },
      {
        title: "SSC & Banking Aspirants",
        desc: "Learners already preparing for central exams wanting to align their syllabus overlap and ace FCI specific sections."
      }
    ],
    curriculumTakeaways: [
      {
        title: "Phase I & II Pattern Deconstruction",
        desc: "Detailed mark distribution across Reasoning, Quantitative Aptitude, English Language & General Studies."
      },
      {
        title: "Sectional Time Management Strategy",
        desc: "Techniques to navigate 15-minute sectional timers without panic or negative marking traps."
      },
      {
        title: "High-Yield Topics Prioritization",
        desc: "Focus areas in Static GK, Current Affairs, and Data Interpretation that historically yield maximum ROI."
      },
      {
        title: "Study Material & Mock Test Schedule",
        desc: "How to balance reading, sectional drills, and full-length simulated mock tests over 90 days."
      }
    ],
    starterKitDetails: [
      "FCI Comprehensive Syllabus Blueprint & Weightage Sheet (PDF)",
      "50 Previous Year High-Frequency Question Compendium",
      "Daily 3-Hour Time-Blocked Preparation Routine Template"
    ]
  },
  "kerala-psc-ldc": {
    id: "kerala-psc-ldc",
    name: "Kerala PSC LDC (Lower Division Clerk)",
    shortName: "Kerala PSC LDC",
    tagline: "Kerala PSC LDC & Degree Level Exam Strategy",
    heroImage: "/assets/Focused Study at a Cozy Desk-8.png",
    eventDate: "Saturday, 23rd November 2026",
    eventTime: "7:30 PM - 8:45 PM IST",
    duration: "75 Minutes",
    platform: "Private Live Stream (Link shared via SMS/WhatsApp)",
    language: "Malayalam Medium with Bilingual Notes",
    whoShouldAttend: [
      {
        title: "LDC 2026-2027 Aspirants",
        desc: "Aspirants aiming for top rank in upcoming Kerala PSC Lower Division Clerk and Secretariat Assistant exams."
      },
      {
        title: "SCERT / NCERT Self-Study Learners",
        desc: "Students who have completed school textbooks but struggle to translate theoretical knowledge into PSC rank list marks."
      },
      {
        title: "Repeaters Aiming for Score Improvement",
        desc: "Candidates stuck at 50-60 marks who need targeted elimination of negative marks and revision blueprints."
      }
    ],
    curriculumTakeaways: [
      {
        title: "100-Mark Distribution Mastery",
        desc: "Strategic focus on Kerala Renaissance, General Science, Indian Constitution, Arithmetic & Mental Ability."
      },
      {
        title: "Language Sections (Malayalam & English) Edge",
        desc: "How scoring 18+ in General English and Malayalam Grammar separates rank holders from the rest."
      },
      {
        title: "SCERT Textbook Question Mapping",
        desc: "Direct mapping of standard 5th to 10th standard SCERT textbook topics to recent PSC question papers."
      },
      {
        title: "OMR Speed & Negative Marking Control",
        desc: "Proven examination hall strategy to eliminate guesswork and safely maximize net positive score."
      }
    ],
    starterKitDetails: [
      "Kerala PSC LDC 100-Mark Topic Priority Checklist (PDF)",
      "High-Yield SCERT Science & Social Science Quick Revision Formula Sheet",
      "Anjion 60-Day Structured Revision Calendar"
    ]
  }
};

export default function App() {
  // Determine initial track from URL path or query parameter
  const getInitialTrack = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("kerala-psc-ldc") || path.includes("ldc")) return "kerala-psc-ldc";
    if (path.includes("fci")) return "fci";

    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get("track");
    if (trackParam && trackParam.toLowerCase().includes("ldc")) return "kerala-psc-ldc";
    return "fci";
  };

  const [currentTrack, setCurrentTrack] = useState(getInitialTrack);
  const [eventData, setEventData] = useState(FALLBACK_TRACKS[currentTrack] || FALLBACK_TRACKS.fci);

  // Switch track handler
  const handleTrackChange = (trackKey) => {
    setCurrentTrack(trackKey);
    setEventData(FALLBACK_TRACKS[trackKey]);
    
    // Smooth URL update
    const url = new URL(window.location);
    url.searchParams.set("track", trackKey);
    window.history.replaceState({}, "", url);
  };

  // Sync state if user navigates back/forward
  useEffect(() => {
    const handlePopState = () => {
      const track = getInitialTrack();
      setCurrentTrack(track);
      setEventData(FALLBACK_TRACKS[track]);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      <Header currentTrack={currentTrack} onTrackChange={handleTrackChange} />
      <main id="top" className="flex-1">
        <Hero eventData={eventData} />
        <BenefitsSection eventData={eventData} />
        <EventExperience eventData={eventData} />
        <RegistrationSection eventData={eventData} />
        <TrustSection />
      </main>
      <Footer />
      <StickyMobileCTA eventData={eventData} />
    </div>
  );
}
