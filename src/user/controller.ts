import { RequestHandler } from "express";
import userModel from "./model";
import { hashData, verifyHashedData } from "../utils/hashedData";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface userBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register: RequestHandler<
  unknown,
  unknown,
  userBody,
  unknown
> = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  if (!email || !firstName || !lastName || !password) {
    console.info("all field is required");
    res.status(500).json("all field is required");
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(500).json("Invalid email entered");
  }

  if (password.length < 8) {
    res.status(500).json("password must be at least 8 characters");
  }

  const existingUser = await userModel.findOne({ email: email });

  if (existingUser) {
    res.status(500).json("user with email already existed");
    throw createHttpError(" user with email already existed");
  }

  const hashedPassword = await hashData(password);

  const user = await userModel.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
  });
  res.status(200).json({ user });
};

interface loginBody {
  email: string;
  password: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  loginBody,
  unknown
> = async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.status(500).json("email and password is required");
  }

  const user = await userModel
    .findOne({ email })
    .select("+password +email")
    .exec();

  if (!user) {
    res.status(500).json("no user with email, register intead");
    throw createHttpError("no user with email, register intead");
  }
  const passwordMatch = await verifyHashedData(password, user.password);

  if (!passwordMatch) {
    res.status(500).json("incorrect password");
    throw createHttpError("incorrect passoword");
  }

  // authentication

  req.session.userId = user._id;

  res.status(200).json({ user });
};

export const getAuthUser: RequestHandler = async (req, res) => {
  const user = await userModel
    .findById(req.session.userId)
    .select("+email")
    .exec();
  if (!user) {
    res.status(500).json("no user is login");
  }
  res.status(200).json(user);
};

export const logOutUser: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
