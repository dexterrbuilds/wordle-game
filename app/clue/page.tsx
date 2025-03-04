import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CluePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">You've Found The Clue!</h1>

        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-6 mb-6">
          <p className="text-amber-800 dark:text-amber-200 text-lg font-medium mb-4">The next challenge awaits at:</p>
          <div className="bg-amber-100 dark:bg-amber-800/30 p-4 rounded font-mono text-center">
            <code className="text-amber-900 dark:text-amber-100 break-all">
              https://medium.com/@dexterrbuilds/solana-name-service-order-in-the-storm-3e0e42969deb
            </code>
          </div>
          <p className="mt-4 text-amber-700 dark:text-amber-300 italic">
            "Look for the pattern that repeats but never quite the same. The key is in what changes."
          </p>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Game
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

