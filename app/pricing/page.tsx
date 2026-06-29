import Link from 'next/link'
import { Car, Check, Zap, Crown, ChevronRight, ArrowLeft } from 'lucide-react'
import CheckoutButton from '@/components/CheckoutButton'

const FREE_FEATURES = [
  'Basic diagnostics for all makes & models',
  'Step-by-step troubleshooting',
  'Urgency ratings & cost estimates',
  '3 diagnoses per day',
]

const PRO_FEATURES = [
  'Everything in Free, plus:',
  'Unlimited AI-powered diagnoses',
  'Advanced OBD-II code explanations',
  'Vehicle maintenance schedule tracker',
  'Repair history log & reminders',
  'Priority response (faster AI)',
  'Save & export diagnostic reports (PDF)',
  'Early access to the mobile app',
  'Email support',
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-blue-500 p-1.5 rounded-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AutoDiag</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
            <Crown className="w-4 h-4" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
            Upgrade to <span className="text-blue-400">AutoDiag Pro</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Unlimited AI diagnostics, maintenance tracking, and more — for less than a single shop visit.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 px-4 -mt-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free plan */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-bold text-slate-800">Free</h2>
            </div>
            <p className="text-slate-500 text-sm mb-6">Great for occasional checks</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-slate-800">$0</span>
              <span className="text-slate-500">/month</span>
            </div>
            <Link
              href="/diagnose"
              className="block text-center w-full border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-3 px-6 rounded-xl transition-colors mb-6"
            >
              Get Started Free
            </Link>
            <ul className="space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro plan */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-500 p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800">Pro</h2>
            </div>
            <p className="text-slate-500 text-sm mb-6">For drivers who want it all</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-slate-800">$50</span>
              <span className="text-slate-500">/month</span>
            </div>
            <CheckoutButton />
            <ul className="space-y-3 mt-6">
              {PRO_FEATURES.map((f, i) => (
                <li key={f} className={`flex items-start gap-2 text-sm ${i === 0 ? 'font-semibold text-slate-700' : 'text-slate-600'}`}>
                  {i !== 0 && <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
                  <span className={i === 0 ? 'pl-0' : ''}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Guarantee */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Cancel anytime · Secure checkout powered by Stripe
        </p>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes — cancel with one click from your account. You keep Pro access until the end of your billing period.' },
              { q: 'What payment methods do you accept?', a: 'All major credit and debit cards via Stripe\'s secure checkout. Your card details never touch our servers.' },
              { q: 'Is there a free trial?', a: 'The Free plan lets you try core diagnostics with no time limit. Upgrade to Pro whenever you need unlimited access.' },
              { q: 'Does Pro work on mobile?', a: 'Yes — the web app is fully mobile-responsive, and Pro members get early access to the native iOS & Android apps.' },
            ].map((item) => (
              <div key={item.q} className="border border-slate-100 rounded-xl p-5">
                <h3 className="font-semibold text-slate-800 mb-1">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Car className="w-4 h-4 text-blue-500" />
          <span className="text-white font-semibold">AutoDiag</span>
        </div>
        <p>AI-powered car troubleshooting for every driver.</p>
      </footer>
    </div>
  )
}
