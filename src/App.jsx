import React, { useEffect, useState } from 'react';

const EVENTS = {
  fci: {
    id: 'FCI', name: 'FCI Exam Strategy Session', short: 'FCI',
    image: '/assets/fci-study.webp', alt: 'A learner studying near grain storage silos',
    eyebrow: 'FOOD CORPORATION OF INDIA EXAM PREPARATION',
    title: <>STOP PREPARING<br />WITHOUT A <em>PLAN.</em></>,
    intro: 'A clearer way to approach FCI preparation. Join Anjion Learning for a focused strategy session on building structure around your exam prep.',
    detail: 'A practical session for FCI aspirants who want to make their preparation more intentional and easier to organise.',
    audience: 'FCI aspirants beginning, continuing or returning to their preparation.',
    benefits: [
      ['01', 'LIVE STRATEGY SESSION', 'Explore a structured approach to FCI examination preparation.'],
      ['02', 'PREPARATION ROADMAP', 'Organise your study topics, practice and revision.'],
      ['03', 'A CLEARER START', 'Build a useful framework for your next steps.'],
      ['04', 'LIVE Q&A', 'Bring your questions and get clarity during the session.'],
    ],
    learn: ['Set a realistic direction for the weeks ahead.', 'Prioritise topics and make room for regular revision.', 'Bring learning and practice into a steadier routine.'],
    trust: 'This is an independent learning session by Anjion Learning and is not affiliated with or endorsed by any government agency.',
  },
  'kerala-psc-ldc': {
    id: 'Kerala PSC LDC', name: 'Kerala PSC LDC Study Strategy', short: 'Kerala PSC LDC',
    image: '/assets/ldc-study.webp', alt: 'A learner concentrating on a study session in a bright workspace',
    eyebrow: 'KERALA PSC LOWER DIVISION CLERK PREPARATION',
    title: <>MAKE YOUR LDC<br />PREP <em>COUNT.</em></>,
    intro: 'A more organised approach to Kerala PSC LDC preparation. Join Anjion Learning for a focused session on planning your study, revision and practice with purpose.',
    detail: 'A practical session to help bring clarity and rhythm to your Kerala PSC LDC preparation.',
    audience: 'Kerala PSC LDC aspirants who are starting, actively preparing or returning for another attempt.',
    benefits: [
      ['01', 'LIVE STRATEGY SESSION', 'Explore a structured approach to Kerala PSC LDC preparation.'],
      ['02', 'PREPARATION ROADMAP', 'Bring study priorities, revision and practice into focus.'],
      ['03', 'A STEADIER ROUTINE', 'Build a simple framework to guide your preparation.'],
      ['04', 'LIVE Q&A', 'Bring your questions and get clarity during the session.'],
    ],
    learn: ['Create a steadier study rhythm around your day.', 'Decide what to study, revisit and practise next.', 'Make preparation feel more manageable and intentional.'],
    trust: 'This is an independent learning session by Anjion Learning and is not affiliated with or endorsed by Kerala PSC or any government agency.',
  },
};
const ATTRIBUTION = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];

