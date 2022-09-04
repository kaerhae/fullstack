import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils/utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatient());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  if(patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatient = utils.validateNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const newEntry = utils.validateNewEntry(req.body);  
  const patient = patientService.findById(String(req.params.id));

  try  {
    if(!patient) {
      res.status(404).send("No patient found");
    } else {
      const addedEntry = patientService.addEntry(patient.id, newEntry);
      res.json(addedEntry);
    }
  } catch(error:unknown){
    let errorMessage = 'Something is not right';
    if(error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send({ 'error':errorMessage});
  }
})

export default router;