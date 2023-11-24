import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';
const getAllDiaryEntries = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

const addDiaryEntry = (diaryEntry: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(baseUrl, diaryEntry)
        .then((response) => response.data);
};

export default {
    getAllDiaryEntries,
    addDiaryEntry,
};
