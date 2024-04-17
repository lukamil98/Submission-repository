import React from "react"

const Header = ({ courseName }) => <h2>{courseName}</h2>

const Total = ({ parts }) => {
  // Using reduce to sum up the exercises
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total of {totalExercises} exercises</p>
}

// Part component renders an individual part of a course
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

// Content component renders the list of parts for a course
const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

// Course component renders the structure of a course including its name, parts, and total exercises
const Course = ({ course }) => (
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
