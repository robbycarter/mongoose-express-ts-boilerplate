import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import request from "Request";
import Payload from "Payload";

export const generateAuthToken = (payload: Payload): Promise<{ token: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION || "30 days"
        },
        (err, token) => {
          if (err) throw err;
          resolve({ token });
        }
      );
    } catch (err) {
      reject(err)
    }
  })
}

export const validateAuthToken = (token: string): Promise<Payload> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload: Payload | any = jwt.verify(token, process.env.JWT_SECRET)

      resolve(payload)
    } catch (err) {
      reject(err)
    }
  })
}

export const getAuthToken = async (req: request, res: Response, next: NextFunction) => {
  try {

    let token = req.headers["authorization"];

    if (token == null || token == undefined) {
      let e = new Error("Missing Authentication");
      e.name = "AuthenticationError";
      throw e;
    };

    if (token.startsWith('Bearer ') == false) {
      let e = new Error("Missing Authentication");
      e.name = "AuthenticationError";
      throw e;
    }

    token = token.slice(7, token.length);

    const payload: Payload = await module.exports.validateAuthToken(token)

    req.userId = payload.userId

    next()

  } catch (err) {
    err.name = "AuthenticationError"
    if (err.message == "invalid signature") err.message = "Invalid Token";
    if (err.message == "jwt expired") err.message = "Token Expired";

    next(err)
  }
}