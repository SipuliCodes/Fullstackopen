import data from "../../data/patients";
import { NewPatient, Patient, NonSensitivePatient } from "../types";
import { v1 as uuid } from 'uuid';

const patients: Patient[] = data;

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export default { getNonSensitivePatient, addPatient, getPatient };