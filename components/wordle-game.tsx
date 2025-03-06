"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Keyboard } from "@/components/keyboard"
import { GameBoard } from "@/components/game-board"
import { RefreshCw } from "lucide-react"


const ANSWER = "dotsol"
const MAX_ATTEMPTS = 6
const WORD_LENGTH = 6

type GameStatus = "playing" | "won" | "lost"

export default function WordleGame() {
  const router = useRouter()
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_ATTEMPTS).fill(""))
  const [currentGuess, setCurrentGuess] = useState("")
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [message, setMessage] = useState<string | null>(null)

  const checkGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage("Word must be 6 letters long")
      setTimeout(() => setMessage(null), 2000)
      return
    }

    // Update guesses array
    const newGuesses = [...guesses]
    newGuesses[currentAttempt] = currentGuess
    setGuesses(newGuesses)

    // Check if the guess is correct
    if (currentGuess.toLowerCase() === ANSWER) {
      setGameStatus("won")
      setMessage("Congratulations! You won! Redirecting to clue...")

      // Navigate to the clue page after a short delay
      setTimeout(() => {
        router.push("/clue")
      }, 2000)
    } else if (currentAttempt === MAX_ATTEMPTS - 1) {
      setGameStatus("lost")
      setMessage(`Game over! The word was ${ANSWER.toUpperCase()}`)
    } else {
      setCurrentAttempt(currentAttempt + 1)
      setCurrentGuess("")
    }
  }, [currentGuess, currentAttempt, guesses, router])

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return

      if (key === "Enter") {
        checkGuess()
      } else if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1))
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key.toLowerCase())
      }
    },
    [checkGuess, currentGuess, gameStatus],
  )

  const resetGame = () => {
    setGuesses(Array(MAX_ATTEMPTS).fill(""))
    setCurrentGuess("")
    setCurrentAttempt(0)
    setGameStatus("playing")
    setMessage(null)
  }

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e.key)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyPress])

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="w-full p-4 mb-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-center text-blue-800 font-medium">
          Hint: sns 
        </p>
      </div>
      {message && (
        <Alert className="mb-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <GameBoard guesses={guesses} currentGuess={currentGuess} currentAttempt={currentAttempt} answer={ANSWER} />

      <div className="mt-8 w-full">
        <Keyboard onKeyPress={handleKeyPress} guesses={guesses} answer={ANSWER} />
      </div>

      {gameStatus !== "playing" && gameStatus !== "won" && (
        <Button onClick={resetGame} className="mt-6 flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Play Again
        </Button>
      )}
    </div>
  )
}

