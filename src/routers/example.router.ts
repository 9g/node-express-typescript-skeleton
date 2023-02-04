import { Router } from "express";

import { RouterMetaData, Request } from "../interfaces";
import { responseSuccess, responseFail } from "../utils";
import { Response, NextFunction } from "express";

const router = Router();

router.get("/", async (_: Request, response: Response) => {
  response.status(200).json(responseSuccess({}));
});

export const virtualCurrency: RouterMetaData = {
  router: router,
  beforeMiddlewares: ['authentication'],
  afterMiddlewares: [],
  routerName: "/example",
};
