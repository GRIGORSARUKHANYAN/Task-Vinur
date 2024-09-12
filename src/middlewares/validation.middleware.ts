import { NextFunction, Request, Response, RequestHandler } from "express";
import HttpException from "../exceptions/HttpException";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

const validationMiddleware = (
  type: any,
  value: string | "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestData = (req as any)[value];
    if (requestData === undefined) {
      next(new HttpException(400, "Invalid request data"));
      return;
    }

    const instance = plainToClass(type, requestData);

    validate(instance, { skipMissingProperties, whitelist }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) =>
              Object.values(error.constraints || {})
            )
            .join(", ");
          next(new HttpException(400, message));
        } else {
          const unexpectedKeys = Object.keys(requestData).filter(
            (key) => !(key in instance)
          );

          if (unexpectedKeys.length > 0) {
            const error = `Unexpected keys in request data: ${unexpectedKeys.join(
              ", "
            )}`;
            next(new HttpException(400, error));
          } else {
            next();
          }
        }
      }
    );
  };
};

export default validationMiddleware;
