import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  user: string;
  text: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  user: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", messageSchema);
