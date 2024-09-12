import { Document, Types } from "mongoose";



interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export { IUser };
