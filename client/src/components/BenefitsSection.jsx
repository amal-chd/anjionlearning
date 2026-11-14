import React from "react";
import { Compass, Map, FileSpreadsheet, MessagesSquare, ArrowUpRight } from "lucide-react";

export default function BenefitsSection({ eventData }) {
  const isFCI = eventData.id === "fci";

  const benefits = [
    {
      icon: Compass,
      title: "LIVE STRATEGY SESSION",
      description: isFCI
        ? "Learn a structured approach to FCI Phase I & II examination preparation and syllabus navigation."
        : "Explore a structured approach to Kerala PSC LDC preparation, SCERT mapping and time allocation.",
      badge: "Interactive"
    },
    {
      icon: Map,
      title: "PREPARATION ROADMAP",
      description: isFCI
        ? "Explore ways to organise topics, daily study blocks, practice drills and revision schedules."
        : "Think through study priorities, Malayalam & English grammar weightages, and regular mock drills.",
      badge: "Actionable"
    },
    {
      icon: FileSpreadsheet,
      title: "EXCLUSIVE STARTER KIT",
      description: isFCI
        ? "Comprehensive FCI Syllabus Blueprint, weightage sheet and high-frequency question framework."
        : "Kerala PSC LDC 100-mark topic priority checklist and SCERT quick revision formula sheet.",
      badge: "Downloadable PDF"
    },
    {
      icon: MessagesSquare,
      title: "LIVE Q&A",
      description: "Bring your doubts and get direct, candid clarity from senior faculty during the live session.",
      badge: "Direct Access"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-black tracking-wider uppercase text-slate-700 mb-3">
            THE STRATEGY DROP
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            YOUR FREE PASS UNLOCKS
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A practical session designed to help you make your preparation more intentional, structured, and easier to organise.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-7 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-anjion-500/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-anjion-100/60 text-anjion-700 group-hover:bg-anjion-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2.5 group-hover:text-anjion-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-anjion-600 transition-colors">
                  <span>Part of Free Pass</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
