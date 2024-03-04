export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export interface Entry {
}

export interface Patient {
  id: string,
  name: string,
  ssn: string,
  occupation: string,
  dateOfBirth: string,
  gender: Gender,
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;