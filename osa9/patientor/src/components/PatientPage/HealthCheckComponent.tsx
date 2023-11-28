import { Container, Typography } from '@mui/material';
import { Diagnosis, HealthCheckEntry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiagnosisComponent from './DiagnosisComponent';

interface Props {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}

const HealthCheckComponent = ({ entry, diagnoses }: Props) => {
    const getHealthIcon = () => {
        switch (entry.healthCheckRating) {
            case 0:
                return <FavoriteIcon style={{ color: 'green' }} />;
            case 1:
                return <FavoriteIcon style={{ color: 'yellow' }} />;
            case 2:
                return <FavoriteIcon style={{ color: 'orange' }} />;
            case 3:
                return <FavoriteIcon style={{ color: 'red' }} />;
        }
    };

    return (
        <Container style={{ border: 'solid' }}>
            <Typography>
                {entry.date}
                <FavoriteIcon />
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
            {getHealthIcon()}
            <Typography>Diagnose by {entry.specialist}</Typography>
        </Container>
    );
};

export default HealthCheckComponent;
