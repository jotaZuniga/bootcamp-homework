import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', [], (req: Request, res: Response) => {
  return res.send('/GET');
});

router.post('/api', (req: Request, res: Response) => {
  return res.send('/POST');
});

export { router as moviesRouter }