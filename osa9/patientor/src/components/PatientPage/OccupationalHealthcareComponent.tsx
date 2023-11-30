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
            {entry.sickLeave?.startDate && (
                <Typography>
                    Sickleave start date: {entry.sickLeave.startDate}
                </Typography>
            )}

            {entry.sickLeave?.endDate && (
                <Typography>
                    <Typography>
                        Sickleave end date: {entry.sickLeave.endDate}
                    </Typography>
                </Typography>
            )}
            {entry.diagnosisCodes?.map((diagnosis) => (
                <ul>
                    <DiagnosisComponent
                        key={diagnosis}
                        diagnosisCode={diagnosis}
                        diagnoses={diagnoses}
                    />
                </ul>
            ))}
            <Typography>Diagnose by {entry.specialist}</Typography>
        </Container>
    );
};

export default OccupationalHealthcareComponent;
