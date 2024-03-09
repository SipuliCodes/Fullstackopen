import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from "@mui/icons-material/Male";

import './index.css';
import EntryDetails from "./EntryDetails";
import HealthCheckEntryForm from "./EntryForms/HealthCheckEntryForm";
import HospitalForm from "./EntryForms/HospitalForm";
import OccupationalForm from "./EntryForms/OccupationalForm";

const PatientPage = () => {
  const { id } = useParams < { id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [form, setForm] = useState('');

  useEffect(() => {
    diagnoseService.getAll()
      .then(diagnoses => setDiagnoses(diagnoses));

    if (id) {
      patientService.getPatient(id)
        .then(patient => {
          return setPatient(patient.data);
        });
    }
  }, [id]);

  if (!patient || !id || !diagnoses) {
    return null;
  }

  const switchForm = (form: string) => {
    setForm(form);
  };

  return (
    <div>
      <h2 style={{display: "inline"}}>{patient.name}</h2> {patient.gender === "female" ? <FemaleIcon /> : patient.gender === "male" ? <MaleIcon /> : null }
      <p>ssn: {patient.ssn}
      <br></br>
        occupation: {patient.occupation}</p>
      <button onClick={() => switchForm('healthcheck')}>Add Healthcheck entry</button><button onClick={() => switchForm('hospital')}>Add Hospital entry</button><button onClick={() => switchForm('occupational')}>Add Occupational entry</button>
      {form === 'healthcheck' ? <HealthCheckEntryForm id={id} cancel={switchForm} diagnoses={diagnoses} /> : form === 'hospital' ? <HospitalForm id={id} cancel={switchForm} diagnoses={diagnoses} />: form === 'occupational' ? <OccupationalForm id={id} cancel={switchForm} diagnoses={diagnoses}/> : null }
      <h3>entries</h3>
      {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} /> )
      }
    </div>
  );
};

export default PatientPage;