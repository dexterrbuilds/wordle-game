"use client"

import { useMemo } from "react"

interface GameBoardProps {
  guesses: string[]
  currentGuess: string
  currentAttempt: number
  answer: string
}

export function GameBoard({ guesses, currentGuess, currentAttempt, answer }: GameBoardProps) {
  // Create a display array that includes the current guess
  const displayGuesses = useMemo(() => {
    const result = [...guesses]
    if (currentAttempt < result.length) {
      result[currentAttempt] = currentGuess.padEnd(answer.length, " ")
    }
    return result
  }, [guesses, currentGuess, currentAttempt, answer.length])

  // Get the status of each letter (correct, present, or absent)
  const getLetterStatus = (letter: string, position: number, guess: string) => {
    if (letter === " ") return "empty"

    // If the entire guess is correct, mark all letters as correct
    if (guess.toLowerCase() === answer) return "correct"

    // Otherwise check individual letters
    if (letter.toLowerCase() === answer[position]) return "correct"
    if (answer.includes(letter.toLowerCase())) return "present"
    return "absent"
  }

  return (
    <div className="grid grid-rows-6 gap-2 w-full">
      {displayGuesses.map((guess, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-6 gap-2">
          {Array.from({ length: answer.length }).map((_, colIndex) => {
            const letter = guess[colIndex] || " "
            const status =
              rowIndex < currentAttempt
                ? getLetterStatus(letter, colIndex, guess)
                : rowIndex === currentAttempt && letter !== " "
                  ? "tbd"
                  : "empty"

            return (
              <div
                key={colIndex}
                className={`
                  flex items-center justify-center w-full aspect-square text-2xl font-bold border-2 
                  ${
                    status === "empty"
                      ? "border-gray-300 dark:border-gray-700"
                      : status === "tbd"
                        ? "border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
                        : status === "correct"
                          ? "border-green-500 bg-green-500 text-white"
                          : status === "present"
                            ? "border-yellow-500 bg-yellow-500 text-white"
                            : "border-gray-500 bg-gray-500 text-white"
                  }
                  transition-colors uppercase
                `}
              >
                {letter !== " " ? letter : ""}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

