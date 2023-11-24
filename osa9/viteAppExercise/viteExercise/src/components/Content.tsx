import { CoursePart } from '../types';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    console.log(courseParts);
    return (
        <div>
            {courseParts.map((part: CoursePart) => {
                return (
                    <p key={part.name}>
                        {part.name} {part.exerciseCount}{' '}
                    </p>
                );
            })}
        </div>
    );
};

export default Content;