function CampaignBrand() {
  return <a className="brand" href="/" aria-label="Anjion Learning home"><span className="brand-mark">A</span><span>anjion learning</span></a>;
}
function Header({ home = false }) {
  return <header className="site-header container"><CampaignBrand /><nav aria-label="Main navigation"><a className="nav-muted" href={home ? '#sessions' : '/'}>{home ? 'Sessions' : 'All sessions'}</a><a className="button button-small" href={home ? '#sessions' : '#register'}>{home ? 'Choose a session' : 'Get your free pass'} <span aria-hidden="true">↗</span></a></nav></header>;
}
function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><CampaignBrand /><p>© {new Date().getFullYear()} Anjion Learning · THE STRATEGY DROP</p><a href="/privacy">Privacy</a></div></footer>;
}
function HomePage() {
  return <><Header home /><main>
    <section className="home-hero"><div className="container home-grid"><div className="home-copy"><span className="kicker">ANJION LEARNING PRESENTS</span><p className="campaign-label">THE STRATEGY DROP <span className="live-dot" /> FREE LIVE WEBINARS</p><h1>One Session.<br /><em>A clearer</em><br />preparation roadmap.</h1><p className="lede">Your next step towards smarter exam preparation starts here. Choose a focused session and leave with a clearer way to plan the work ahead.</p><a className="button" href="#sessions">EXPLORE FREE SESSIONS <span aria-hidden="true">→</span></a><p className="quiet-note">Free registration · Event dates shared when confirmed</p></div><div className="home-art"><img src="/assets/strategy-study.webp" alt="A student thinking through a study plan by a window" fetchPriority="high"/><div className="image-caption"><span className="mini-star">✳</span><span><strong>Start with direction.</strong><small>Make your next study step count.</small></span></div><span className="art-index">A CLEARER WAY FORWARD · 01</span></div></div></section>
    <section className="section section-white" id="sessions"><div className="container"><div className="section-heading"><div><span className="kicker">PICK YOUR PREPARATION FOCUS</span><h2>Find your session.</h2></div><p>Free online strategy webinars for aspirants ready to make their preparation more intentional.</p></div><div className="session-grid">{Object.entries(EVENTS).map(([slug, event]) => <a className="session-card" key={slug} href={`/${slug}`}><div className="session-photo"><img src={event.image} alt={event.alt} loading="lazy"/><span className="photo-tag">FREE LIVE WEBINAR</span><span className="round-arrow" aria-hidden="true">↗</span></div><div className="session-info"><span className="kicker">THE STRATEGY DROP · {event.short.toUpperCase()}</span><h3>{event.name}</h3><p>{event.detail}</p><span className="text-link">Explore this session <span aria-hidden="true">→</span></span></div></a>)}</div><div className="home-reassure"><span className="reassure-mark">✓</span><p><strong>Free to attend. Focused on your next step.</strong><br />Session details will be shared with registered learners after the event is scheduled.</p></div></div></section>
  </main><Footer /></>;
}

function installPixel() {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId || !/^\d+$/.test(pixelId) || window.fbq) return;
  (function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}
