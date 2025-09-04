import { Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response): void => {
  console.error(err.stack);

  if (err.message.includes('not found')) {
    res.status(404).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};
