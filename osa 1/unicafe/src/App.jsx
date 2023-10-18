import { useState } from 'react'

const StatisticLine = ({ text, value, isPercentage }) => <div>{text} {isPercentage ? value + " %" : value}</div>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive} %</td>
          </tr>
        </tbody>
      </table>
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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
