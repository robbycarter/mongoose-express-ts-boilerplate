import { Router, Response, NextFunction } from "express";

// Modals
import UserModal from "../models/User";

// Types
import Payload from "Payload";
import { IUser } from "../models/User";
import Request from "Request";

// Utils
import { generateAuthToken, getAuthToken } from "../utils/auth";

// Validators
import { UserSignupValidator, UserSignInValidator } from "../validators/userValidator";



export const userRouter: Router = Router();


// @route   POST api/user/register
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
userRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { email, password } = await UserSignupValidator(req.body)


    let user: IUser = await UserModal.findOne({ email });

    if (user) {
      let e = new Error("User Already Exist");
      e.name = "AlreadyExistsError";
      throw e;
    }

    // Build user object based on IUser
    user = new UserModal({ email });

    user.password = user.hashPassword(password)

    await user.save();

    const payload: Payload = {
      userId: user.id
    };

    const token = await generateAuthToken(payload)
    console.log("token created")
    return res.send(token)
  } catch (err) {
    next(err)
  }

});

// @route   POST api/login
// @desc    Login a user given their email and password, returns the token upon successful login
// @access  Public
userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { email, password } = await UserSignInValidator(req.body)


    let user: IUser = await UserModal.findOne({ email });

    if (!user) {
      let e = new Error("User Account Not Found");
      e.name = "NotFoundError";
      throw e;
    }

    const is_valid = user.comparePassword(password, user.password)

    if (!is_valid) {
      let e = new Error("Incorrect Password");
      e.name = "AuthenticationError";
      throw e;
    }

    const payload: Payload = {
      userId: user.id
    };

    const token = await generateAuthToken(payload)

    return res.send(token)
  } catch (err) {
    next(err)
  }

});


// @route   POST api/user/profile
// @desc    Get a token and return the user profile associated with the token
// @access  Private
userRouter.get("/profile", getAuthToken, async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { userId } = req;

    const user: IUser = await UserModal.findById(userId).select({ password: 0 })

    if (!user) {
      let e = new Error("User Profile Not Found");
      e.name = "NotFoundError";
      throw e
    }



    return res.send({
      success: true,
      results: user
    })

  } catch (err) {
    next(err)
  }
})


// @route   POST api/user/users
// @desc    Get a token and return all users
// @access  Private
userRouter.get("/users", getAuthToken, async (req: Request, res: Response, next: NextFunction) => {
  try {

    const users: IUser[] = await UserModal.find().select({ password: 0 })

    if (users.length == 0) {
      let e = new Error("User Profile Not Found");
      e.name = "NotFoundError";
      throw e
    }

    return res.send({
      success: true,
      results: users
    })

  } catch (err) {
    next(err)
  }
})
