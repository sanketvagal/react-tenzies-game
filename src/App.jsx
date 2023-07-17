import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameVal = dice.every(die => die.value === dice[0].value)
    if (allHeld && allSameVal) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      if (!die.isHeld) {
        return { ...die, value: Math.ceil(Math.random() * 6) }
      } else {
        return die
      }
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      if (die.id === id) {
        return { ...die, isHeld: !die.isHeld }
      } else {
        return die
      }
    }))
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}