import { redirect } from "next/navigation"

// Home page drops users directly into the playground
// Blueprint Grid is the best first impression — readable, animated, instantly impressive
export default function HomePage() {
  redirect("/patterns/blueprint-grid")
}
