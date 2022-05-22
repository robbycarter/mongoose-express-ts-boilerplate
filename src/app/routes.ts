import { json } from 'express';
import errorHandler from "./middlewares/errorHandler";
import { indexRouter } from "./controllers/index.controller";
import { userRouter } from "./controllers/user.controller"

export function initRoutes(app: any) {
  app.use(json());
  app.use('/api/', indexRouter);
  app.use("/api/user", userRouter);
  app.use(errorHandler);
}

