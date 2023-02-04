import { Request, Response, NextFunction } from "express";
import { responseFail } from "../utils";

export function responseCors(
  _: Request,
  response: Response,
  next: NextFunction
) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, x-Requested-With, Accept, Origin, Set-Cookie"
  );
  response.header("Access-Control-Allow-Methods", "*");
  response.header("Access-Control-Allow-Credentials", "true");

  next();
}

export function routerNotFound(
  _: Request,
  response: Response,
  __: NextFunction
) {
  response.status(403).json(responseFail({ message: "not found" }));
}

/**
 * Error handler
 * If an error is encountered that is not caught by the Express Router or is sent with next (error), it goes through the error handler.
 */
export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Add: Error logging
  console.error(error.stack);

  response.status(403).json(
    responseFail({
      message: error.message,
    })
  );
}
