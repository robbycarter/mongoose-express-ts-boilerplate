import { Document, Model, model, Schema } from "mongoose";
import { compareSync, genSaltSync, hashSync } from "bcryptjs"

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param password:string
 */
export interface IUser extends Document {
  email: string;
  password: string;
  date: string
  comparePassword: (password: string, hash: string) => boolean
  hashPassword: (password: string) => string
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    default: new Date().getTime()
  }
});

userSchema.methods.hashPassword = (password: string) => {
  return hashSync(password, genSaltSync(10))
}

userSchema.methods.comparePassword = (password: string, hash: string) => {
  return compareSync(password, hash)
}

const UserModal = model<IUser>("User", userSchema);

export default UserModal;