import User from "../models/user.model.js";
import bcryptjs from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashsedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashsedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("name");
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not found !"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials !"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_CODE);
    const { password: hashedPassword, ...rest } = validUser._doc; //the _doc used to take only the needed details of the user
    const expiryDate = new Date(Date.now() + 3600000); //1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
