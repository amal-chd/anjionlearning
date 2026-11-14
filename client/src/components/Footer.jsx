import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-anjion-600 flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                ANJION LEARNING
              </span>
            </div>
            <p className="text-slate-400 max-w-md text-xs leading-relaxed">
              The Strategy Drop — One Session. A Clearer Preparation Roadmap.
              Empowering competitive exam aspirants across India with practical, structured learning.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="https://anjionlearning.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <a href="https://anjionlearning.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="https://anjionlearning.com/refund-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Refund Policy
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.oggqmn.fekeri" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Download App
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Anjion Learning. All rights reserved.
          </div>
          <div className="text-center md:text-right max-w-xl">
            Disclaimer: Anjion Learning is an independent educational technology platform established in 2025. This webinar and materials are created purely for coaching and academic training, and are not affiliated with or endorsed by Kerala PSC, FCI, or any government body.
          </div>
        </div>

      </div>
    </footer>
  );
}
