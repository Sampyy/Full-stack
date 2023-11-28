import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    console.log(courseParts);
    return (
        <ul>
            {courseParts.map((part) => (
                <Part coursePart={part} />
            ))}
        </ul>
    );
};

export default Content;
