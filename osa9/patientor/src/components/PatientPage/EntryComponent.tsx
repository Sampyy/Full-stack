import { Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types';
import DiagnosisComponent from './DiagnosisComponent';

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const EntryComponent = ({ entry, diagnoses }: Props) => {
    return (
        <Typography>
            {entry.description}
            <ul>
                {entry.diagnosisCodes?.map((diagnosis) => (
                    <DiagnosisComponent
                        diagnosisCode={diagnosis}
                        diagnoses={diagnoses}
                    />
                ))}
            </ul>
        </Typography>
    );
};

export default EntryComponent;
