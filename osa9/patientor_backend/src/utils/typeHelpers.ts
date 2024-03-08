import { HealthCheckRating } from "../types";

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

export const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v).includes(param);
};