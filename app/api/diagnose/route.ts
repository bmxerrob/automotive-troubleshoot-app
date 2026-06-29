import { NextRequest, NextResponse } from 'next/server'
import { getDiagnosticResult } from '@/lib/diagnostics'

export async function POST(req: NextRequest) {
  try {
    const { make, model, year, problem } = await req.json()

    if (!problem?.trim()) {
      return NextResponse.json({ error: 'Problem description is required' }, { status: 400 })
    }

    // Use OpenAI if available, otherwise fall back to built-in engine
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are an expert automotive technician with 20+ years of experience. 
                A user is describing a problem with their ${year} ${make} ${model}. 
                Respond with a JSON object that has these exact fields:
                - summary: string (1-2 sentence overview of likely issue)
                - possibleCauses: string[] (4-7 likely causes, most probable first)
                - steps: array of { title: string, description: string, urgency: "low"|"medium"|"high"|"critical", diy: boolean }
                - estimatedCost: string (cost ranges for likely repairs)
                - shouldSeeShop: boolean
                - urgencyLevel: "low"|"medium"|"high"|"critical"
                - disclaimer: string (one safety note)
                Be specific to this vehicle make and model where relevant. Use plain English.`,
              },
              {
                role: 'user',
                content: `My ${year} ${make} ${model} has this problem: ${problem}`,
              },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.3,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const result = JSON.parse(data.choices[0].message.content)
          return NextResponse.json(result)
        }
      } catch {
        // Fall through to built-in engine
      }
    }

    // Built-in smart diagnostic engine
    const result = getDiagnosticResult(problem, make, model, year)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Failed to process diagnostic request' }, { status: 500 })
  }
}
