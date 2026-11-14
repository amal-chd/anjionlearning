import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  CalendarPlus, 
  Share2, 
  Lock, 
  AlertCircle, 
  Sparkles,
  QrCode,
  Ticket
} from "lucide-react";

export default function RegistrationSection({ eventData }) {
  const isFCI = eventData.id === "fci";

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    preparationStatus: "Just getting started",
    consent: true
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedPass, setConfirmedPass] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Inline validation
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const cleanPhone = formData.mobile.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.consent) {
      setErrorMsg("Please accept the webinar communication consent.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    // Gather UTM parameters from URL or localStorage
    const searchParams = new URLSearchParams(window.location.search);
    const attribution = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach(k => {
      attribution[k] = searchParams.get(k) || localStorage.getItem("sd_" + k) || "";
    });

    const payload = {
      fullName: formData.fullName.trim(),
      mobile: cleanPhone,
      email: formData.email.trim(),
      preparationStatus: formData.preparationStatus,
      webinar: eventData.name,
      consent: formData.consent,
      attribution
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to reserve your pass. Please try again.");
      }

      // Successful registration!
      setConfirmedPass(data.pass || {
        passId: data.registrationId,
        attendeeName: formData.fullName,
        webinar: eventData.name,
        sessionDetails: {
          date: eventData.eventDate,
          time: eventData.eventTime,
          platform: eventData.platform
        }
      });

      // Fire celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully
      }

      // Trigger Meta Pixel conversion
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: eventData.name,
          status: "confirmed"
        });
      }

    } catch (err) {
      console.error("Registration error:", err);
      setErrorMsg(err.message || "Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Anjion Learning: ${eventData.name} Strategy Drop`);
    const details = encodeURIComponent(`The Strategy Drop live session by Anjion Learning.\nOne Session. A Clearer Preparation Roadmap.\nPass ID: ${confirmedPass?.passId}\nPlatform: ${eventData.platform}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=Online`;
  };

  return (
    <section id="register" className="py-16 sm:py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Trust Reassurances */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-anjion-700 bg-anjion-50 border border-anjion-200 px-3.5 py-1 rounded-full">
                SAVE YOUR PLACE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-4">
                Your next step starts with a free pass.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Tell us a little about your preparation. We’ll reserve your digital attendee pass and share your private joining credentials for this {isFCI ? "FCI" : "Kerala PSC LDC"} strategy drop.
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Instant VIP Pass Generation & Confirmation</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Private Live Stream Link Via WhatsApp / SMS</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Exclusive Starter Kit PDF Download Link</span>
                </div>
              </div>
            </div>

            {/* Privacy & Independent Platform Disclaimer */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-anjion-600" />
                <span>Strict Privacy & Zero Spam Guarantee</span>
              </div>
              <p>
                Anjion Learning is an independent education platform established in 2025. This webinar is not affiliated with or endorsed by any government agency.
              </p>
              <p className="text-[11px] text-slate-400">
                Your contact details are encrypted and solely used to deliver session credentials and preparation updates.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Registration Form OR Digital Pass */}
          <div className="lg:col-span-7">
            
            {!confirmedPass ? (
              /* REGISTRATION FORM CARD */
              <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-2xl p-6 sm:p-10 relative">
                
                {/* Form Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <span>CLAIM YOUR FREE PASS</span>
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    </h3>
                    <p className="text-xs font-semibold text-anjion-700 mt-1">
                      {eventData.name} — Free Live Webinar
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>100% Free Pass</span>
                  </div>
                </div>

                {/* Inline Error Message */}
                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Menon / Anjali Nair"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-anjion-600 focus:ring-4 focus:ring-anjion-100 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Mobile & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="9876543210"
                          maxLength={10}
                          required
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 focus:border-anjion-600 focus:ring-4 focus:ring-anjion-100 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Joining link and reminder will be shared here.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Email Address <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-anjion-600 focus:ring-4 focus:ring-anjion-100 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        For calendar invite and notes.
                      </span>
                    </div>
                  </div>

                  {/* Preparation Status & Webinar Track */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Preparation Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="preparationStatus"
                        value={formData.preparationStatus}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-anjion-600 focus:ring-4 focus:ring-anjion-100 text-sm font-medium text-slate-900 outline-none transition-all bg-white"
                      >
                        <option value="Just getting started">Just getting started</option>
                        <option value="Preparing for 3-6 months">Preparing for 3-6 months</option>
                        <option value="Repeater / Aiming for top rank">Repeater / Aiming for top rank</option>
                        <option value="Working professional">Working professional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Webinar Selection
                      </label>
                      <input
                        type="text"
                        disabled
                        value={eventData.name}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-100 text-sm font-bold text-slate-600 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded text-anjion-600 focus:ring-anjion-500 border-slate-300 accent-anjion-600"
                      />
                      <span className="text-xs text-slate-600 leading-normal select-none">
                        I agree to receive the webinar link, reminders and study resources from Anjion Learning. I can opt out anytime.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-anjion-600 hover:bg-anjion-700 active:scale-[0.99] disabled:bg-slate-300 text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-anjion-600/30 hover:shadow-xl hover:shadow-anjion-600/40 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>GENERATING YOUR PASS…</span>
                      </span>
                    ) : (
                      <>
                        <span>RESERVE MY FREE PASS</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" />
                      256-Bit SSL Encrypted · No Credit Card Required
                    </span>
                  </div>

                </form>

              </div>
            ) : (
              /* DIGITAL VIP PASS EXPERIENCE */
              <div id="printable-pass" className="relative bg-white rounded-3xl border-2 border-anjion-300 shadow-pass overflow-hidden">
                
                {/* Pass Top Banner */}
                <div className="bg-gradient-to-r from-anjion-900 via-anjion-800 to-slate-900 text-white p-6 sm:p-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl font-black border border-white/20">
                      🎟
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-anjion-300 block">
                        ANJION LEARNING · THE STRATEGY DROP
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        OFFICIAL WEBINAR PASS
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                      CONFIRMED
                    </span>
                  </div>
                </div>

                {/* Perforated Ticket Notch Line */}
                <div className="relative flex items-center justify-between px-6 py-2 bg-slate-100 border-y border-dashed border-slate-300">
                  <div className="w-4 h-4 rounded-full bg-white -ml-8 border-r border-slate-300"></div>
                  <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-2"></div>
                  <div className="w-4 h-4 rounded-full bg-white -mr-8 border-l border-slate-300"></div>
                </div>

                {/* Pass Body Content */}
                <div className="p-6 sm:p-8 bg-white space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PASS HOLDER</div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">{confirmedPass.attendeeName}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">ID: {confirmedPass.passId}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">EVENT TRACK</div>
                      <div className="text-base font-extrabold text-anjion-700 mt-0.5">{confirmedPass.webinar}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{eventData.duration} Live Session</div>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div className="p-4 rounded-2xl bg-anjion-50/70 border border-anjion-100 text-xs text-slate-700 space-y-1.5">
                    <div className="font-bold text-slate-900 text-sm">📅 {eventData.eventDate}</div>
                    <div>⏰ <strong>Time:</strong> {eventData.eventTime}</div>
                    <div>🌐 <strong>Access:</strong> {eventData.platform}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={generateGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-anjion-600 hover:bg-anjion-700 text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      <span>Add to Google Calendar</span>
                    </a>

                    <button
                      onClick={() => window.print()}
                      className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Print Pass</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-slate-400">
                    Your unique joining link will be dispatched via SMS & WhatsApp on the morning of the session.
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
