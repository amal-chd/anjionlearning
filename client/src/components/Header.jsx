import React from "react";
import { ArrowUpRight, Sparkles, BookOpen } from "lucide-react";

export default function Header({ currentTrack, onTrackChange }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand & Campaign */}
        <div className="flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-anjion-600 to-anjion-800 flex items-center justify-center text-white font-black text-xl shadow-md shadow-anjion-600/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg leading-tight">
                ANJION <span className="text-anjion-600">LEARNING</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                The Strategy Drop
              </span>
            </div>
          </a>
        </div>

        {/* Track Switcher (FCI vs Kerala PSC LDC) */}
        <div className="hidden md:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => onTrackChange("fci")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              currentTrack === "fci"
                ? "bg-white text-anjion-700 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="text-base">🌾</span>
            <span>FCI Strategy</span>
            {currentTrack === "fci" && (
              <span className="w-2 h-2 rounded-full bg-anjion-600"></span>
            )}
          </button>
          
          <button
            onClick={() => onTrackChange("kerala-psc-ldc")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              currentTrack === "kerala-psc-ldc"
                ? "bg-white text-anjion-700 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="text-base">📜</span>
            <span>Kerala PSC LDC</span>
            {currentTrack === "kerala-psc-ldc" && (
              <span className="w-2 h-2 rounded-full bg-anjion-600"></span>
            )}
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-anjion-600 hover:bg-anjion-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-anjion-600/25 hover:shadow-lg hover:shadow-anjion-600/35 active:scale-95 transition-all"
          >
            <span>Claim Free Pass</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Mobile Track Switcher Strip */}
      <div className="flex md:hidden border-t border-slate-100 px-4 py-2 bg-slate-50 justify-center gap-2">
        <button
          onClick={() => onTrackChange("fci")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            currentTrack === "fci"
              ? "bg-white text-anjion-700 shadow-sm border border-slate-200"
              : "text-slate-600"
          }`}
        >
          <span>🌾</span>
          <span>FCI Prep</span>
        </button>
        <button
          onClick={() => onTrackChange("kerala-psc-ldc")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            currentTrack === "kerala-psc-ldc"
              ? "bg-white text-anjion-700 shadow-sm border border-slate-200"
              : "text-slate-600"
          }`}
        >
          <span>📜</span>
          <span>Kerala PSC LDC</span>
        </button>
      </div>
    </header>
  );
}
