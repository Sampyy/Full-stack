import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient } from '../../types';
import { useEffect, useState } from 'react';
import { Male, Female } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';

const PatientPage = () => {
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
                return <p>?</p>;
        }
    };

    const genderIcon = getGenderIcon();
    //finish patient page
    return (
        <Container>
            <h1>
                {patient.name} {genderIcon}
            </h1>

            <Typography>ssn: {patient.ssn}</Typography>
            <Typography>occupation: {patient.occupation}</Typography>
        </Container>
    );
};

export default PatientPage;
