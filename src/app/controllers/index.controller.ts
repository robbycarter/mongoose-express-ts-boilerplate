import { Request, Response, Router } from 'express';

export const indexRouter = Router();

/**
 * GET /
 * Home page.
 */
indexRouter.get('/', (req: Request, res: Response) => {
  res.send("Hello World")
});

