import { NextFunction, Request, Response } from "express"

const errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {


  let response = {
    success: false,
    error: error.name + "-" + error.message
  }

  let status_code: number = 500;

  if (error.name == "ValidationError") {
    status_code = 400;
    response = {
      success: false,
      error: error.message
    }
  }

  if (error.name == "NotFoundError") {
    status_code = 400;
    response = {
      success: false,
      error: error.message
    }
  }

  if (error.name == "AlreadyExistsError") {
    status_code = 400;
    response = {
      success: false,
      error: error.message
    }
  }

  if (error.name == "AuthenticationError") {
    status_code = 401;
    response = {
      success: false,
      error: error.message
    }
  }

  // Upload Error Trace
  return res.status(status_code).send(response)

}

export default errorHandler;