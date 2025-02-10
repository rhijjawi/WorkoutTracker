import { Dashboard } from "@/components/Dashboard"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Fitness Tracker</h1>
      <Dashboard />
    </main>
  )
}

