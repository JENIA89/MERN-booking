import express from 'express';

const router = express.Router();

router.get('/register', (req, res)=> {
  res.send('Hello, this is register endpoint')
})

export default router;