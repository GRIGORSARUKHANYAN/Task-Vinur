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

export class ReportTaskDto {

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;


}
