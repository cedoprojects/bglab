import type { Metadata } from "next"
import { LandingPage } from "./LandingPage"

export const metadata: Metadata = {
  title: "bglab — Animated CSS Backgrounds",
  description:
    "8 production-ready animated CSS background patterns. Preview them live in a hero prototype with your real content, then copy the React or CSS code.",
}

export default function HomePage() {
  return <LandingPage />
}
