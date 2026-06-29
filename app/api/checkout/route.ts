import { NextResponse } from 'next/server'

/**
 * Creates a Stripe Checkout Session for the AutoDiag Pro plan ($50/month).
 *
 * Setup:
 *   1. Add STRIPE_SECRET_KEY to your .env.local
 *   2. Either set STRIPE_PRICE_ID to a recurring $50/month Price you created
 *      in the Stripe dashboard, OR leave it unset and the route will create
 *      the price inline using price_data.
 *   3. Optionally set NEXT_PUBLIC_BASE_URL (defaults to the request origin).
 */
export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          'Payments are not configured yet. Add STRIPE_SECRET_KEY to your environment to enable checkout.',
      },
      { status: 503 }
    )
  }

  try {
    // Lazy import so the app builds/runs even before `stripe` is installed.
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' })

    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.get('origin') ||
      'http://localhost:3000'

    const priceId = process.env.STRIPE_PRICE_ID

    const lineItems = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              unit_amount: 5000, // $50.00 in cents
              recurring: { interval: 'month' as const },
              product_data: {
                name: 'AutoDiag Pro',
                description:
                  'Unlimited AI car diagnostics, maintenance tracking, repair history, and priority support.',
              },
            },
          },
        ]

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: lineItems,
      success_url: `${origin}/pricing?status=success`,
      cancel_url: `${origin}/pricing?status=cancelled`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
