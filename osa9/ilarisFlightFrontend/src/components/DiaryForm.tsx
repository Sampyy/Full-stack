import { useState } from 'react';
import { DiaryEntry, Visibility, Weather } from '../types';
import diaryservice from '../services/diaryservice';
import { AxiosError } from 'axios';
import Notifmessage from './Notifmessage';

const DiaryForm = ({
    diaries,
    setDiaries,
    error,
    setError,
}: {
    diaries: DiaryEntry[];
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
    error: string;
    setError: (error: string) => void;
}) => {
    const [date, setDate] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('great');
    const [weather, setWeather] = useState<string>('sunny');
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
        try {
            const addedDiary = await diaryservice.addDiaryEntry({
                date,
                visibility: parseVisibility(visibility),
                weather: parseWeather(weather),
                comment,
            });
            console.log(addedDiary);
            setDiaries(diaries.concat(addedDiary));
        } catch (error: unknown) {
            let errorMessage = '';
            if (error instanceof AxiosError && error.response) {
                errorMessage += error.response.data;
                console.log(errorMessage);
                setError(errorMessage);
            } else if (error instanceof Error) {
                errorMessage += error;
                console.log(errorMessage);
                setError(errorMessage);
            }
        }
    };
    return (
        <div>
            <h4>Add a new entry</h4>
            <Notifmessage error={error} />
            <form onSubmit={(event) => newDiary(event)}>
                <label>Date</label>
                <input
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    type="date"
                />
                <br />
                <label>Visibility</label>
                <select
                    value={visibility}
                    onChange={(event) => setVisibility(event.target.value)}
                >
                    <option value="great">Great</option>
                    <option value="good">Good</option>
                    <option value="ok">Ok</option>
                    <option value="poor">Poor</option>
                </select>
                <br />
                <label>Weather</label>
                
                <select
                    value={weather}
                    onChange={(event) => setWeather(event.target.value)}
                >
                    <option value="sunny">Sunny</option>
                    <option value="rainy">rainy</option>
                    <option value="cloudy">cloudy</option>
                    <option value="stormy">stormy</option>
                    <option value="windy">windy</option>
                </select>
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
