import { Container, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import DiagnosisComponent from './DiagnosisComponent';

const OccupationalHealthcareComponent = ({
    entry,
    diagnoses,
}: {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}) => {
    return (
        <Container style={{ border: 'solid' }}>
            <Typography>
                {entry.date}
                <WorkIcon /> {entry.employerName}
            </Typography>
            <Typography style={{ fontStyle: 'italic' }}>
                {entry.description}
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

export default OccupationalHealthcareComponent;
