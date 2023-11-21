import express from 'express';
import { bmiCalculator } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    var query = _req.query;
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

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
