import * as express from "express";

export interface ResponseType {
  status?: number;
  message?: string;
  result?: any;
}

export interface Request extends express.Request {}

export interface RouterMetaData {
  routerName: string;
  router: express.Router;
  beforeMiddlewares: "authentication"[];
  afterMiddlewares: ""[];
}
