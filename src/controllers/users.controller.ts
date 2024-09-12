import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/userDto/create-user-dto";
import { IUser } from "../interfaces/users.interface";
import UserService from "../services/users.service";

class UsersController {
  public userService;
  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateUserDto = req.body;
      const createdUserData = await this.userService.createUser(userData);

      const data = JSON.parse(JSON.stringify(createdUserData));
      delete data.password;

      res.status(201).json({ data, message: "created" });
    } catch (error) {
      next(error);
    }
  };


  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;

      const findOneUserData: IUser = await this.userService.findUserById(
        userId
      );
      res.status(200).json({ data: findOneUserData, message: "foundOneUser" });
    } catch (error) {
      next(error);
    }
  };


  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const findUsersData: IUser[] = await this.userService.findAllUser(
      );

      res.status(200).json({ data: findUsersData, message: "findUsers" });
    } catch (error) {
      next(error);
    }
  };



  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      await this.userService.deleteUser(userId);

      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };



}

export default UsersController;
