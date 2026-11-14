import React from "react";
import { ArrowRight, Ticket } from "lucide-react";

export default function StickyMobileCTA({ eventData }) {
  return (
    <div className="sm:hidden fixed bottom-3 left-3 right-3 z-50">
      <a
        href="#register"
        className="w-full py-3.5 px-5 rounded-2xl bg-anjion-600 active:bg-anjion-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-2xl border border-anjion-400/40"
      >
        <div className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-amber-300" />
          <span>FREE WEBINAR PASS</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold">
          <span>CLAIM SEAT</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </a>
    </div>
  );
}
