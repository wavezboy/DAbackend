import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import userRoute from "./user/route";
import diaryRoute from "./diary/routes";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./utils/validateEnv";
import { requestAuth } from "./utils/auth";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your client's origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Specify the allowed HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Specify the allowed headers
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Enable credentials (cookies, authorization headers, etc.)
  next();
});

app.use(express.json());
// app.use(
//   session({
//     secret: "wavez",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 60 * 60 * 1000,
//     },
//     rolling: true,
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://wavezboy:Abdulfatah16@cluster0.7rxkrhf.mongodb.net/",
//     }),
//   })
// );

app.use(
  session({
    proxy: true,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "none",
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/diary", requestAuth, diaryRoute);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "new Diary app is up and running" });
});

app.use((req, res, next) => {
  res.status(404).json("endpoint not found");
});

export default app;
