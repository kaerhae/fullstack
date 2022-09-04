import express from 'express';
import diagnoseService from '../services/diagnoseService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.post('/', (req, res) => {
  const { code, name, latin } = req.body;
  const newPatient = diagnoseService.addEntry({
      code,
      name,
      latin
  });
  res.json(newPatient);
});

export default router;