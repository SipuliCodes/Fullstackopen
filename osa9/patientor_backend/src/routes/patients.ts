import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatient());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
  
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage: string = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (patient) {
    return res.send(patient);
  }

  return res.status(404).end();
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addEntry(newEntry, req.params.id);

    res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage: string = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

export default router;