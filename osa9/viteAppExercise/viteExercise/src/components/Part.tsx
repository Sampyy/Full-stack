import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.kind) {
        case 'basic':
            return (
                <li key={coursePart.name}>
                    <p style={{ fontWeight: 'bold' }}>
                        {coursePart.name} {coursePart.exerciseCount}
                    </p>
                    <p style={{ fontStyle: 'italic' }}>
                        {coursePart.description}
                    </p>
                </li>
            );
        case 'group':
            return (
                <li key={coursePart.name}>
                    <p style={{ fontWeight: 'bold' }}>
                        {coursePart.name} {coursePart.exerciseCount}
                    </p>
                    project exercises {coursePart.groupProjectCount}
                </li>
            );
        case 'background':
            return (
                <li key={coursePart.name}>
                    <p style={{ fontWeight: 'bold' }}>
                        {coursePart.name} {coursePart.exerciseCount}
                    </p>
                    <p style={{ fontStyle: 'italic' }}>
                        {coursePart.description}
                    </p>
                    {coursePart.backgroundMaterial}
                </li>
            );
        case 'special':
            return (
                <li key={coursePart.name}>
                    <p style={{ fontWeight: 'bold' }}>
                        {coursePart.name} {coursePart.exerciseCount}
                    </p>
                    <p style={{ fontStyle: 'italic' }}>
                        {coursePart.description}
                    </p>
                    <p>
                        {coursePart.requirements.reduce(
                            (string: string, skill: string) =>
                                (string += skill + ', '),
                            'Required skills: '
                        )}{' '}
                    </p>
                </li>
            );
        default:
            console.log('never' + coursePart);
            return assertNever(coursePart);
    }
};

export default Part;
