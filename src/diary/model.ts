import { InferSchemaType, model } from "mongoose";
import { Schema } from "mongoose";

const diarySchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

type diary = InferSchemaType<typeof diarySchema>;

export default model<diary>("diary", diarySchema);
