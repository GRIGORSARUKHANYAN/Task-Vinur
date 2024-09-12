import { NextFunction, Request, Response } from "express";
import { UpdateTaskDto } from "../dtos/taskDto/update-task-dto";
// import { ITask } from "../interfaces/tasks.interface";
// import { instanceToPlain } from 'class-transformer';
import TaskService from "../services/task.service";
import { CreateTaskDto } from "../dtos/taskDto/create-task-dto";
import { ITask } from "../interfaces/tasks.interface";
import { TaskStatus } from "../constants";
import { ReportTaskDto } from "../dtos/taskDto/report-task-dto copy";

class TasksController {
  public taskService;

  constructor() {
    this.taskService = new TaskService();

  }

  public createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let data: CreateTaskDto = req.body;

      let task = await this.taskService.createTask(data);
      res.status(201).json({ task });
    } catch (error) {
      next(error);
    }
  };

  public findTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const taskId: string = req.params.id;
      const findOneTaskData: ITask =
        await this.taskService.findTaskById(taskId);

      res
        .status(200)
        .json({ data: findOneTaskData, message: "foundOneTask" });
    } catch (error) {
      next(error);
    }
  };

  public findReportTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const taskId: string = req.params.id;
      const data: ReportTaskDto = req.body;


      const findOneTaskData: ITask[] =
        await this.taskService.findReportTask(taskId,data);

      res
        .status(200)
        .json({ data: findOneTaskData, message: "foundReportTask" });
    } catch (error) {
      next(error);
    }
  };



  public findTaskByAssignedMemberId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const assignedMemberId: string = req.params.id;
      const findOneTaskData: ITask[] =
        await this.taskService.findTaskByAssignedMemberId(assignedMemberId);

      res
        .status(200)
        .json({ data: findOneTaskData, message: "foundTasks" });
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const taskId: string = req.params.id;
      const data: UpdateTaskDto = req.body;

      const updateTaskData: ITask =
        await this.taskService.updateTask(taskId, data);

      res
        .status(200)
        .json({ data: updateTaskData, message: "updateTaskData" });
    } catch (error) {

      next(error);
    }
  };



  public deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const taskId: string = req.params.id;
      await this.taskService.deleteTask(taskId);

      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default TasksController;
