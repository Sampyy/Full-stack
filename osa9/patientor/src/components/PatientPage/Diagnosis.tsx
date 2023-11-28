import { Entry } from '../../types';
import { Container, Typography } from '@mui/material';
type props = {
    entry: Entry;
};

const Diagnosis = ({ entry }: props) => {
    return (
        <Container>
            <h2>entries</h2>
            <Typography> {entry.description}</Typography>
            <ul>
                {entry.diagnosisCodes?.map((diagnosis) => (
                    <li>{diagnosis}</li>
                ))}
            </ul>
        </Container>
    );
};
export default Diagnosis;
