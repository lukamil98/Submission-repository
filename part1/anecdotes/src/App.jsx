import React, { useState } from "react"

const App = () => {
  // An array of anecdotes
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ]

  // Initialize votes for each anecdote to zero
  const initialVotes = new Array(anecdotes.length).fill(0)

  // State variables to track selected anecdote and votes
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

<<<<<<< HEAD
  // Function to display a random anecdote
=======
  //Function to display a random anecdote
>>>>>>> 586ce683a835be98b4d8df6fab24601a82305b89
  const showRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

<<<<<<< HEAD
  // Function to handle voting for the currently selected anecdote
=======
  //Function to handle voting for the currently selected anecdote
>>>>>>> 586ce683a835be98b4d8df6fab24601a82305b89
  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

<<<<<<< HEAD
  // Find the index of the anecdote with the most votes
=======
  //Find the index of the anecdote with the most votes
>>>>>>> 586ce683a835be98b4d8df6fab24601a82305b89
  const maxVotesIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <div>
        <h2>Random Anecdote</h2>
        <p>{anecdotes[selected]}</p>
        <p>Has {votes[selected]} votes</p>
        <button onClick={handleVote}>Vote</button>
        <button onClick={showRandomAnecdote}>Show Another Anecdote</button>
      </div>
      <div>
        <h2>Most Liked Anecdote</h2>
        <p>{anecdotes[maxVotesIndex]}</p>
        <p>Has {votes[maxVotesIndex]} votes</p>
      </div>
    </div>
  )
}

export default App
