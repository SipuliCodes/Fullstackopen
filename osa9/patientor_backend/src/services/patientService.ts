import data from "../../data/patients";
import { NewPatient, Patient, NonSensitivePatient, EntryWithoutId, Entry } from "../types";
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

const addEntry = (details: EntryWithoutId, id: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...details
  };

  const patient: Patient | undefined = data.find(p => p.id === id);
  if (patient) {
    patient.entries.push(newEntry);
    data.map(p => p.id === id ? patient : p);
    return newEntry;
  }
  throw new Error('Adding entry failed');
};

export default { getNonSensitivePatient, addPatient, getPatient, addEntry };