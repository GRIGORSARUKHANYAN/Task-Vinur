import { CreateUserDto } from "../dtos/userDto/create-user-dto";
import { UpdateUserDto } from "../dtos/userDto/update-user-dto";
import HttpException from "../exceptions/HttpException";
import { IUser } from "../interfaces/users.interface";
import UserDocument from "../models/users.model";
import { isEmpty } from "../utils/util";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import bcrypt, { hash } from "bcrypt";

dotenv.config();
class UserService {
  public users = UserDocument;
  constructor() {
  }

  // private changeAnyDateToArmenianDate(date: string) {
  // 	const currentDate = date
  // 		.replace(/ /g, '')
  // 		.replace(/\./g, '-')
  // 		.replace(/\:/g, '-')
  // 		.replace(/\//g, '-');
  // 	const newDate = currentDate.slice(0, 10) + 'T00:00:00+04:00';

  // 	return newDate;
  // }





  public async createUser(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) {
      throw new HttpException(400, "UserData is empty");
    }

    const findUserEmail: IUser | null = await this.users.findOne({
      email: userData.email,
    });


    if (findUserEmail) {
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );
    }
    const hashedPassword = await hash(
      userData.password,
      Number(process.env.bcryptSalt) || 10
    );
    const createUserData: IUser = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }




  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await this.users.find({}, { password: 0 });

    return users;
  }



  // public async findUserByEmail(email: string): Promise<IUser> {
  //   if (isEmpty(email)) {
  //     throw new HttpException(400, "email is invalid");
  //   }

  //   const findUser: IUser | null = await this.users.findOne({ email: email });

  //   if (!findUser) {
  //     throw new HttpException(409, "User not found");
  //   }
  //   return findUser;
  // }

  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId) || !ObjectId.isValid(userId)) {
      throw new HttpException(400, "UserId is invalid");
    }

    const findUser: IUser | null = await this.users.findOne({ _id: userId }, { password: 0 });

    if (!findUser) {
      throw new HttpException(409, "User not found");
    }
    return findUser;
  }


  // public async updateUser(
  //   userId: string,
  //   userData: UpdateUserDto | IUser
  // ): Promise<IUser> {
  //   if (isEmpty(userId) || !ObjectId.isValid(userId)) {
  //     throw new HttpException(400, "UserId is invalid");
  //   }

  //   const findUserById: IUser | null = await this.users.findById({
  //     _id: userId,
  //   });

  //   if (!findUserById) {
  //     throw new HttpException(409, "User doesn't exist");
  //   }

  //   findUserById?.set(userData);

  //   await this.users.findOneAndUpdate({ _id: userId }, findUserById);

  //   return findUserById;
  // }

  public async deleteUser(userId: string): Promise<IUser> {
    if (isEmpty(userId) || !ObjectId.isValid(userId)) {
      throw new HttpException(400, "UserId is invalid");
    }
    const deleteUserById: IUser | null = await this.users.findByIdAndDelete(
      userId
    );
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }









}

export default UserService;
