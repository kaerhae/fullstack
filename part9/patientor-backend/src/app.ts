import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patientRouter';
import diagnoseRouter from './routes/diagnoseRouter';
const app = express();
app.use(express.json());
app.use(cors());
app.get('/api/ping', (_req, res) => {
    console.log("Spotted some traffic here!");
    res.send('Pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);

module.exports = app;