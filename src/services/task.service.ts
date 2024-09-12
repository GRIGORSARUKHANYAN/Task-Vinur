import HttpException from "../exceptions/HttpException";
import { ITask } from "../interfaces/tasks.interface";
import TaskDocument from "../models/task.model";
import { isEmpty } from "../utils/util";
import { ObjectId } from "mongodb";
import { CreateTaskDto } from "../dtos/taskDto/create-task-dto";
import { UpdateTaskDto } from "../dtos/taskDto/update-task-dto";
import { TaskStatus } from "../constants";
import { ReportTaskDto } from "../dtos/taskDto/report-task-dto copy";

class TaskService {
  public tasks = TaskDocument;
  public async createTask(taskData: CreateTaskDto): Promise<ITask> {
    if (isEmpty(taskData)) {
      throw new HttpException(400, "TaskData is empty");
    }
    
    taskData.dueDate=new Date(taskData.dueDate)
    const createTaskData: ITask = await this.tasks.create(taskData);
    return createTaskData;
  }

  public async findTaskById(taskId: string): Promise<ITask> {
    if (!ObjectId.isValid(taskId)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    const findTask: ITask | null = await this.tasks.findOne({
      _id: taskId,
    });
    if (!findTask) {
      throw new HttpException(409, "Task not found");
    }

    return findTask;
  }

  public async findTaskByAssignedMemberId(userId: string): Promise<ITask[]> {
    if (!ObjectId.isValid(userId)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    const findTask: ITask[] | null = await this.tasks.find({
      assignedMember: userId,
    });
    if (!findTask) {
      throw new HttpException(409, "Task not found");
    }

    return findTask;
  }

  public async updateTask(
    taskId: string,
    taskData: UpdateTaskDto
  ): Promise<ITask> {
    if (isEmpty(taskData)) {
      throw new HttpException(400, "TaskData is empty");
    }
    if (!ObjectId.isValid(taskId)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    const findTaskById: ITask | null = await this.tasks.findById({
      _id: taskId,
    });

    if (!findTaskById) {
      throw new HttpException(409, "Task doesn't exist");
    }
    if (taskData.status==TaskStatus.inProgress) {
      findTaskById.set({inProgresDate:new Date()})
    }else if (taskData.status== TaskStatus.done) {
      findTaskById.set({inDoneDate:new Date()})
    }
    console.log(findTaskById);
    
    findTaskById?.set(taskData);
    await this.tasks.findOneAndUpdate({ _id: taskId }, findTaskById);
    return findTaskById;
  }

  public async deleteTask(taskId: string): Promise<ITask> {
    if (isEmpty(taskId) || !ObjectId.isValid(taskId)) {
      throw new HttpException(400, "TaskId is invalid");
    }
    const deleteTaskById: ITask | null = await this.tasks.findByIdAndDelete(
      taskId
    );
    if (!deleteTaskById) throw new HttpException(409, "Task doesn't exist");
    return deleteTaskById;
  }


  public async findReportById(taskId: string): Promise<ITask> {
    if (!ObjectId.isValid(taskId)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    const findTask: ITask | null = await this.tasks.findOne({
      _id: taskId,
    });
    if (!findTask) {
      throw new HttpException(409, "Task not found");
    }

    return findTask;
  }




  public async findReportTask(userId: string,data:ReportTaskDto): Promise<ITask[]> {
    if (!ObjectId.isValid(userId)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }

    // const findTask: ITask[] | null = await this.tasks.find({
    //   assignedMember: userId,
    // });
    data.startDate=new Date(data.startDate)
    data.endDate=new Date(data.endDate)
    console.log(userId,data);
    
    const findTask: ITask[] | null = await this.tasks.find({
      assignedMember: userId,
      inDoneDate: {
        $gte: data.startDate,
        $lte: data.endDate,
      },
    });
    console.log(findTask);
    
    if (!findTask) {
      throw new HttpException(409, "Task not found");
    }

    return findTask;
  }
}

export default TaskService;
