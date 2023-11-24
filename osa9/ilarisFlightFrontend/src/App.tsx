import { useEffect, useState } from 'react';
import diaryservice from './services/diaryservice';
import { DiaryEntry } from './types';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';

function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        diaryservice.getAllDiaryEntries().then((data) => setDiaries(data));
    }, []);

    return (
        <div>
            <DiaryForm diaries={diaries} setDiaries={setDiaries} />

            <Diaries diaries={diaries} />
        </div>
    );
}

export default App;
