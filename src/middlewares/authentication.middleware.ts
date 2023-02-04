import { Response, NextFunction } from "express";
import { Request } from "../interfaces";

export async function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.method === "OPTIONS") {
    return next();
  }

  //   if (request.headers.authorization === undefined) {
  //     return response
  //       .status(400)
  //       .json({ message: "Authorization token undefined" });
  //   }

  next();
}
