
import Joi from "joi";

export const UserSignupValidator = async (input: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      });

      const value = await schema.validateAsync(input, {
        abortEarly: false
      });

      resolve(value)
    } catch (err) {
      reject(err)
    }
  })
}

export const UserSignInValidator = async (input: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      });

      const value = await schema.validateAsync(input, {
        abortEarly: false
      });

      resolve(value)
    } catch (err) {
      reject(err)
    }
  })
}
