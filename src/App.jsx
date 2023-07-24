import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Timer from "./components/Timer"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)

  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("bestTime")) || 9999999999
  );

  React.useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
  };


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameVal = dice.every(die => die.value === dice[0].value)
    if (allHeld && allSameVal) {
      setTenzies(true)
      handleStop()
      if (bestTime > time) {
        setBestTime(time);
        localStorage.setItem("bestTime", JSON.stringify(time));
      }

    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    rolls === 0 && handleStart()
    setRolls(prevRoll => prevRoll + 1)
    setDice(oldDice => oldDice.map(die => {
      if (!die.isHeld) {
        return { ...die, value: Math.ceil(Math.random() * 6) }
      } else {
        return die
      }
    }))
  }

  function holdDice(id) {
    rolls === 0 && handleStart()
    setDice(oldDice => oldDice.map(die => {
      if (die.id === id) {
        return { ...die, isHeld: !die.isHeld }
      } else {
        return die
      }
    }))
  }

  function newGame() {
    setTenzies(false)
    setRolls(0)
    setDice(allNewDice())
    handleReset()
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
      <h3>Rolls: {rolls}</h3>
      <button className="roll-dice" onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      <div>
        <span style={{ minWidth: "180px", marginRight: "20px" }}>
          Current time: <Timer time={time} />
        </span>
        <span style={{ minWidth: "180px" }}>
          Best time: <Timer time={bestTime} />
        </span>
      </div>
    </main >
  )
}