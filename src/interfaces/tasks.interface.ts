import { Document, Types } from "mongoose";
import { TaskStatus } from "../constants";

interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  priority: number;
  assignedMember: Types.ObjectId;
  status: TaskStatus.toDo|TaskStatus.inProgress|TaskStatus.inReview|TaskStatus.done;
  inProgresDate:Date;
  inDoneDate:Date;

}
export { ITask };
