import express from 'express';
import { calculateBmi } from './bmi-calculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(404)
    .json({ error: 'Parameters missing!' });
  }

  if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: weight,
      height: height,
      bmi: bmi
    });
  } else {
    res.status(400)
    .json({ error: 'malformatted parameters' });
  } 
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body; 
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
   const execs: number[] = body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if(!body.daily_exercises || !body.target) {
    res.status(400).json({ error: "Parameters missing!"});
  }

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!isNaN(body.target) && !execs.some(isNaN)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res
    .json(
      calculateExercises( // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        body.target, // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        body.daily_exercises)// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ); // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  } else {
    res.status(400)
    .json({ error: 'malformatted parameters' });
  } 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});