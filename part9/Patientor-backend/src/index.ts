import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoseList';
import patientRouter from './routes/patientList';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3005;

app.get('/api/ping', (_req, res) => {
  console.log('Traffic founded on website!');
  res.send('Pong');
});

app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});