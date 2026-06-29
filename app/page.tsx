import Link from 'next/link'
import { Car, Zap, Shield, Clock, ChevronRight, Wrench, Search, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-1.5 rounded-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AutoDiag</span>
          </div>
          <Link
            href="/diagnose"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Start Diagnosing
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Diagnostics — All Makes &amp; Models
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-balance">
            Diagnose Your Car Problem in{' '}
            <span className="text-blue-400">Seconds</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Describe what's wrong — strange noise, warning light, or poor performance — and get
            step-by-step troubleshooting guidance instantly. No mechanic jargon.
          </p>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/40"
          >
            Diagnose My Car <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-slate-500 text-sm">Free to use · No sign-up required</p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">How It Works</h2>
          <p className="text-center text-slate-500 mb-12">Three steps to pinpoint your car issue</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Car className="w-7 h-7 text-blue-600" />,
                step: '01',
                title: 'Select Your Vehicle',
                desc: 'Pick your car\'s year, make, and model from thousands of options.',
              },
              {
                icon: <Search className="w-7 h-7 text-blue-600" />,
                step: '02',
                title: 'Describe the Problem',
                desc: 'Tell us what\'s happening — a noise, warning light, or how it\'s behaving.',
              },
              {
                icon: <Wrench className="w-7 h-7 text-blue-600" />,
                step: '03',
                title: 'Get Troubleshooting Steps',
                desc: 'Receive a clear, prioritized list of causes and what to check or fix.',
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="absolute -top-3 -right-3 bg-slate-900 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {item.step}
                </div>
                <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Why AutoDiag</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <CheckCircle className="w-5 h-5 text-green-500" />, title: 'All Makes & Models', desc: 'Toyota, Honda, Ford, BMW, Tesla — every major manufacturer covered.' },
              { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: 'Instant Results', desc: 'AI analyzes your problem description and returns answers in under 3 seconds.' },
              { icon: <Shield className="w-5 h-5 text-blue-500" />, title: 'Plain English', desc: 'No mechanic jargon — just clear, actionable steps you can actually follow.' },
              { icon: <Clock className="w-5 h-5 text-purple-500" />, title: 'Save Time & Money', desc: 'Know what\'s wrong before you visit the shop. Avoid unnecessary repairs.' },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <div className="mt-0.5 flex-shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-800">{f.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Car acting up? Let's figure it out.</h2>
          <p className="text-blue-100 mb-8">Describe the problem and get answers right now.</p>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Start Free Diagnosis <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Car className="w-4 h-4 text-blue-500" />
          <span className="text-white font-semibold">AutoDiag</span>
        </div>
        <p>AI-powered car troubleshooting for every driver.</p>
        <p className="mt-1 text-slate-600 text-xs">
          For informational purposes. Always consult a certified mechanic for safety-critical repairs.
        </p>
      </footer>
    </div>
  )
}
