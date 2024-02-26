import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_reg, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.json({
      error: "malformatted parameters"
    });
  }
  const bmi: string = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  console.log("1");
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;
  console.log(dailyExercises);
  console.log(target);

  if (!dailyExercises || !target) {
    return res.status(400).send({
      error: 'parameters missing'
    });
  }

  if (!(Array.isArray(dailyExercises) && !dailyExercises.some(isNotNumber)) || isNotNumber(target)) {
    return res.status(400).send({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExercises(dailyExercises as number[], Number(target));

  return res.send({
    periodLength: result.periodLength,
    trainingDays: result.trainingDays,
    success: result.succees,
    rating: result.rating,
    ratingDescription: result.ratingDescription,
    target: result.target,
    average: result.average
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});