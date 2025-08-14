import { useEffect, useState } from "react";

/** --- Optional: keep the API demo so you can verify the backend --- */
type Health = { status: string; time: string }
type Session = { id: number; title: string; level: string; startsAt: string }

/** --- Simple inline SVG “logo”: rocket + dotted arc + LA-ish block --- */
function EnergizeMark() {
  return (
    <svg
      viewBox="0 0 520 280"
      className="w-full max-w-[520px] drop-shadow-lg"
      aria-hidden
    >
      {/* Louisiana-ish block (stylized) */}
      <path
        d="M40 40 h260 v130 h-60 v30 h60 v40 h-190 v-30 h-70 z"
        className="fill-green-800"
      />
      {/* Dotted arc */}
      <path
        d="M280 60 C 360 40, 440 70, 470 140"
        className="fill-none stroke-yellow-400"
        strokeDasharray="4 10"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Rocket */}
      <g transform="translate(455,120) rotate(25)">
        <path d="M0 0 l30 10 l-10 30 l-30 -10 z" className="fill-yellow-400" />
        <circle cx="8" cy="12" r="4" className="fill-green-900" />
        {/* Flame */}
        <path d="M-12 8 q8 6 0 12 q-8 -6 0 -12z" className="fill-orange-400" />
      </g>
    </svg>
  );
}

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(setHealth).catch(() => {});
    fetch("/api/sessions").then(r => r.json()).then(setSessions).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <div className="bg-green-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-wide">Energize</span>
            <span className="text-yellow-400">⚡</span>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm opacity-90">
            <a className="hover:opacity-100" href="#cohorts">Cohorts</a>
            <a className="hover:opacity-100" href="#sessions">Schedule</a>
            <a className="hover:opacity-100" href="#about">About</a>
          </nav>
          <a
            href="#apply"
            className="rounded-xl bg-yellow-400/95 px-4 py-2 text-sm font-semibold text-green-900 hover:bg-yellow-300 transition"
          >
            Apply
          </a>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-800 to-green-700" />
        <div className="absolute inset-0 opacity-15"
             style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-white">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-widest text-yellow-300 text-sm mb-3">Geaux for launch</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                The <span className="text-yellow-400">Energize</span> Project
              </h1>
              <p className="mt-4 text-white/90 max-w-xl">
                Hands‑on CS upskilling with tracks for different experience levels.
                Fast‑paced sessions, projects, and community support to launch your journey.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#apply"
                  className="rounded-2xl bg-yellow-400 text-green-900 px-5 py-3 font-semibold hover:bg-yellow-300 transition"
                >
                  Apply Now
                </a>
                <a
                  href="#cohorts"
                  className="rounded-2xl border border-white/30 px-5 py-3 font-semibold hover:bg-white/10 transition"
                >
                  Explore Cohorts
                </a>
                <a
                  href="#about"
                  className="rounded-2xl border border-white/30 px-5 py-3 font-semibold hover:bg-white/10 transition"
                >
                  Learn More
                </a>
              </div>

              {/* quick bullets */}
              <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
                <li className="bg-white/10 rounded-xl p-3 backdrop-blur">
                  <div className="font-semibold">Beginner → Advanced</div>
                  <div className="opacity-80">3 tailored tracks</div>
                </li>
                <li className="bg-white/10 rounded-xl p-3 backdrop-blur">
                  <div className="font-semibold">Project‑first</div>
                  <div className="opacity-80">build + demo</div>
                </li>
                <li className="bg-white/10 rounded-xl p-3 backdrop-blur">
                  <div className="font-semibold">Community</div>
                  <div className="opacity-80">mentors & peers</div>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <EnergizeMark />
            </div>
          </div>
        </div>
      </header>

      {/* Cohorts */}
      <section id="cohorts" className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl font-bold mb-6">Cohorts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Cohort A — Starter",
              blurb: "Absolute beginners. Foundations of programming, problem solving, and tooling.",
            },
            {
              title: "Cohort B — Builder",
              blurb: "You’ve coded a bit. Dive into web dev, APIs, and data structures.",
            },
            {
              title: "Cohort C — Launcher",
              blurb: "Comfortable coding. Ship a polished project with demos & teamwork.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-white shadow p-6 border">
              <div className="text-green-800 font-semibold">{c.title}</div>
              <p className="mt-2 text-gray-600">{c.blurb}</p>
              <a href="#apply" className="mt-4 inline-block text-green-800 font-semibold hover:underline">
                Apply for this track →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Keep your API demo so you know the backend is alive */}
      <section id="sessions" className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="text-2xl font-bold mb-4">API Health</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded-xl border">
          {health ? JSON.stringify(health, null, 2) : "Loading..."}
        </pre>

        <h3 className="text-xl font-semibold mt-8 mb-3">Upcoming Sessions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((s) => (
            <div key={s.id} className="p-4 bg-white rounded-xl border shadow-sm">
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-gray-500">{s.level}</div>
              <div className="text-sm">{new Date(s.startsAt).toLocaleString()}</div>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="text-sm text-gray-500">No sessions yet—seed data comes from the API.</div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-green-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="font-semibold">Energize Project — Geaux for Launch</div>
            <div className="text-yellow-300">Built with React • Tailwind • ASP.NET</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
