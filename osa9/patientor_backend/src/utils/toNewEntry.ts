import { EntryWithoutId, Diagnosis, Discharge, SickLeave, HealthCheckRating } from "../types";
import { isDate, isString, isHealthCheckRating, isNumber } from "./typeHelpers";


const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
    const newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object)
      };
    if (object.type === 'Hospital' && 'discharge' in object) {

      const newHospitalEntry: EntryWithoutId = {
        ...newEntry,
        type: object.type,
        discharge: parseDischarge(object.discharge)
      };

      return newHospitalEntry;
    }
    if (object.type === 'OccupationalHealthcare' && 'employerName' in object) {

      const newOccupationalEntry: EntryWithoutId = {
        ...newEntry,
        type: object.type,
        employerName: parseEmployerName(object.employerName)
      };

      const sickLeave: SickLeave | undefined = parseSickLeave(object);

      if (sickLeave) {
        return{
          ...newOccupationalEntry,
          sickLeave: sickLeave
        } as EntryWithoutId;
      }

      return newOccupationalEntry;
    }

    if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {

      const newHealthCheckEntry: EntryWithoutId = {
        ...newEntry,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

      return newHealthCheckEntry;
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewEntry;

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorret description');
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date');
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect specialist');
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
    throw new Error('Date or criteria missing or invalid in discharge');
  }
  const date: unknown = object.date;
  const criteria: unknown = object.criteria;
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date in discharge');
  }
  if (!isString(criteria)) {
    throw new Error('Incorrect criteria in discharge');
  }

  return {
    date: date,
    criteria: criteria
  };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect employer name');
  }

  return employerName;
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object || typeof object !== 'object' || !('sickLeave' in object) || typeof object.sickLeave !== 'object') {
    return undefined;
  }


  if (!object.sickLeave || !('startDate' in object.sickLeave) || !('endDate' in object.sickLeave)) {
    return undefined;
  }
  const startDate: unknown = object.sickLeave.startDate;
  const endDate: unknown = object.sickLeave.endDate;

  if (!isString(startDate) || !isDate(startDate)) {
    throw new Error('Incorrect start date');
  }

  if (!isString(endDate) || !isDate(endDate)) {
    throw new Error('Incorrect end date');
  }

  return {
    startDate: startDate,
    endDate: endDate
  };
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect health check rating');
  }

  return healthCheckRating;
};