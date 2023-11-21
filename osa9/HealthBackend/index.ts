import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const query = req.query;
    if (!isNaN(Number(query.height)) && !isNaN(Number(query.weight))) {
        res.send({
            height: query.height,
            weight: query.weight,
            bmi: bmiCalculator(Number(query.height), Number(query.weight)),
        });
    } else {
        res.send({ error: 'malformatted parameters' });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment @typescript-eslint/no-unsafe-member-access
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        res.send({ error: 'parameters missing' });
        return;
    }
    
    try {
        daily_exercises.map((value: number) => {
            if (isNaN(Number(value))) {
                res.send({ error: 'malformatted parameters' });
            }
        });
    } catch (error: unknown) {
        res.send({error:'malformatted parameters'})
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(calculateExercises(target, daily_exercises));
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
