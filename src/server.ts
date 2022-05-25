import express from "express";
import dotenv, { DotenvConfigOutput } from 'dotenv';
import morgan from 'morgan';


// Setup
import { initRoutes } from "./app/routes"
import connectDB from "./app/middlewares/database";
import { prodMiddleware } from "./app/middlewares/prodMiddleware";

// Load ENV Variables
if (!process.env.NODE_ENV) {
  const { error, parsed }: DotenvConfigOutput = dotenv.config();

  if (error) {
    throw error;
  }
}


/**
 * Create Express instance
 */
const app = express();


/**
 * Initialise app Middleware
 */
prodMiddleware(app);
app.use(morgan('tiny'));



/**
* Initialise app routes
*/
initRoutes(app);

/**
 * Connect to database
 */
connectDB();


// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/**
 * Set render engine and views path
 */
app.set('view engine', 'pug');
app.set('views', "./dist/app/views");

/**
 * Start Express server.
 */
const port = process.env.PORT || 5000
app.listen(port, async () =>
  console.log(`Server started on port ${port}`)
);

export default app;