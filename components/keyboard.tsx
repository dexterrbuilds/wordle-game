"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { SkipBackIcon as Backspace } from "lucide-react"

interface KeyboardProps {
  onKeyPress: (key: string) => void
  guesses: string[]
  answer: string
}

export function Keyboard({ onKeyPress, guesses, answer }: KeyboardProps) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ]

  // Calculate the status of each key based on previous guesses
  const keyStatus = useMemo(() => {
    const status: Record<string, "correct" | "present" | "absent" | undefined> = {}

    // Process all guesses to determine key statuses
    guesses.forEach((guess) => {
      if (!guess) return

      // If the entire guess is correct, mark all letters as correct
      if (guess.toLowerCase() === answer) {
        for (let i = 0; i < guess.length; i++) {
          const letter = guess[i].toLowerCase()
          status[letter] = "correct"
        }
        return
      }

      // First mark all absent
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i].toLowerCase()
        if (!status[letter]) {
          status[letter] = "absent"
        }
      }

      // Then mark present
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i].toLowerCase()
        if (answer.includes(letter) && status[letter] !== "correct") {
          status[letter] = "present"
        }
      }

      // Finally mark correct (overrides present)
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i].toLowerCase()
        if (letter === answer[i]) {
          status[letter] = "correct"
        }
      }
    })

    return status
  }, [guesses, answer])

  return (
    <div className="flex flex-col gap-2 w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => {
            const status = keyStatus[key.toLowerCase()]
            let buttonClass = "flex-1 h-12 text-sm font-medium"

            if (key === "Enter" || key === "Backspace") {
              buttonClass += " px-2 min-w-[4rem]"
            } else {
              buttonClass += " min-w-[2rem]"
            }

            return (
              <Button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`
                  ${buttonClass}
                  ${
                    status === "correct"
                      ? "bg-green-500 hover:bg-green-600"
                      : status === "present"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : status === "absent"
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }
                  uppercase
                `}
              >
                {key === "Backspace" ? <Backspace className="h-4 w-4" /> : key}
              </Button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

