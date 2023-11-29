import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnosis, Patient } from '../../types';
import { useEffect, useState } from 'react';
import { Male, Female } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import EntryComponent from './EntryComponent';
interface Props {
    diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
    const [patient, setPatient] = useState<Patient>();
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
            <h2>entries</h2>
            {patient.entries &&
                patient.entries.map((entry) => (
                    <EntryComponent
                        key={entry.id}
                        entry={entry}
                        diagnoses={diagnoses}
                    ></EntryComponent>
                ))}
            <Button variant="contained">Add New Entry</Button>
        </>
    );
};

export default PatientPage;
