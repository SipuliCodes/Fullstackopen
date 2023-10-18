import { useState } from 'react'

const Display = ({ text, value, isPercentage }) => <div>{text}: {isPercentage ? value + " %" : value}</div>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <div>
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={all} />
      <Display text="average" value={average} />
      <Display text="positive" value={positive} isPercentage={true} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = (good + 1)
    setGood(updatedGood)
    const updatedAll = (updatedGood + neutral + bad)
    setAll(updatedAll)
    setAverage((updatedGood - bad) / updatedAll)
    setPositive(updatedGood/updatedAll*100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = (neutral + 1)
    setNeutral(updatedNeutral)
    const updatedAll = (good + updatedNeutral + bad)
    setAll(updatedAll)
    setPositive(good/updatedAll*100)
  }

  const handleBadClick = () => {
    const updatedBad = (bad + 1)
    setBad(updatedBad)
    const updatedAll = (good + neutral + updatedBad)
    setAll(updatedAll)
    setAverage((good - updatedBad) / updatedAll)
    setPositive(good/updatedAll*100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
