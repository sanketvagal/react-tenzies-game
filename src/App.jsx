import React from "react"
import Die from "./Die"

/**
 * Challenge:
 * 
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `allNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
 */

export default function App() {
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice
  }

  return (
    <main>
      <div className="dice-container">
        <Die value="1" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
        <Die value="5" />
        <Die value="6" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
      </div>
    </main>
  )
}