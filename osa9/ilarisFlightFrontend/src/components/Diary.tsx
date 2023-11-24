import { DiaryEntry } from '../types';

const Diary = ({ diary }: { diary: DiaryEntry }) => {
    return (
        <li key={diary.id}>
            <p style={{ fontWeight: 'bold' }}>{diary.date}</p>
            Visibility: {diary.visibility} <br />
            weather: {diary.weather}
        </li>
    );
};

export default Diary;
