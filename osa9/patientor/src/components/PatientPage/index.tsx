import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnosis, Entry, Patient } from '../../types';
import { useEffect, useState } from 'react';
import { Male, Female } from '@mui/icons-material';
import { Typography } from '@mui/material';
import EntryComponent from './EntryComponent';
import EntryForm from './EntryForm';
interface Props {
    diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
    const [patient, setPatient] = useState<Patient>();
    const [entries, setEntries] = useState<Entry[]>();
    const findPatient = async (id: string) => {
        const foundPatient = await patientService.getPatient(id);
        setPatient(foundPatient);
    };

    const id = useParams().id;
    useEffect(() => {
        if (typeof id === 'string') {
            findPatient(id);
        }
    }, [id]);

    useEffect(() => {
        if (patient) {
            setEntries(patient.entries);
        }
    }, [patient]);
    if (!id) {
        return <p>Patient not found</p>;
    }

    if (!patient) {
        return <p>loading..</p>;
    }

    const getGenderIcon = () => {
        switch (patient.gender) {
            case 'male':
                return <Male />;
            case 'female':
                return <Female />;
            default:
                return '?';
        }
    };

    let genderIcon = null;
    if (patient) {
        genderIcon = getGenderIcon();
    }
    //finish patient page
    return (
        <>
            <h1>
                {patient.name} {genderIcon}
            </h1>

            <Typography>ssn: {patient.ssn}</Typography>
            <Typography>occupation: {patient.occupation}</Typography>
            <EntryForm
                id={patient.id}
                entries={patient.entries}
                setEntries={setEntries}
                diagnoses={diagnoses}
            />
            <h2>entries</h2>
            {entries &&
                entries.map((entry) => (
                    <EntryComponent
                        key={entry.id}
                        entry={entry}
                        diagnoses={diagnoses}
                    ></EntryComponent>
                ))}
        </>
    );
};

export default PatientPage;
