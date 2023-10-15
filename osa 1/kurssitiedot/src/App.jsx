const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.amount}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.name[0]} amount={props.amount[0]} />
      <Part name={props.name[1]} amount={props.amount[1]} />
      <Part name={props.name[2]} amount={props.amount[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.one + props.two + props.three}</p>
    </>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  }
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  }
  const part3 = {
    name: "State of component",
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content name={[part1.name, part2.name, part3.name]} amount={[part1.exercises,part2.exercises, part3.exercises]} />
      <Total one={part1.exercises} two={part2.exercises} three={part3.exercises}/>
    </div>
  )
}

export default App
