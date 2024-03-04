import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from "@mui/icons-material/Male";

const PatientPage = () => {
  const { id } = useParams < { id?: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    
    if (id) {
      patientService.getPatient(id)
        .then(patient => {
          return setPatient(patient.data);
        });
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2 style={{display: "inline"}}>{patient.name}</h2> {patient.gender === "female" ? <FemaleIcon /> : patient.gender === "male" ? <MaleIcon /> : null }
      <p>ssn: {patient.ssn}
      <br></br>
      occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;