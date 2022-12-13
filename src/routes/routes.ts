import express, { Request, Response } from 'express';
import { MOVIES } from '../mocks/movies';
import { Movie } from '../Models/Movie';

const router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  const filter = {};
  const all = await Movie.find(filter);
  res.setHeader('Content-Type', 'application/json');

  if (all.length > 0) {
    return res.json({method: req.method, movies: all});
  } else {
    return res.json({method: req.method, movies: []});
  }
});

router.post('/populate/:decision', async (req: Request, res: Response, next) => {
  try {
    const action = req.params.decision;
    res.setHeader('Content-Type', 'application/json');

    if (action === 'yes') {
      MOVIES.forEach(async movie => {
        const schema = new Movie(movie);
        await schema.save();
      })
      return res.json({method: req.method, message: 'All movies have been inserted...'});
    } else {
      return res.json({method: req.method, message: `Action unknown: ${action}`});
    }
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      res.sendStatus(404);
      return;
    }
    next(error);    
  }
});

router.get('/findMovie/:name', async (req: Request, res: Response, next) => {
  const name = req.params.name;
  res.setHeader('Content-Type', 'application/json');
  console.log(name);
  try {
    const movie = await Movie.find({title: name});

    if (!movie) {
      res.json({method: req.method, message: 'All movies have been inserted...'});
    }
    res.json({method: req.method, movie});
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      res.sendStatus(404);
      return;
    }
    next(error);
  }
});

router.post('/add/:name', (req: Request, res: Response) => {
  const name = req.params.name;
  res.setHeader('Content-Type', 'application/json');
  return res.json({method: req.method, message: `Adding pokemon: ${name}`});
});

router.delete('/:id', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  return res.json({method: req.method, message: `Delete movie: ${req.params.id}`});
});

export { router as moviesRouter }