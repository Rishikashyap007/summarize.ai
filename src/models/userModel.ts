import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
