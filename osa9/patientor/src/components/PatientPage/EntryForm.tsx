import {
    Button,
    Container,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import patientService from '../../services/patients';
import {
    Diagnosis,
    Entry,
    HealthCheckRating,
    NewEntry,
    SickLeave,
} from '../../types';
import { AxiosError } from 'axios';
//add others using typeswitch to controll what fields are, FIX ENTRIES NOT SHOWING UP
const EntryForm = ({
    id,
    entries,
    setEntries,
    diagnoses,
}: {
    id: string;
    entries: Entry[];
    setEntries: React.Dispatch<React.SetStateAction<Entry[] | undefined>>;
    diagnoses: Diagnosis[];
}) => {
    const [type, setType] = useState<
        'Hospital' | 'OccupationalHealthcare' | 'HealthCheck'
    >('Hospital');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');

    const [error, setError] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const resetForm = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setDischargeDate('');
        setDischargeCriteria('');
        setDiagnosisCodes(['']);
    };

    /*const parseDiagnosisCodes = () => {
        const splitCodes = diagnosisCodes.split(',');
        return splitCodes.map((code) => code.trim());
    };*/

    const handleSelect = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };
    const createEntry = async (entry: NewEntry) => {
        try {
            const createdEntry = await patientService.createEntry(id, entry);
            console.log(createdEntry);
            const newEntries = entries.concat(createdEntry);
            setEntries(newEntries);
        } catch (error: unknown) {
            let errorMessage = '';
            if (error instanceof AxiosError && error.response) {
                errorMessage += error.response.data;
                console.log(errorMessage);
            } else if (error instanceof Error) {
                errorMessage += error;
                console.log(errorMessage);
            }
            setError(errorMessage);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    const addEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            switch (type) {
                case 'Hospital':
                    const discharge = {
                        date: dischargeDate,
                        criteria: dischargeCriteria,
                    };
                    const newHospitalEntry: NewEntry = {
                        description,
                        date,
                        specialist,
                        discharge,
                        diagnosisCodes,
                        type,
                    };
                    createEntry(newHospitalEntry);
                    break;
                case 'OccupationalHealthcare':
                    const sickLeave: SickLeave = {
                        startDate: sickLeaveStart,
                        endDate: sickLeaveEnd,
                    };
                    const newOccupationalEntry: NewEntry = {
                        description,
                        date,
                        specialist,
                        employerName,
                        sickLeave,
                        diagnosisCodes,
                        type,
                    };
                    createEntry(newOccupationalEntry);
                    break;
                case 'HealthCheck':
                    const healthCheckEntry: HealthCheckRating = Number(
                        healthCheckRating
                    ) as HealthCheckRating;
                    const newHealthCheckEntry: NewEntry = {
                        description,
                        date,
                        specialist,
                        healthCheckRating: healthCheckEntry,
                        diagnosisCodes,
                        type,
                    };
                    createEntry(newHealthCheckEntry);
                    break;
            }
        } catch (error: unknown) {
            let errorMessage = '';
            if (error instanceof AxiosError && error.response) {
                errorMessage += error.response.data;
                console.log(errorMessage);
            } else if (error instanceof Error) {
                errorMessage += error;
                console.log(errorMessage);
            }
            setError(errorMessage);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <Container style={{ border: 'dotted' }}>
            <Button
                style={{ marginTop: 10 }}
                variant="contained"
                onClick={() => setType('Hospital')}
            >
                Hospital
            </Button>
            <Button
                style={{ marginTop: 10 }}
                variant="contained"
                onClick={() => setType('OccupationalHealthcare')}
            >
                Occupational
            </Button>
            <Button
                style={{ marginTop: 10 }}
                variant="contained"
                onClick={() => setType('HealthCheck')}
            >
                HealthCheck
            </Button>
            <h3>New entry</h3>
            {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
            <form onSubmit={(event) => addEntry(event)}>
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Description"
                    fullWidth
                    value={description}
                    variant="standard"
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    label="Date"
                    fullWidth
                    value={date}
                    type="date"
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Specialist"
                    variant="standard"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                {type === 'Hospital' && (
                    <TextField
                        label="Discharge Date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        variant="standard"
                        value={dischargeDate}
                        type="date"
                        onChange={({ target }) =>
                            setDischargeDate(target.value)
                        }
                    />
                )}
                {type === 'Hospital' && (
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Discharge Criteria"
                        variant="standard"
                        fullWidth
                        value={dischargeCriteria}
                        onChange={({ target }) =>
                            setDischargeCriteria(target.value)
                        }
                    />
                )}
                {type === 'OccupationalHealthcare' && (
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        label="Employer name"
                        fullWidth
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                )}
                {type === 'OccupationalHealthcare' && (
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        label="Sickleave start"
                        fullWidth
                        value={sickLeaveStart}
                        type="date"
                        onChange={({ target }) =>
                            setSickLeaveStart(target.value)
                        }
                    />
                )}

                {type === 'OccupationalHealthcare' && (
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        label="Sickleave end"
                        fullWidth
                        type="date"
                        value={sickLeaveEnd}
                        onChange={({ target }) => setSickLeaveEnd(target.value)}
                    />
                )}
                {type === 'HealthCheck' && (
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        label="Healthcheck rating"
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) =>
                            setHealthCheckRating(target.value)
                        }
                    />
                )}
                <InputLabel>Diagnosis Codes</InputLabel>
                <Select
                    label="Diagnosis Codes"
                    multiple
                    variant="standard"
                    value={diagnosisCodes}
                    onChange={handleSelect}
                    placeholder='Diagnosis Codes'
                >
                    {diagnoses.map((diagnosis) => (
                        <MenuItem key={diagnosis.code} value={diagnosis.code}>
                            {diagnosis.code}
                        </MenuItem>
                    ))}
                </Select>

                <Button onClick={() => resetForm()}>Cancel</Button>
                <Button
                    variant="contained"
                    type="submit"
                    style={{ float: 'right' }}
                >
                    Add
                </Button>
            </form>
        </Container>
    );
};

export default EntryForm;
