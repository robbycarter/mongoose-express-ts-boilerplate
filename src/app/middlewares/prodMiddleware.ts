import helmet from 'helmet';
import compression from 'compression';


export const prodMiddleware = (app: any) => {
  app.use(helmet());
  app.use(compression());
}
