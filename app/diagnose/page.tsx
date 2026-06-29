'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Car, ChevronRight, Wrench, AlertTriangle, CheckCircle, Clock, DollarSign, ArrowLeft, Loader2, Send } from 'lucide-react'
import { VEHICLE_MAKES, YEARS, getModelsForMake } from '@/lib/vehicles'
import type { DiagnosticResult } from '@/lib/diagnostics'

type Step = 'vehicle' | 'problem' | 'result'

const URGENCY_CONFIG = {
  low:      { label: 'Low Priority',  color: 'bg-green-100 text-green-800 border-green-200',  icon: '🟢' },
  medium:   { label: 'Moderate',      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '🟡' },
  high:     { label: 'High Priority', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '🟠' },
  critical: { label: 'Critical',      color: 'bg-red-100 text-red-800 border-red-200',          icon: '🔴' },
}

const EXAMPLE_PROBLEMS = [
  'My check engine light came on yesterday',
  'Strange grinding noise when I brake',
  'Car won\'t start in the morning',
  'A/C blows warm air',
  'Engine is overheating',
  'Shaking at highway speeds',
]

export default function DiagnosePage() {
  const [step, setStep] = useState<Step>('vehicle')
  const [year, setYear]   = useState('')
  const [make, setMake]   = useState('')
  const [model, setModel] = useState('')
  const [problem, setProblem] = useState('')
  const [result, setResult]   = useState<DiagnosticResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  const models = getModelsForMake(make)

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  const canProceedVehicle = year && make && model
  const canSubmit = problem.trim().length > 10

  async function handleDiagnose() {
    if (!canSubmit) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, make, model, problem }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data: DiagnosticResult = await res.json()
      setResult(data)
      setStep('result')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep('vehicle')
    setResult(null)
    setError('')
    setProblem('')
  }

  const urgency = result ? URGENCY_CONFIG[result.urgencyLevel] : null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-blue-500 p-1.5 rounded-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AutoDiag</span>
          </Link>
          {step !== 'vehicle' && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Start Over
            </button>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {(['vehicle', 'problem', 'result'] as Step[]).map((s, i) => {
            const labels = ['Vehicle', 'Problem', 'Results']
            const isActive    = step === s
            const isCompleted = ['vehicle', 'problem', 'result'].indexOf(step) > i
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 flex-1 ${i > 0 ? 'pl-2' : ''}`}>
                  {i > 0 && <div className={`h-0.5 flex-1 ${isCompleted || isActive ? 'bg-blue-500' : 'bg-slate-200'}`} />}
                  <div className={`flex items-center gap-1.5 ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-400'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      isCompleted ? 'bg-green-100 border-green-500 text-green-700' :
                      isActive    ? 'bg-blue-100 border-blue-500 text-blue-700' :
                                    'bg-white border-slate-200 text-slate-400'
                    }`}>
                      {isCompleted ? '✓' : i + 1}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block ${isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-slate-400'}`}>
                      {labels[i]}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Step 1: Vehicle Selection */}
        {step === 'vehicle' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 p-2.5 rounded-xl">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Select Your Vehicle</h1>
                <p className="text-slate-500 text-sm">All makes and models supported</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={String(y)}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Make</label>
                <select
                  value={make}
                  onChange={(e) => { setMake(e.target.value); setModel('') }}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Make</option>
                  {VEHICLE_MAKES.map((m) => (
                    <option key={m.name} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Model</option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {canProceedVehicle && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-blue-700 font-medium">{year} {make} {model}</span>
              </div>
            )}

            <button
              onClick={() => setStep('problem')}
              disabled={!canProceedVehicle}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Problem Description */}
        {step === 'problem' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <Wrench className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Describe the Problem</h1>
                <p className="text-slate-500 text-sm">{year} {make} {model}</p>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-5">
              Describe what's happening in your own words. The more detail you provide, the more accurate the diagnosis.
            </p>

            {/* Example prompts */}
            <div className="mb-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Common issues — click to use</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROBLEMS.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setProblem(ex)}
                    className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-3 py-1.5 rounded-full transition-colors border border-slate-200 hover:border-blue-200"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="E.g. My car makes a grinding noise when I brake, especially at highway speeds. It started about a week ago and seems to be getting worse..."
              rows={5}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-2"
            />
            <p className="text-xs text-slate-400 mb-5">{problem.length} characters — more detail = better results</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              onClick={handleDiagnose}
              disabled={!canSubmit || loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing your {make}...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Get Diagnosis
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 'result' && result && (
          <div ref={resultRef} className="space-y-4">
            {/* Header card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-800 mb-1">Diagnostic Results</h1>
                  <p className="text-slate-500 text-sm">{year} {make} {model}</p>
                </div>
                {urgency && (
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${urgency.color} flex-shrink-0`}>
                    {urgency.icon} {urgency.label}
                  </span>
                )}
              </div>
              <p className="text-slate-700 leading-relaxed">{result.summary}</p>
            </div>

            {/* Possible Causes */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Possible Causes
              </h2>
              <ul className="space-y-2">
                {result.possibleCauses.map((cause, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-orange-400 font-bold mt-0.5">{i + 1}.</span>
                    {cause}
                  </li>
                ))}
              </ul>
            </div>

            {/* Troubleshooting Steps */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-500" />
                Troubleshooting Steps
              </h2>
              <div className="space-y-3">
                {result.steps.map((step, i) => {
                  const u = URGENCY_CONFIG[step.urgency]
                  return (
                    <div key={i} className="border border-slate-100 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 text-blue-700 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </div>
                          <h3 className="font-medium text-slate-800 text-sm">{step.title}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${u.color}`}>
                            {u.icon} {u.label}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                            step.diy
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {step.diy ? '🔧 DIY' : '🔑 Shop'}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed pl-8">{step.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Cost & Shop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <h2 className="font-semibold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Estimated Costs
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{result.estimatedCost}</p>
              </div>
              <div className={`rounded-2xl shadow-sm border p-5 ${
                result.shouldSeeShop
                  ? 'bg-orange-50 border-orange-100'
                  : 'bg-green-50 border-green-100'
              }`}>
                <h2 className={`font-semibold mb-2 flex items-center gap-2 text-sm ${
                  result.shouldSeeShop ? 'text-orange-800' : 'text-green-800'
                }`}>
                  <Clock className="w-4 h-4" />
                  Shop Visit?
                </h2>
                <p className={`text-sm ${result.shouldSeeShop ? 'text-orange-700' : 'text-green-700'}`}>
                  {result.shouldSeeShop
                    ? 'Yes — a professional inspection is recommended for this issue.'
                    : 'Not necessarily — many of these steps can be done at home.'}
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-800 text-slate-300 rounded-2xl p-4 text-xs leading-relaxed">
              <span className="font-semibold text-white">⚠️ Safety Note: </span>
              {result.disclaimer}
              {' '}AutoDiag provides informational guidance only. Always consult a certified mechanic for safety-critical repairs.
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep('problem')}
                className="flex-1 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium py-3 px-4 rounded-xl transition-colors text-sm"
              >
                Edit Problem
              </button>
              <button
                onClick={reset}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-xl transition-colors text-sm"
              >
                New Diagnosis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
