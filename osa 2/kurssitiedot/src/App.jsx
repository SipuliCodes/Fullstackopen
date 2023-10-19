const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    props.course.parts.map(part =>
      <div key={part.id}>
        <Part part={part} />
      </div>
    )
  )
}

const Total = (props) => {
  const total = props.course.parts.map(part => part.exercises)
  return (
    <strong>total of {total.reduce((accumulator, currentValue) => accumulator + currentValue)} exercises</strong>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of component",
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


export default App
