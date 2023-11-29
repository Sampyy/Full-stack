import { Diagnosis, Entry } from '../../types';
import HospitalComponent from './HospitalComponent';
import OccupationalHealthcareComponent from './OccupationalHealthcareComponent';
import HealthCheckComponent from './HealthCheckComponent';

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}
const assertNever = (value: never): never => {
    throw new Error('Problematic entry component: ' + value);
};

const EntryComponent = ({ entry, diagnoses }: Props) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalComponent entry={entry} diagnoses={diagnoses} />;
        case 'OccupationalHealthcare':
            return (
                <OccupationalHealthcareComponent
                    entry={entry}
                    diagnoses={diagnoses}
                />
            );

        case 'HealthCheck':
            return <HealthCheckComponent entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
};

export default EntryComponent;
