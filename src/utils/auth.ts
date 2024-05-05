import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requestAuth: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(500).json("user not authenticated");
  }
};
