import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(404).json({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: { daily_exercises: Array<number>, target: number} = req.body;

    if (!daily_exercises || !target || daily_exercises.length === 0) {
        return res.status(404).json({ error: 'parameters missing' });
    }

    if (daily_exercises.some(item => isNaN(item)) || isNaN(target)) {
        return res.status(404).json({ error: 'malformatted parameters' });
    }

    const result = calculateExercises(daily_exercises, target);

    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
