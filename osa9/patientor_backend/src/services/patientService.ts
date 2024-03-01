import data from "../../data/patients";
import { NewPatient, Patient, PatientWithoutSsn } from "../types";
import { v1 as uuid } from 'uuid';

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (details: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...details
  };

  data.push(newPatient);
  return newPatient;
};

export default { getPatientsWithoutSsn, addPatient };