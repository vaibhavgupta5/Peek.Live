import mongoose, { Document, Schema, Types } from "mongoose";
import { IEvent } from "./Event";

interface IUser extends Document {
  email: string;
  name: string;
  username: string;
  contact_number: string;
  linkedin: string;
  github: string;
  college: string;
  events_in: string[];
  bio: string;
  description: string;
  stack: string[];
  gender: string;
  resume: string;
  portfolio: string;
  events_created: Types.ObjectId[] | IEvent[];
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  contact_number: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  college: {
    type: String,
    // required: true,
  },
  events_in: {
    type: [String],
    default: [],
  },
  bio: {
    type: String,
  },
  description: {
    type: String,
  },
  stack: {
    type: [String],
  },
  gender: {
    type: String,
  },
  resume: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  events_created: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const UserModel =
  mongoose.models && mongoose.models.User
    ? (mongoose.models.User as mongoose.Model<IUser>)
    : mongoose.model<IUser>("User", UserSchema);

export default UserModel;
