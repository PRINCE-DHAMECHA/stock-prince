import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new UnAuthenticatedError("Provide Valid Values");
  }
  if (password.length <= 5) {
    throw new BadRequestError("Password Must Be at least 6 Characters Long");
  }
  let userAlreadyExists;
  try {
    userAlreadyExists = await User.findOne({ email });
  } catch (e) {
    throw new BadRequestError("Something Went Wrong :(");
  }
  if (userAlreadyExists) {
    throw new UnAuthenticatedError("Email Already Exist");
  }
  try {
    userAlreadyExists = await User.findOne({ name });
  } catch (e) {
    throw new BadRequestError("Something Went Wrong :(");
  }
  if (userAlreadyExists) {
    throw new UnAuthenticatedError("Username Already Taken");
  }
  try {
    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user,
      token,
    });
  } catch (e) {
    throw new BadRequestError("Something Went Wrong :(");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  let user;
  try {
    user = await User.findOne({ email }).select("+password");
  } catch (e) {
    throw new BadRequestError("Something Went Wrong :(");
  }
  if (!user) {
    throw new UnAuthenticatedError("Email Does Not Exist");
  }
  let isPasswordCorrect;
  try {
    isPasswordCorrect = await user.comparePassword(password);
  } catch (e) {
    throw new BadRequestError("Something Went Wrong :(");
  }
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  try {
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token });
  } catch (e) {
    throw new BadRequestError("Something Went Wrong :(");
  }
};

export { register, login };
