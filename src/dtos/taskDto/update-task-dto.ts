import {
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsEnum,
} from "class-validator";
import { TaskStatus } from "../../constants";

export class UpdateTaskDto {


  @IsNotEmpty()
  @IsEnum([
    TaskStatus.toDo,
    TaskStatus.inProgress,
    TaskStatus.inReview,
    TaskStatus.done,
  ])
  status:
    | TaskStatus.toDo
    | TaskStatus.inProgress
    | TaskStatus.inReview
    | TaskStatus.done;
}
