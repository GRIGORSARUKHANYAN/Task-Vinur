import {  } from "../interfaces/routes.interface";
import UserController from "../controllers/users.controller";
import validationMiddleware from "../middlewares/validation.middleware";
// import { LoginUserDto } from '../dtos/userDto/login-user-dto';
// import { RegisterUserDto } from '../dtos/userDto/register-user-dto';
// import upload from "../middlewares/upload.middleware";
import { Router, Request, Response, NextFunction } from "express";

// import multer from "multer";
// import rateLimit from "express-rate-limit";
import { UpdateUserDto } from "../dtos/userDto/update-user-dto";
import { CreateUserDto } from "../dtos/userDto/create-user-dto";
// import { UpdateUserEmailDto } from "../dtos/userDto/update-userEmail-dto";
// import { UpdateUserPasswordDto } from "../dtos/userDto/update-userPassword-dto";
// import { FollowingDto } from "../dtos/userDto/following-dto";
// import { UpdateUserUsernameDto } from "../dtos/userDto/update-userUsername-dto";
// Define the rate limit settings
// const limiter = rateLimit({
//   windowMs: 24 * 60 * 60 * 1000,
//   max: 3,
//   message: "Too many requests from this IP, please try again later.",
// });

class UserRoute {
  readonly PATH = "/user";
  public router = Router();
  public usersController = new UserController();

  constructor() {
    this.initializeRoutes();
    // this.initializeErrorHandling();
  }

  private initializeRoutes() {
    this.router.post(
      `/`,
      validationMiddleware(CreateUserDto, "body"),
      this.usersController.createUser
    );



    this.router.get(`/:id`, this.usersController.getUserById);
    this.router.get(`/`, this.usersController.getAllUsers);
    this.router.delete(`/:id`, this.usersController.deleteUser);

  }

  // private initializeErrorHandling() {
  //   this.router.use(
  //     (err: any, req: Request, res: Response, next: NextFunction) => {
  //       if (err instanceof multer.MulterError) {
  //         return res
  //           .status(400)
  //           .json({ error: "Multer Error: " + err.message });
  //       }
  //       next(err);
  //     }
  //   );
  // }
}
export default new UserRoute().router;
