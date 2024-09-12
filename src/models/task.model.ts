import { model, Schema, Document } from "mongoose";
import { ITask } from "../interfaces/tasks.interface";
import { TaskStatus } from "../constants";

const taskSchema: Schema = new Schema(
  {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    dueDate: {
      type: Date,
    },

    priority: {
      type: Number,
    },

    assignedMember: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      default:TaskStatus.toDo,
      enum: [
        TaskStatus.toDo,
        TaskStatus.inProgress,
        TaskStatus.inReview,
        TaskStatus.done,
      ],
    },

    inProgresDate: {
      type: Date,
    },
    inDoneDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const taskModel = model<ITask & Document>("tasks", taskSchema);
export default taskModel;
