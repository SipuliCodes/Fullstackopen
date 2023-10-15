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
      <Part name={props.name1} amount={props.amount1} />
      <Part name={props.name2} amount={props.amount2} />
      <Part name={props.name3} amount={props.amount3} />
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
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of component"
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content name1={part1} amount1={exercises1} name2={part2} amount2={exercises2} name3={part3} amount3={exercises3} />
      <Total one={exercises1} two={exercises2} three={exercises3}/>
    </div>
  )
}

export default App
