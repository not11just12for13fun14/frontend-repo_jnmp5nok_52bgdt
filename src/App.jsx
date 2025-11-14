import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-white/60 border-b border-white/30">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-white font-bold">F</span>
          <span className="text-xl font-semibold tracking-tight">Flames Agency</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          <a href="#services" className="hover:text-gray-900">Services</a>
          <a href="#work" className="hover:text-gray-900">Work</a>
          <a href="#process" className="hover:text-gray-900">Process</a>
          <a href="#faq" className="hover:text-gray-900">FAQ</a>
        </nav>
        <a href="#book" className="hidden md:inline-flex px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition-colors">Book a call</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/90" />
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Available for new projects this month
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Revenue-focused marketing, content, design, and AI automations
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-gray-700">
              We build full-funnel systems that attract ideal customers and convert attention into pipeline.
              Paid growth, SEO, LinkedIn personal branding & ghostwriting, design sprints, and automation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#book" className="pointer-events-auto inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-black transition-colors">Get a free growth plan</a>
              <a href="#services" className="pointer-events-auto inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-gray-900 ring-1 ring-gray-200 hover:ring-gray-300">Explore services</a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-fuchsia-500" />Performance-first</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-500" />ICP-aligned content</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" />Design that converts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/services`)
        const data = await res.json()
        setServices(data)
      } catch (e) {
        setServices([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [baseUrl])

  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">What we do</h2>
          <p className="mt-3 text-lg text-gray-700">Proven programs designed to move the metrics that matter.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-white ring-1 ring-gray-200 p-6 animate-pulse" />
            ))
          ) : (
            services.map((s) => (
              <div key={s.slug} className="group rounded-2xl bg-white ring-1 ring-gray-200 p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">{s.slug.replace('-', ' ')}</span>
                </div>
                <p className="mt-2 text-gray-700">{s.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a href="#book" className="mt-6 inline-flex text-sm font-medium text-gray-900 underline underline-offset-4">{s.cta}</a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Selected outcomes</h2>
          <p className="mt-3 text-lg text-gray-700">A snapshot of results our frameworks consistently produce.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { stat: '4.2x', label: 'ROAS in 90 days (paid)' },
            { stat: '+180%', label: 'Organic traffic in 6 months (SEO)' },
            { stat: '3–5x', label: 'Profile views & inbound (LinkedIn)' },
            { stat: '-62%', label: 'Time-to-ship with AI automations' },
            { stat: '48h', label: 'Avg. design sprint turnaround' },
            { stat: '+35%', label: 'CVR uplift after CRO sprints' },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-white ring-1 ring-gray-200 p-8">
              <div className="text-4xl font-bold tracking-tight bg-gradient-to-br from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">{item.stat}</div>
              <div className="mt-2 text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">How we work</h2>
          <p className="mt-3 text-lg text-gray-700">Simple, transparent, outcome-driven.</p>
        </div>
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Audit', desc: 'We analyze traffic, funnel, content, and ops to identify 90-day wins.' },
            { title: 'Plan', desc: 'We design a sprint roadmap with clear owners, KPIs, and deadlines.' },
            { title: 'Execute', desc: 'We ship ads, content, design, and automations in weekly cycles.' },
            { title: 'Optimize', desc: 'We review, learn, and compound what converts. Rinse and repeat.' },
          ].map((step, idx) => (
            <li key={idx} className="relative rounded-2xl bg-white ring-1 ring-gray-200 p-6">
              <span className="absolute -top-3 left-6 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white text-xs">{idx + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-1 text-gray-700 text-sm">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function LeadForm() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'website' })
      })
      if (!res.ok) throw new Error('Failed to submit. Please try again.')
      setStatus('success')
      setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return (
    <section id="book" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Get your free growth plan</h2>
            <p className="mt-3 text-lg text-gray-700">Tell us about your goals. We’ll review your current funnel and send back a tailored 90-day plan.</p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-500"/>Actionable audit with quick wins</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500"/>Clear KPIs and roadmap</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500"/>No fluff. No obligation.</li>
            </ul>
          </div>
          <form onSubmit={submit} className="rounded-2xl bg-white ring-1 ring-gray-200 p-6 shadow-sm">
            {status === 'success' && (
              <div className="mb-4 rounded-lg bg-emerald-50 text-emerald-700 px-4 py-3">Thanks! We’ll be in touch shortly.</div>
            )}
            {status === 'error' && (
              <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-3">{error}</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input required value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input required type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="jane@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input value={form.company} onChange={(e)=>setForm(f=>({...f,company:e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="Acme Inc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Service</label>
                <select value={form.service} onChange={(e)=>setForm(f=>({...f,service:e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900">
                  <option value="">Select...</option>
                  <option value="ads">Paid Marketing (Ads)</option>
                  <option value="seo">SEO</option>
                  <option value="linkedin">LinkedIn Branding</option>
                  <option value="ghostwriting">Ghostwriting</option>
                  <option value="design">Graphic & Brand Design</option>
                  <option value="ai">AI Automations</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Budget</label>
                <select value={form.budget} onChange={(e)=>setForm(f=>({...f,budget:e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900">
                  <option value="">Select a range</option>
                  <option value="$2k–$5k">$2k–$5k / mo</option>
                  <option value="$5k–$10k">$5k–$10k / mo</option>
                  <option value="$10k+">$10k+ / mo</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea rows={4} value={form.message} onChange={(e)=>setForm(f=>({...f,message:e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="Goals, timelines, links…" />
              </div>
            </div>
            <button disabled={status==='loading'} type="submit" className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-black transition-colors disabled:opacity-60">
              {status === 'loading' ? 'Submitting…' : 'Request my plan'}
            </button>
            <p className="mt-3 text-xs text-gray-500 text-center">We’ll reply within 1 business day.</p>
          </form>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: 'What industries do you specialize in?', a: 'B2B SaaS, professional services, and tech-enabled companies. That said, our frameworks are adaptable.' },
    { q: 'How quickly can we start?', a: 'We can typically kick off within 1–2 weeks after the initial audit and plan.' },
    { q: 'Do you offer project-based or monthly?', a: 'Both. Most clients start with a 90-day sprint, then continue monthly on what performs.' },
    { q: 'Can you work with our in-house team?', a: 'Absolutely. We slot into your stack and collaborate with marketing, sales, and product.' },
  ]
  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">FAQs</h2>
          <p className="mt-3 text-lg text-gray-700">If it helps you decide faster, we want it here.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl bg-white ring-1 ring-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">{f.q}</h3>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} Flames Agency. All rights reserved.</div>
        <div className="text-sm text-gray-600">Built with love, design, and a lot of iteration.</div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
