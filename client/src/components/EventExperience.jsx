import React from "react";
import { Check, Calendar, Clock, MonitorPlay, Users, Award, ShieldCheck, HelpCircle } from "lucide-react";

export default function EventExperience({ eventData }) {
  const isFCI = eventData.id === "fci";

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-anjion-700 bg-anjion-50 border border-anjion-200 px-3.5 py-1 rounded-full">
            A SESSION WITH A CLEAR PURPOSE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-4">
            {isFCI ? "Make your FCI preparation more deliberate." : "Find a steadier rhythm for LDC prep."}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {isFCI
              ? "Food Corporation of India examinations have specific sectional requirements. Use this webinar to step back, understand high-yield priorities, and leave with a clearer roadmap."
              : "Aspirants often juggle many books, channels, and notes. This session is a chance to simplify your next steps and build a consistent, sustainable study routine."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Columns: Who Should Attend & What You Will Learn */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Who Should Attend */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2.5">
                <Users className="w-5 h-5 text-anjion-600" />
                <span>Who Should Attend This Session?</span>
              </h3>

              <div className="space-y-4">
                {eventData.whoShouldAttend.map((aud, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{aud.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{aud.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Curriculum Takeaways */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-anjion-600" />
                <span>What You Will Learn In 75 Minutes</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventData.curriculumTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200/60 bg-white hover:border-anjion-300 transition-colors">
                    <span className="text-[11px] font-black text-anjion-600 uppercase tracking-wider block mb-1">
                      Module 0{idx + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{takeaway.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{takeaway.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Proposed Starter Kit Contents */}
            <div className="bg-gradient-to-br from-anjion-900 to-slate-900 text-white p-7 sm:p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 text-anjion-300 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Included with your Free Pass</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Downloadable Starter Kit Blueprint</h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Handouts prepared by Anjion Learning's academic content team, shared directly with registered participants:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {eventData.starterKitDetails.map((kit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-anjion-500/30 text-anjion-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      ★
                    </span>
                    <span>{kit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right 5 Columns: Visual Event Information Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col gap-6">
              
              <div className="border-b border-slate-100 pb-5">
                <span className="text-[11px] font-black text-anjion-600 uppercase tracking-widest block mb-1">
                  OFFICIAL EVENT BRIEF
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {eventData.name} Strategy Session
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Live interactive webinar conducted by Anjion Learning expert educators.
                </p>
              </div>

              {/* Event Metadata Rows */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Calendar className="w-5 h-5 text-anjion-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Date</div>
                    <div className="text-sm font-extrabold text-slate-900">{eventData.eventDate}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-anjion-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time & Duration</div>
                    <div className="text-sm font-extrabold text-slate-900">{eventData.eventTime} ({eventData.duration})</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <MonitorPlay className="w-5 h-5 text-anjion-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Access Platform</div>
                    <div className="text-sm font-extrabold text-slate-900">{eventData.platform}</div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-anjion-700 border border-blue-100">
                  100% Free Pass
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {eventData.language}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Live Faculty Q&A
                </span>
              </div>

              {/* How to Join Instructions */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex flex-col gap-2">
                <div className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>How to Join the Webinar?</span>
                </div>
                <p className="text-[11px] text-amber-900/90 leading-relaxed">
                  Reserve your free pass below. We will send the private access link and session reminder directly to your mobile number and WhatsApp prior to the start time.
                </p>
              </div>

              {/* Bottom Jump CTA */}
              <a
                href="#register"
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-md active:scale-95 transition-all"
              >
                Claim Your Seat & Free Pass ↓
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
