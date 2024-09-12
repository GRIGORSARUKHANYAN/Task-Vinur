import { Router, Request, Response, NextFunction } from "express";
import TaskController from "../controllers/task.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreateTaskDto } from "../dtos/taskDto/create-task-dto";
import { UpdateTaskDto } from "../dtos/taskDto/update-task-dto";
import { ReportTaskDto } from "../dtos/taskDto/report-task-dto copy";

class TaskRoute {
  readonly PATH = "/task";
  public router = Router();
  public taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    this.router.get(`/report/:id`,      validationMiddleware(ReportTaskDto, "body"), this.taskController.findReportTask);


    this.router.post(
      ``,
      validationMiddleware(CreateTaskDto, "body"),
      this.taskController.createTask
    );
    this.router.get(`/:id`, this.taskController.findTaskById);

    this.router.get(`/ByAssignedMemberId/:id`, this.taskController.findTaskByAssignedMemberId);
    this.router.put(
      `/:id`,
      validationMiddleware(UpdateTaskDto, "body"),
      this.taskController.updateTask
    );
    this.router.delete(`/:id`, this.taskController.deleteTask);
  }

}

export default new TaskRoute().router;
