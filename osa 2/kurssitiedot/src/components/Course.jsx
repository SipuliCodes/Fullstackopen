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

const Course = ({ courses }) => {
    return (
        courses.map(course =>
            <div key={course.id}>
                <Header course={course} />
                <Content course={course} />
                <Total course={course} />
            </div>
        )
    )
}

export default Course