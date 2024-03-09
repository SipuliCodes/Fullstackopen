import { useState } from "react";
import { Alert, Select, MenuItem } from "@mui/material";
import patientService from '../../../services/patients';
import { Diagnosis } from "../../../types";
import { AxiosError } from "axios";

interface Props {
  id: string,
  cancel: (form: string) => void,
  diagnoses: Array<Diagnosis>;
} 

const HealthCheckEntryForm = ({id, cancel, diagnoses}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const createEntry = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await patientService.addEntry({
        description,
        date,
        specialist,
        healthCheckRating: Number(healthCheckRating),
        diagnosisCodes,
        type: 'HealthCheck'
      }, id);
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating('');
      setDiagnosisCodes([]);
    } catch (error: unknown) {
      console.log('error happened');
      let errorMessage = '';
      if (error instanceof AxiosError) {
        errorMessage += error.response?.data;
      }
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form className="entryForm" onSubmit={createEntry}>
        <h4>New HealthCheck entry</h4>
        <fieldset>
          <legend><h5>Description</h5></legend>
          <input value={description} onChange={(event) => setDescription(event.target.value)} />
        </fieldset>
        <fieldset>
          <legend><h5>Date</h5></legend>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
        </fieldset>
        <fieldset>
          <legend><h5>Specialist</h5></legend>
          <input value={specialist} onChange={(event) => setSpecialist(event.target.value)}/>
        </fieldset>
        <fieldset>
          <legend><h5>Healthcheck rating</h5></legend>
          <input value={healthCheckRating} onChange={(event) => setHealthCheckRating(event.target.value)}/>
        </fieldset>
        <fieldset>
          <legend><h5>Diagnosis codes</h5></legend>
          <Select
            labelId="diagnosis codes"
            value={diagnosisCodes}
            multiple
            onChange={(event) => setDiagnosisCodes(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}
          >
            {diagnoses.map(diagnose => <MenuItem key={diagnose.code} value={diagnose.code} >{diagnose.code}</MenuItem>)}
          </Select>
        </fieldset>
        <div className="buttons">
          <button type="button" onClick={() => cancel('')} className="cancel">CANCEL</button> <button type="submit">ADD</button>
        </div>
        </form>
    </div>
  );
};

export default HealthCheckEntryForm;