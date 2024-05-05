import mongoose from "mongoose";
import app from "./app";
import ip from "ip";

mongoose
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .connect("mongodb+srv://wavezboy:Abdulfatah16@cluster0.7rxkrhf.mongodb.net/")
  .then(() => {
    console.log("mongoose connected");
    app.listen(5000, () => {
      console.info(`running on ${ip.address()}:5000`);
    });
  })
  .catch(console.error);
