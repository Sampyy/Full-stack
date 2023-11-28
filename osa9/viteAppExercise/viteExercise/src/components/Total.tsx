import { CoursePart } from '../types';

const totalExercises = (courseParts: CoursePart[]) => {
    return courseParts.reduce(
        (sum: number, part: CoursePart) => (sum += part.exerciseCount),
        0
    );
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return <p>Number of exercises: {totalExercises(courseParts)}</p>;
};

export default Total;
