import WordleGame from "@/components/wordle-game"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Wordle</h1>
      <WordleGame />
    </div>
  )
}

