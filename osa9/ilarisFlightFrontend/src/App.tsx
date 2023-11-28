import { useEffect, useState } from 'react';
import diaryservice from './services/diaryservice';
import { DiaryEntry } from './types';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';

function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [error, setError] = useState<string>('');

    const changeError = (error: string) => {
        setError(error);
        setTimeout(() => {
            setError('');
        }, 5000);
    };

    useEffect(() => {
        diaryservice.getAllDiaryEntries().then((data) => setDiaries(data));
    }, []);

    return (
        <div>
            <DiaryForm
                diaries={diaries}
                setDiaries={setDiaries}
                error={error}
                setError={changeError}
            />

            <Diaries diaries={diaries} />
        </div>
    );
}

export default App;
