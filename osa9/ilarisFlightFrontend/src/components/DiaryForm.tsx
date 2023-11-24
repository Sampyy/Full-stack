import { useState } from 'react';
import { DiaryEntry, Visibility, Weather } from '../types';
import diaryservice from '../services/diaryservice';

const DiaryForm = ({
    diaries,
    setDiaries,
}: {
    diaries: DiaryEntry[];
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
    const [date, setDate] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('');
    const [weather, setWeather] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const isString = (text: unknown): text is string => {
        return typeof text === 'string';
    };

    const isVisibility = (param: string): param is Visibility => {
        return Object.values(Visibility)
            .map((v) => v.toString())
            .includes(param);
    };

    const parseVisibility = (visibility: unknown): Visibility => {
        if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
            throw new Error('Incorrect or missing visibility: ' + visibility);
        }
        return visibility;
    };

    const isWeather = (param: string): param is Weather => {
        return Object.values(Weather)
            .map((v) => v.toString())
            .includes(param);
    };

    const parseWeather = (weather: unknown): Weather => {
        if (!weather || !isString(weather) || !isWeather(weather)) {
            throw new Error('Incorrect or missing weather: ' + weather);
        }
        return weather;
    };

    const newDiary = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const addedDiary = await diaryservice.addDiaryEntry({
            date,
            visibility: parseVisibility(visibility),
            weather: parseWeather(weather),
            comment,
        });
        console.log(addedDiary);
        setDiaries(diaries.concat(addedDiary));
    };
    return (
        <div>
            <h4>Add a new entry</h4>
            <form onSubmit={(event) => newDiary(event)}>
                <label>Date</label>
                <input
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />
                <br />
                <label>Visibility</label>
                <input
                    value={visibility}
                    onChange={(event) => setVisibility(event.target.value)}
                />
                <br />
                <label>Weather</label>
                <input
                    value={weather}
                    onChange={(event) => setWeather(event.target.value)}
                />
                <br />
                <label>Comment</label>
                <input
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <br />
                <button type="submit">Add entry</button>
            </form>
        </div>
    );
};
export default DiaryForm;
