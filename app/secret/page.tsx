"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Key } from "lucide-react"

// The morse code mapping as provided
const morseCodeMap = {
  A: ".-..",
  B: "..-.",
  C: "...",
  D: "-.-",
  E: "-..",
  F: "-",
  G: ".--",
  H: "-...",
  I: ".--.",
  J: "..-",
  K: ".-",
  L: "..",
  M: "....",
  N: "--.",
  O: ".-..",
  P: "-..-",
  Q: "-.--",
  R: "-.-.",
  S: "-..",
  T: "..-",
  U: "---",
  V: ".-",
  W: ".-..",
  X: "-.--",
  Y: "--..",
  Z: ".-..",
  "0": "-----",
  "1": "----.",
  "2": "---..",
  "3": "--...",
  "4": "-....",
  "5": ".....",
  "6": "....-",
  "7": "...--",
  "8": "..---",
  "9": ".----",
}

// Target words at specific positions
const targetWords = ["GRIT", "FLIGHT", "POET", "REUNION"]
const additionalWords = ["SHADOW", "WHISPER", "PUZZLE", "ENIGMA", "CIPHER", "MYSTERY", "RIDDLE", "SECRET"]

// Create the array with target words at positions 1, 4, 8, and 11 (0-indexed: 0, 3, 7, 10)
const allWords = Array(12).fill("")
allWords[0] = targetWords[0] // GRIT at position 1
allWords[3] = targetWords[1] // FLIGHT at position 4
allWords[7] = targetWords[2] // POET at position 8
allWords[10] = targetWords[3] // REUNION at position 11

// Fill in the remaining positions with additional words
let additionalWordIndex = 0
for (let i = 0; i < allWords.length; i++) {
  if (!allWords[i]) {
    allWords[i] = additionalWords[additionalWordIndex]
    additionalWordIndex++
  }
}

// Important positions
const keyPositions = [1, 4, 8, 11]

// Encode a word to morse code
const encodeToMorse = (word: string) => {
  return word
    .split("")
    .map((char) => {
      const upperChar = char.toUpperCase()
      return morseCodeMap[upperChar] || char
    })
    .join(" ")
}

// Encode a number to morse code - handle multi-digit numbers
const encodeNumberToMorse = (num: number) => {
  // Convert number to string and encode each digit separately
  return num
    .toString()
    .split("")
    .map((digit) => morseCodeMap[digit])
    .join(" ")
}

export default function SecretPage() {
  const [answer, setAnswer] = useState("")
  const [isRiddleVisible, setIsRiddleVisible] = useState(false)
  const [isKeyVisible, setIsKeyVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // The correct answer to the riddle
  const correctAnswer = "they surrender"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      answer.toLowerCase().includes("surrender") ||
      answer.toLowerCase().includes("they surrender") ||
      answer.toLowerCase().includes("they both surrender")
    ) {
      setIsKeyVisible(true)
      setErrorMessage("")
    } else {
      setErrorMessage("That's not quite right. Try again.")
      setTimeout(() => setErrorMessage(""), 3000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">The Secret Page</h1>

        <div className="mb-8">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">The first whisper’s count sets the rhythm—sum the pulse. Seven emerge, but only four fit the sage’s 12-word tale. Choose wisely.</h3>
            <div className="grid grid-cols-4 gap-4">
              {keyPositions.map((pos) => (
                <div key={pos} className="flex flex-col items-center">
                  <span className="font-mono text-sm">{encodeNumberToMorse(pos)}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Decode These Messages</h2>

          <div className="space-y-4 mb-6">
            {allWords.map((word, index) => (
              <div key={index} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">#{index + 1}</span>
                </div>
                <p className="font-mono break-all">{encodeToMorse(word)}</p>
              </div>
            ))}
          </div>


          {!isRiddleVisible && (
            <div className="mt-6 text-center">
              <Button onClick={() => setIsRiddleVisible(true)} className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Show Key
              </Button>
            </div>
          )}
        </div>

        {isRiddleVisible && !isKeyVisible && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Solve the Riddle to Reveal the Key
            </h2>
            <p className="text-lg mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center italic">
              "What happens when the immovable object meets the irresistible force?"
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full"
              />

              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

              <Button type="submit" className="w-full">
                Submit Answer
              </Button>
            </form>
          </div>
        )}

        {isKeyVisible && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">The Morse Code Key</h2>
            <div className="grid grid-cols-5 gap-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              {Object.entries(morseCodeMap).map(([char, code]) => (
                <div key={char} className="flex items-center gap-2">
                  <span className="font-bold">{char}</span>
                  <span className="font-mono">{code}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium">
                Congratulations! You can now decode the messages above.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
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

