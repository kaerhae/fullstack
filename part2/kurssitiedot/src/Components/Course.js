import React from 'react'

const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  },
  {
    name: 'Other Half of the Stack application development',
    id: 3,
    parts: [
      {
        name: 'Disconnecting',
        exercises: 3,
        id: 1
      },
      {
        name: 'Hardwares',
        exercises: 1,
        id: 2
      }
    ]
  }

]


const Kurssi = ({ kurssi }) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const taulukko = kurssi.parts.map((item, i) => item.exercises)
  const total = (taulukko.reduce(reducer))

  return (
    <div>
        <h2>{kurssi.name}</h2>
        {
          kurssi.parts.map((item) => <p key={item.id}>{item.name} {item.exercises}</p>)
        }
        <b>Total of {total} exercises</b>
      </div>
  )
}

const Course = () => {
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((kurssi, parts) => 
        <Kurssi key={parts} kurssi={kurssi} />
      )}
    </div>
  )
}


export default Course;