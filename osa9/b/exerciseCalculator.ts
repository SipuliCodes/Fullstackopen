import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  succees: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exerciseHours: number[],
  target: number
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exerciseHours: number[] = [];
  if (isNotNumber(args[2])) {
    throw new Error('Provided values were not numbers!');
  }

  const target = Number(args[2]);

  for (let i: number = 3; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error('Provided values were not numbers!');
    }
    exerciseHours.push(Number(args[i]));
  }

  return {
    exerciseHours: exerciseHours,
    target: target
  };
};

export const calculateExercises = (exerciseHours: number[], target: number): Result => {
  const days: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(time => time != 0).length;
  const average: number = exerciseHours.reduce((a, c) => a + c, 0) / days;
  const success: boolean = average >= target;
  const rating: number = average < target * 0.75 ? 1 : average > target * 1.25 ? 3 : 2;
  const ratingDesciption: string = rating === 1 ? "bad, not even close to target" : rating === 2 ? "not too bad but could be better" : "Excellent, a lot better than target";
  return {
    periodLength: days,
    trainingDays: trainingDays,
    succees: success,
    rating: rating,
    ratingDescription: ratingDesciption,
    target: target,
    average: average,
  };
};

if (require.main === module) {
  try {
    const { exerciseHours, target } = parseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}