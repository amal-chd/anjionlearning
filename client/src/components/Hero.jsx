import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, Radio, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Hero({ eventData }) {
  // Countdown to event date
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 8, minutes: 24, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isFCI = eventData.id === "fci";

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-blue-50/60 via-white to-slate-50">
      
      {/* Background Subtle Geometric Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-anjion-100/40 via-blue-100/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Campaign Info, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Small Campaign Label & Live Event Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-anjion-50 border border-anjion-200/80 mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-anjion-800">
                THE STRATEGY DROP
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] sm:text-xs font-bold text-anjion-600 uppercase">
                FREE LIVE WEBINAR
              </span>
            </div>

            {/* Main Headline & Supporting Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-4">
              STOP PREPARING <br className="hidden sm:inline" />
              WITHOUT A <span className="text-transparent bg-clip-text bg-gradient-to-r from-anjion-600 via-blue-600 to-indigo-700 italic">PLAN.</span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-slate-700 mb-4 tracking-tight">
              Start preparing with direction.
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              {isFCI ? (
                <>
                  Join Anjion Learning's exclusive exam strategy session and discover a structured approach to your 
                  <strong className="text-slate-900 font-bold"> FCI (Food Corporation of India)</strong> preparation. 
                  Learn syllabus prioritization, sectional timing, and high-yield scoring frameworks.
                </>
              ) : (
                <>
                  Join Anjion Learning's exclusive exam strategy session and discover a structured approach to your 
                  <strong className="text-slate-900 font-bold"> Kerala PSC LDC</strong> preparation. 
                  Master the 100-mark distribution, SCERT foundation roadmap, and negative mark elimination.
                </>
              )}
            </p>

            {/* Event Countdown Banner */}
            <div className="w-full max-w-lg mb-8 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-anjion-50 text-anjion-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Event Starts In</div>
                  <div className="text-sm font-bold text-slate-900">{eventData.eventDate}</div>
                </div>
              </div>

              {/* Countdown Digits */}
              <div className="flex items-center gap-1.5 font-mono text-center">
                <div className="bg-slate-900 text-white rounded-lg px-2.5 py-1.5">
                  <div className="text-base font-black leading-none">{String(timeLeft.days).padStart(2, "0")}</div>
                  <div className="text-[9px] uppercase tracking-tighter opacity-70">Days</div>
                </div>
                <span className="font-bold text-slate-400">:</span>
                <div className="bg-slate-900 text-white rounded-lg px-2.5 py-1.5">
                  <div className="text-base font-black leading-none">{String(timeLeft.hours).padStart(2, "0")}</div>
                  <div className="text-[9px] uppercase tracking-tighter opacity-70">Hours</div>
                </div>
                <span className="font-bold text-slate-400">:</span>
                <div className="bg-slate-900 text-white rounded-lg px-2.5 py-1.5">
                  <div className="text-base font-black leading-none">{String(timeLeft.minutes).padStart(2, "0")}</div>
                  <div className="text-[9px] uppercase tracking-tighter opacity-70">Mins</div>
                </div>
                <span className="font-bold text-slate-400">:</span>
                <div className="bg-anjion-600 text-white rounded-lg px-2.5 py-1.5 animate-pulse">
                  <div className="text-base font-black leading-none">{String(timeLeft.seconds).padStart(2, "0")}</div>
                  <div className="text-[9px] uppercase tracking-tighter opacity-70">Secs</div>
                </div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6">
              <a
                href="#register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-anjion-600 hover:bg-anjion-700 text-white font-extrabold text-base tracking-wide uppercase shadow-lg shadow-anjion-600/30 hover:shadow-xl hover:shadow-anjion-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
              >
                <span>GET YOUR FREE PASS</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex flex-col justify-center text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-800">Free registration.</span>
                <span>Limited live session schedule.</span>
              </div>
            </div>

            {/* Quick Trust Reassurances */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-200/80 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Free Attendee Pass</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Downloadable Starter Kit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Live Faculty Q&A</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Floating Pass Preview */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              
              {/* Educational Study Image */}
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                <img
                  src={eventData.heroImage}
                  alt={isFCI ? "Learner studying with grain silos background for FCI prep" : "Learner focused at study desk for Kerala PSC LDC prep"}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  fetchPriority="high"
                />
                
                {/* Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              </div>

              {/* Floating Event Pill on Image */}
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/80 text-[11px] font-extrabold tracking-wider text-slate-900 uppercase">
                {isFCI ? "FCI · STRATEGY" : "KERALA PSC · LDC"}
              </div>

              {/* Card Bottom Meta Box */}
              <div className="p-6 bg-slate-900 text-white flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="text-xs uppercase tracking-widest text-anjion-400 font-bold">
                    One Session. A Clearer Preparation Roadmap.
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    LIVE
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {eventData.name} Preparation Strategy
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your next step towards smarter exam preparation starts here. Join 50+ faculty mentors and thousands of fellow aspirants.
                </p>
                <div className="flex items-center justify-between pt-2 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-anjion-400" />
                    {eventData.eventDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-anjion-400" />
                    {eventData.eventTime}
                  </span>
                </div>
              </div>

            </div>

            {/* Decorative Floating VIP Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                🎟
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black text-slate-900">VIP FREE PASS</span>
                <span className="text-[10px] text-slate-500 font-semibold">Instant digital access</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
