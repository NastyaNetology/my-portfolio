import React, { useEffect, useState } from "react";

export default function PortfolioOnePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("about");

  // keyed nav so we can track the active item
  const nav = [
    { key: "about",      label: "My information",      href: "#about" },
    { key: "experience", label: "Current experience",  href: "#experience" },
    { key: "desired",    label: "Desired experience",  href: "#desired" },
    { key: "discovery",  label: "Discovery question",  href: "#discovery" },
    { key: "contact",    label: "Contact",             href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });

    // highlight active tab based on the section in view
    const sections = nav.map(n => document.getElementById(n.key));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.2, 0.6, 1] }
    );
    sections.forEach(sec => sec && obs.observe(sec));

    return () => {
      window.removeEventListener("scroll", onScroll);
      sections.forEach(sec => sec && obs.unobserve(sec));
      obs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <style>{`
        :root{
          --title-blue:#1d2f50;
          --muted:#e3cfc7;
          --icon-rose:#8a5856;
          --tab-active:#d8b2a8;   /* rose active tab */
          --tab-text:#334155;
          --tab-border:#e5e7eb;
          --card:#f3f4f6;
          --ring: rgba(14,165,233,.35);
          --container: 980px;
        }
        .wrap{ max-width:var(--container); margin:0 auto; padding:0 20px; }
        .card{ background:var(--card); border-radius:16px; border:1px solid #e5e7eb; }
        .btn{ display:inline-flex; align-items:center; gap:8px; padding:10px 16px; border-radius:12px; font-weight:700; background:#0ea5e9; color:#fff; }
        .btn:hover{ background:#0284c7; }
        .link{ color:#0ea5e9; font-weight:700; }

        html { scroll-behavior: smooth; } /* nicer anchor scrolling */
      `}</style>

      {/* Profile */}
      <section id="profile" className="pt-7 pb-3">
        <div className="wrap">
          <div className="flex items-start gap-7">
            <img
              src="/assets/headshots/anastasia.jpg"
              alt="Anastasia Kalacheva"
              className="h-[140px] w-[140px] rounded-full object-cover ring-1 ring-[#E5E7EB] bg-[#e5e5e5]"
            />
            <div className="flex-1">
              <h1
                className="leading-tight"
                style={{ fontFamily: "Poppins, ui-sans-serif, system-ui", fontSize: 36, fontWeight: 800, color: "var(--title-blue)" }}
              >
                Anastasia Kalacheva
              </h1>
              <div
                className="leading-6"
                style={{ fontFamily: "Poppins, ui-sans-serif, system-ui", fontSize: 18, color: "#334155" }}
              >
                kalacheva.anastasiya@gmail.com
              </div>
              <div
                className="leading-6"
                style={{ fontFamily: "Poppins, ui-sans-serif, system-ui", fontSize: 20, color: "var(--muted)" }}
              >
                Bussines & Data Analyst | SQL | Python | Power BI | Tableau | Excel | Pandas | NumPy | Data Visualization
              </div>

              {/* LinkedIn + divider + phone (like your example) */}
              <div className="mt-2 flex items-center gap-4 text-[16px] font-semibold">
                <a
                  href="https://www.linkedin.com/in/kalacheva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex items-center"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--icon-rose)" }} aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.06c.53-1 1.84-2.2 3.8-2.2 4.06 0 4.8 2.67 4.8 6.15V24h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.84-2.72 3.76V24h-4V8z"/>
                  </svg>
                </a>
                <span className="inline-block h-6 w-px bg-[#cbb7b3]"></span>
                <div className="flex items-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--icon-rose)" }} aria-hidden="true">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>+49 (333) 257-07-96</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky navbar with active state */}
      <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur border-b ${stuck ? "shadow-[0_1px_0_rgba(0,0,0,0.04)]" : ""}`}>
        <div className="wrap relative">
          <button
            className="md:hidden absolute right-0 top-1.5 inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav
            className="flex flex-wrap gap-2 py-2 pr-12 text-[14px] font-semibold"
            style={{ borderColor: "var(--tab-border)" }}
          >
            {nav.map(n => (
              <a
                key={n.key}
                href={n.href}
                className={`px-4 py-2 rounded-xl ${active === n.key ? "text-white" : "hover:bg-slate-50"}`}
                style={active === n.key ? { background: "var(--tab-active)" } : { color: "var(--tab-text)" }}
                onClick={() => setActive(n.key)}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* My information */}
      <section id="about" className="scroll-mt-[80px] py-6">
        <div className="wrap">
          <h2 className="text-[24px] font-bold mb-4" style={{ color: "var(--icon-rose)" }}>My information</h2>
          <div className="card p-6">
            <p className="text-[16px] leading-7">
              I hold a Bachelor's degree in Applied Computer Science and a Master's in Software Engineering from Germany. I have over five years of experience as a Business Analyst and team leader, with strong analytical and problem-solving skills. I am passionate about AI and Machine Learning tools, challenge myself to explore different approaches to enhance business operations and support smart decision-making.
            </p>
          </div>
        </div>
      </section>

      {/* Current experience */}
      <section id="experience" className="scroll-mt-[80px] py-6">
        <div className="wrap">
          <h2 className="text-[24px] font-bold mb-4" style={{ color: "var(--icon-rose)" }}>Current experience</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <article key={i} className="card p-6">
                <h3 className="text-[18px] font-bold mb-2">Business Analyst | Amazon | 2022–2025</h3>
                <ul className="list-disc pl-5 space-y-2 text-[16px]">
                  <li>Stakeholder alignment for web tools and analytics.</li>
                  <li>Designed metrics/dashboards; improved reporting throughput.</li>
                  <li>Automated workflows; reduced manual effort.</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Desired experience */}
      <section id="desired" className="scroll-mt-[80px] py-6">
        <div className="wrap">
          <h2 className="text-[24px] font-bold mb-4" style={{ color: "var(--icon-rose)" }}>Desired experience</h2>
          <div className="grid grid-cols-1 gap-6">
            {[1, 2].map(i => (
              <article key={i} className="card p-6">
                <h3 className="text-[18px] font-bold mb-2">Business Analyst | Amazon | 2022–2025</h3>
                <ul className="list-disc pl-5 space-y-2 text-[16px]">
                  <li>Stakeholder alignment for web tools and analytics.</li>
                  <li>Designed metrics/dashboards; improved reporting throughput.</li>
                  <li>Automated workflows; reduced manual effort.</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery question */}
      <section id="discovery" className="scroll-mt-[80px] py-6">
        <div className="wrap">
          <h2 className="text-[24px] font-bold mb-4" style={{ color: "var(--icon-rose)" }}>Discovery question</h2>
          <article className="card p-6">
            <p className="text-[16px] mb-4">
              What data or reporting challenge can I help you solve next? I'm happy to discuss KPI design, ETL optimization, and dashboard storytelling tailored to your team.
            </p>
            <a
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border text-[16px] font-bold"
              style={{ borderColor: "var(--icon-rose)", color: "var(--icon-rose)" }}
              href="https://www.youtube.com/@rangusaisriraj"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit my youtube channel
            </a>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-[80px] py-6">
        <div className="wrap">
          <h2 className="text-[24px] font-bold mb-4" style={{ color: "var(--icon-rose)" }}>Contact</h2>
          <article className="card p-6">
            <div className="space-y-2 text-[16px]">
              <div><strong>Phone: </strong><span>+49 (313) 257-0796</span></div>
              <div><strong>Email: </strong><span>kalacheva.anastasiya@gmail.com</span></div>
              <div className="flex gap-6 flex-wrap">
                <a className="link" style={{ color: "var(--icon-rose)" }} href="https://github.com/NastyaNetology" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="link" style={{ color: "var(--icon-rose)" }} href="https://www.linkedin.com/in/kalacheva/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className="border-t">
        <div className="wrap py-6 text-[14px] text-[#475569]">© 2025 Калачева Anastasia | Business Analyst </div>
      </footer>
    </div>
  );
}

