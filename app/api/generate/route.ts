import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { checkRateLimit } from "@/lib/rateLimit"
import { PATTERN_SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ai/prompts"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

function extractCode(raw: string): string {
  // Strip markdown fences if model adds them despite instructions
  return raw
    .replace(/^```(?:tsx?|jsx?|javascript|typescript)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim()
}

function validateCode(code: string): boolean {
  return (
    code.includes("use client") &&
    code.includes("GeneratedPattern") &&
    code.includes("absolute inset-0") &&
    code.includes("@keyframes")
  )
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  const { allowed, reason } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json({ error: reason }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const description = body?.description?.trim()

  if (!description || description.length < 3) {
    return NextResponse.json({ error: "Please describe the pattern you want." }, { status: 400 })
  }

  if (description.length > 300) {
    return NextResponse.json({ error: "Description too long (max 300 characters)." }, { status: 400 })
  }

  try {
    // Generate 3 variations in parallel
    const [r1, r2, r3] = await Promise.all([
      client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: PATTERN_SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(description) }],
      }),
      client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: PATTERN_SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(description) }],
      }),
      client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: PATTERN_SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(description) }],
      }),
    ])

    const results = [r1, r2, r3].map((r) => {
      const raw = r.content[0].type === "text" ? r.content[0].text : ""
      return extractCode(raw)
    })

    const valid = results.filter(validateCode)

    if (valid.length === 0) {
      return NextResponse.json({ error: "Generation failed. Please try rephrasing your description." }, { status: 500 })
    }

    return NextResponse.json({ variations: valid })
  } catch (err) {
    console.error("Generation error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
