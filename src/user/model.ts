import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

type user = InferSchemaType<typeof userSchema>;

export default model<user>("user", userSchema);
