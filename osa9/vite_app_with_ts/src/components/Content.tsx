import Part from "./Part";
import { CoursePart } from "../App";

interface ContentTypes {
  courseParts: CoursePart[];
}

const Content = ({courseParts}:ContentTypes) => {
  return (
    <div>
      {courseParts.map(course => <Part key={course.name} part={course} />)}
    </div>
  );
};

export default Content;