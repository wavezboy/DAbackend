import { RequestHandler } from "express";
import entryModel from "./model";

interface entryBody {
  title: string;
  body: string;
}

export const createEntry: RequestHandler<
  unknown,
  unknown,
  entryBody,
  unknown
> = async (req, res) => {
  const { body, title } = req.body;
  const authId = req.session.userId;

  if (!(body || title)) {
    res.status(500).json("your entry must have a title and a body");
  }

  const entry = await entryModel.create({
    title: title,
    body: body,
    userId: authId,
  });

  return res.status(200).json({ entry });
};

export const getEntry: RequestHandler = async (req, res) => {
  const {} = req.params;
};
export const getEntries: RequestHandler = async (req, res) => {
  const authId = req.session.userId;
  const entries = await entryModel.find({ userId: authId }).exec();
  if (!entries) {
    return res.status(500).json("no diary entry found");
  }
  return res.status(200).json(entries);
};
export const updateEntry: RequestHandler = async (req, res) => {};
export const deleteEntry: RequestHandler = async (req, res) => {};
