import { Typography } from '@mui/material';
import { Diagnosis } from '../../types';
import { useState, useEffect } from 'react';
interface Props {
    diagnosisCode: string;
    diagnoses: Diagnosis[];
}

const DiagnosisComponent = ({ diagnosisCode, diagnoses }: Props) => {
    const [diagnosisText, setDiagnosisText] = useState<string>('');
    const getDiagnosisText = (diagnosisCode: string) => {
        diagnoses.map((diagnos) => {
            if (diagnos.code === diagnosisCode) {
                setDiagnosisText(diagnos.name);
            }
        });
        return diagnosisText;
    };

    useEffect(() => {
        getDiagnosisText(diagnosisCode);
    }, []);

    return (
        <Typography>
            {diagnosisCode} {diagnosisText}
        </Typography>
    );
};
export default DiagnosisComponent;
