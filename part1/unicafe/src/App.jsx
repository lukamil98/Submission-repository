import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${(good / all) * 100} %`

  return all > 0 ? (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Use a function to update the state instead of passing the current state directly
  const increment = (setState) => () => setState((prevState) => prevState + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increment(setGood)} text="good" />
      <Button onClick={increment(setNeutral)} text="neutral" />
      <Button onClick={increment(setBad)} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
