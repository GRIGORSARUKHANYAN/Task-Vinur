import { model, Schema, Document } from "mongoose";
import { IUser } from "../interfaces/users.interface";


const userSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "email is required"],
    },
    lastname: {
      type: String,
      required: [true, "email is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      selected: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model<IUser & Document>("User", userSchema);

export default userModel;
