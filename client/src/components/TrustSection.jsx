import React from "react";
import { Users, GraduationCap, Star, ShieldCheck, Download, Smartphone } from "lucide-react";

export default function TrustSection() {
  const credentials = [
    {
      value: "50+",
      label: "Dedicated Teachers & Staff",
      sub: "Subject experts & mentors"
    },
    {
      value: "2,00,000+",
      label: "Community Learners",
      sub: "Active student network"
    },
    {
      value: "3,000+",
      label: "Enrolled Paid Students",
      sub: "Across batches & courses"
    },
    {
      value: "4.9 ★",
      label: "Google Play Store Rating",
      sub: "Student reviewed app"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-blue-600/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-anjion-400 bg-anjion-950/80 border border-anjion-800/80 px-3.5 py-1 rounded-full">
            AUTHENTIC CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-4 mb-4">
            Built by educators. Trusted by thousands.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Anjion Learning is a next-generation education platform founded in 2025 by Ms. Anjana Pradeep and Mr. Irshad Ashraf with a clear mission — to make examination learning more accessible, practical, engaging, and future-ready.
          </p>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wide">{stat.label}</div>
              <div className="text-[11px] text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Real Student Testimonial & App Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-white/10">
          
          {/* Testimonial Quote Bubble */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <blockquote className="text-sm sm:text-base text-slate-200 italic leading-relaxed mb-4">
              "Anjion Learning brings clarity that is missing in typical coaching centers. The focused mentors, structured notes, and realistic mock sessions made my exam preparation manageable and confident."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-anjion-700 flex items-center justify-center font-bold text-xs text-white">
                SA
              </div>
              <div>
                <div className="text-xs font-bold text-white">Sweety Abey</div>
                <div className="text-[10px] text-slate-400">Verified Enrolled Student · Anjion Learning</div>
              </div>
            </div>
          </div>

          {/* Mobile App Download Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-anjion-800/80 to-blue-900/80 border border-anjion-700/50 p-6 sm:p-8 rounded-3xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-anjion-300" />
              <div>
                <h4 className="text-base font-bold text-white">Learn Anywhere on Android</h4>
                <p className="text-xs text-slate-300">Download the official Anjion Learning App</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Access live and recorded lectures, test series, Telegram study groups, and notes anytime directly on your smartphone.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.oggqmn.fekeri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              <span>Get on Google Play</span>
              <Download className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
