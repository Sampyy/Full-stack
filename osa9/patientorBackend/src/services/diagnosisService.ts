import { Diagnosis } from '../types';

import diagnoses from '../../data/diagnosesData';

const getAllDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getAllDiagnoses,
};
