'use client'

import { useState } from 'react'
import { Crown, Loader2 } from 'lucide-react'

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.error) {
        setError(data.error)
      } else {
        setError('Could not start checkout. Please try again.')
      }
    } catch {
      setError('Could not start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Starting checkout...
          </>
        ) : (
          <>
            <Crown className="w-5 h-5" /> Subscribe — $50/month
          </>
        )}
      </button>
      {error && (
        <p className="text-red-600 text-xs mt-2 text-center">{error}</p>
      )}
    </div>
  )
}
