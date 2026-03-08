import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"

// Inter is the industry standard for SaaS UIs — Linear, GitHub, Notion, Stripe all use it.
// Geist is fine but Inter has better optical sizing and is more recognizable to developers.
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "bglab — Animated CSS Backgrounds",
  description: "Pick from 8 animated CSS background patterns, preview them live in a real hero section with your content, then copy the React or CSS code. Free, no account.",
  keywords: ["animated backgrounds", "css patterns", "react backgrounds", "hero section", "tailwind patterns"],
  openGraph: {
    title: "bglab — Animated CSS Backgrounds",
    description: "Pick a pattern, type your real content, copy the code. Hero backgrounds done right.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
