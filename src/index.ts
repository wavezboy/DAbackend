import mongoose from "mongoose";
import app from "./app";
import ip from "ip";
import env from "./utils/validateEnv";

mongoose
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("mongoose connected");
    app.listen(env.PORT, () => {
      console.info(`running on ${ip.address()}:${env.PORT}`);
    });
  })
  .catch(console.error);
