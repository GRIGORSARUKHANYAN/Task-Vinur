import {
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsEnum,
} from "class-validator";
import { Types } from "mongoose";
import { TaskStatus } from "../../constants";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @IsNotEmpty()
  @IsMongoId({ message: "Invalid user ID" })
  assignedMember: Types.ObjectId;


}
