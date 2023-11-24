import Diary from './Diary';
import { DiaryEntry } from '../types';

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
    return (
        <ul>
            {diaries.map((diary) => (
                <Diary diary={diary} />
            ))}
        </ul>
    );
};

export default Diaries;
