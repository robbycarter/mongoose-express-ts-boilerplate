import { Request, Response, Router } from 'express';

export const indexRouter = Router();

/**
 * GET /
 * Home page.
 */
indexRouter.get('/', (req: Request, res: Response) => {
  res.render('index', {
    title: 'index',
    message: 'hello world'
  });
});

indexRouter.all('*', (req: Request, res: Response) => {
  res.render('index', {
    title: 'index',
    message: 'hello world'
  });
});
