import { Container, Typography } from '@mui/material';
import { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DiagnosisComponent from './DiagnosisComponent';

interface Props {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}

const HospitalComponent = ({ entry, diagnoses }: Props) => {
    return (
        <Container style={{ border: 'solid' }}>
            <Typography>
                {entry.date} <LocalHospitalIcon />
            </Typography>
            <Typography style={{ fontStyle: 'italic' }}>
                {entry.description}
            </Typography>

            <Typography>Discharge date: {entry.discharge.date}</Typography>
            <Typography>
                Discharge criteria: {entry.discharge.criteria}
            </Typography>

            {entry.diagnosisCodes?.map((diagnosis) => (
                <DiagnosisComponent
                    key={diagnosis}
                    diagnosisCode={diagnosis}
                    diagnoses={diagnoses}
                />
            ))}
            <Typography>Diagnose by {entry.specialist}</Typography>
        </Container>
    );
};

export default HospitalComponent;
