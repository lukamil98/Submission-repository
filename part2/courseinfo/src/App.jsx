import React from "react"
import Course from "./Course" // Importing the Course component

const App = () => {
  // Array of courses with their respective data
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <div>
      {/* Render each course dynamically using the Course component */}
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App