function trackLead(event) {
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: event.id });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'webinar_registration_success', webinar: event.id });
}
function WebinarPage({ event }) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [pass, setPass] = useState(null);
  useEffect(() => {
    for (const key of ATTRIBUTION) {
      const value = new URLSearchParams(window.location.search).get(key);
      if (value) sessionStorage.setItem(`strategy_${key}`, value);
    }
    installPixel();
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [event]);

  async function submitRegistration(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus('submitting'); setMessage('');
    const values = Object.fromEntries(new FormData(form));
    const attribution = Object.fromEntries(ATTRIBUTION.map((key) => [key, sessionStorage.getItem(`strategy_${key}`) || '']));
    try {
      const response = await fetch('/api/registrations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, webinar: event.id, attribution }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We couldn’t save your pass right now. Please try again.');
      setPass(result.registrationId);
      setStatus('success');
      trackLead(event);
      form.reset();
    } catch (err) {
      setMessage(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return <><Header /><main>
    <section className="event-hero"><div className="container event-hero-grid"><div className="event-copy"><div className="eyebrow-row"><span className="campaign-label">THE STRATEGY DROP</span><span className="live-label"><span className="live-dot"/> FREE LIVE WEBINAR</span></div><p className="kicker exam-kicker">{event.eyebrow}</p><h1>{event.title}</h1><p className="event-subtitle">Start preparing with direction.</p><p className="lede">{event.intro}</p><div className="benefit-mini"><span className="mini-star">✳</span><span><strong>One Session. A Clearer Preparation Roadmap.</strong><small>Join free. Get a clearer next step.</small></span></div><a className="button" href="#register">GET YOUR FREE PASS <span aria-hidden="true">→</span></a><p className="quiet-note">Free registration · No event date announced yet</p></div><div className="event-visual"><img src={event.image} alt={event.alt} fetchPriority="high"/><div className="visual-chip">{event.short.toUpperCase()} · PREPARATION STRATEGY</div><div className="visual-bottom"><span>01 / THE STRATEGY DROP</span><strong>Make your next step<br/>a more considered one.</strong></div></div></div></section>
    <section className="section section-white"><div className="container"><div className="section-heading"><div><span className="kicker">THE FREE PASS</span><h2>Your free pass unlocks.</h2></div><p>{event.detail}</p></div><div className="benefit-grid">{event.benefits.map(([number, title, copy]) => <article className="benefit-card reveal" key={number}><span className="benefit-number">{number}</span><div className="benefit-icon" aria-hidden="true">{['↗','▤','◎','?'][Number(number)-1]}</div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="section session-detail"><div className="container detail-grid"><div><span className="kicker">WHAT THIS SESSION IS FOR</span><h2>A calmer way to think about the work ahead.</h2><p className="body-copy">{event.detail} No inflated promises, just a focused opportunity to reflect on your approach and plan your next steps.</p><h3 className="subheading">A good fit if</h3><p className="body-copy">{event.audience}</p><h3 className="subheading">What you can take away</h3><ul className="learn-list">{event.learn.map((item) => <li key={item}>{item}</li>)}</ul></div><aside className="event-card"><span className="kicker">EVENT AT A GLANCE</span><h3>{event.name}</h3><p>A free online webinar by Anjion Learning. Date, time and duration will be shared once confirmed.</p><div className="event-meta"><span>◉ &nbsp;Online session</span><span>✳ &nbsp;Live questions</span><span>◷ &nbsp;Schedule to be announced</span></div><a className="button button-light" href="#register">Reserve a free pass <span aria-hidden="true">→</span></a></aside></div></section>
    <section className="section registration-section" id="register"><div className="container registration-grid"><div className="registration-intro"><span className="kicker">YOUR NEXT STEP</span><h2>Claim your<br/><em>free pass.</em></h2><p className="body-copy">Share the best way to reach you and we’ll send the session information when the event is scheduled.</p><div className="privacy-note"><span aria-hidden="true">◈</span><p><strong>Your details stay private.</strong><br/>We use your information to manage this webinar registration and share its joining details.</p></div><p className="trust-copy">{event.trust}</p></div><div className="form-panel">{status === 'success' ? <div className="pass-confirmation" role="status"><span className="success-icon">✓</span><span className="kicker">REGISTRATION CONFIRMED</span><h2>Your free pass is reserved.</h2><p>Anjion Learning will share the joining details and session reminders with you once the webinar is scheduled.</p><div className="pass-number"><span>YOUR PASS</span><strong>{pass}</strong><small>{event.name}</small></div><a className="text-link" href="/">Explore other sessions <span aria-hidden="true">→</span></a></div> : <form onSubmit={submitRegistration} noValidate><span className="form-kicker">THE STRATEGY DROP</span><h2>CLAIM YOUR FREE PASS</h2><p className="form-event-name">{event.name}</p><div className="form-fields"><label className="field field-full">Full name<input name="fullName" autoComplete="name" required minLength="2" maxLength="100" placeholder="Your name"/></label><label className="field">Mobile number<input name="mobile" type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+()\-\s]{8,24}" required placeholder="Your mobile number"/></label><label className="field">Email <span className="optional">(optional)</span><input name="email" type="email" autoComplete="email" maxLength="254" placeholder="you@example.com"/></label><label className="field field-full">Preparation status<select name="preparationStatus" required defaultValue=""><option value="" disabled>Select your current stage</option><option>Just getting started</option><option>Preparing now</option><option>Revising and practising</option></select></label><label className="field field-full">Webinar preference<select value={event.id} disabled onChange={() => {}}><option value={event.id}>{event.name}</option></select></label></div><input className="honeypot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true"/><label className="consent"><input type="checkbox" name="consent" required/><span>I agree to be contacted by Anjion Learning about this webinar. I can opt out at any time.</span></label>{status === 'error' && <p className="form-error" role="alert">{message}</p>}<button className="button form-button" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'RESERVING YOUR PASS…' : 'RESERVE MY FREE PASS'} <span aria-hidden="true">→</span></button><p className="form-privacy">Your information is only used for this webinar registration.</p></form>}</div></div></section>
  </main><a className="mobile-sticky button" href="#register">GET YOUR FREE PASS <span aria-hidden="true">→</span></a><Footer /></>;
}
function PrivacyPage() {
  return <><Header/><main className="section"><div className="container privacy-page"><span className="kicker">THE STRATEGY DROP</span><h1>Privacy and registration.</h1><p>When you register for a webinar, Anjion Learning collects your name, mobile number, optional email address, preparation stage and selected session. Campaign attribution values may also be saved so the team can understand which campaign brought a registration.</p><h2>How the information is used</h2><p>Registration information is used to manage the webinar and share its joining details and reminders. The site records a registration only after the registration service confirms it has been saved.</p><h2>Storage and access</h2><p>Registration records are stored in the PostgreSQL database connected to the website. Access is limited to the website service and authorised database administrators. The published site does not provide a public registration list.</p><h2>Campaign measurement</h2><p>If a Meta Pixel ID is configured for this deployment, the site sends a Lead event only after a successful registration. No Lead event is sent for an incomplete or failed registration.</p><h2>Questions or deletion requests</h2><p>For questions about a registration or a request to update or delete your details, contact Anjion Learning through its official support channel. Please do not send sensitive identity or financial information.</p><a className="text-link" href="/">Back to sessions <span aria-hidden="true">→</span></a></div></main><Footer/></>;
}
function AdminPage() {
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function download(e) {
    e.preventDefault(); setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/registrations', { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Could not download registrations.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = 'anjion-webinar-registrations.csv'; link.click();
      URL.revokeObjectURL(url);
      setMessage('Registration export downloaded. Store it securely and remove it when no longer needed.');
    } catch (error) { setMessage(error.message || 'Could not download registrations.'); }
    finally { setBusy(false); }
  }
  return <><Header/><main className="section"><div className="container admin-wrap"><span className="kicker">ANJION LEARNING · PRIVATE</span><h1>Registration export.</h1><p>Download saved webinar registrations as a CSV for your approved CRM or campaign workflow.</p><form className="admin-form" onSubmit={download}><label className="field">Admin access token<input type="password" autoComplete="current-password" value={token} onChange={(e) => setToken(e.target.value)} required placeholder="Enter the configured admin token"/></label><button className="button" disabled={busy}>{busy ? 'PREPARING EXPORT…' : 'DOWNLOAD REGISTRATIONS'}</button>{message && <p className="admin-message" role="status">{message}</p>}</form><p className="admin-small">Set <code>ADMIN_API_TOKEN</code> in the Vercel project environment before using this page. The token remains only in page memory while this page is open and is sent over HTTPS to authorize the export.</p></div></main><Footer/></>;
}
export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  useEffect(() => {
    const page = path === '/fci' || path === '/strategy-drop/fci.html' ? EVENTS.fci : path === '/kerala-psc-ldc' || path === '/strategy-drop/kerala-psc-ldc.html' ? EVENTS['kerala-psc-ldc'] : null;
    document.title = page ? `${page.name} — The Strategy Drop | Anjion Learning` : path === '/privacy' ? 'Privacy | Anjion Learning' : path === '/admin' ? 'Registration Export | Anjion Learning' : 'The Strategy Drop — Anjion Learning';
  }, [path]);
  if (path === '/privacy') return <PrivacyPage/>;
  if (path === '/admin') return <AdminPage/>;
  const slug = path === '/strategy-drop/fci.html' ? 'fci' : path === '/strategy-drop/kerala-psc-ldc.html' ? 'kerala-psc-ldc' : path.slice(1);
  const event = EVENTS[slug];
  return event ? <WebinarPage key={event.id} event={event}/> : <HomePage/>;
}
