import { ResponseType } from "../interfaces";

export function responseFail(json: ResponseType = {}): ResponseType {
  return {
    status: json!.status || 500,
    message: json!.message || "fail",
    result: json!.result || null,
  };
}

export function responseSuccess(json: ResponseType = {}): ResponseType {
  return {
    status: json.status || 200,
    message: json.message || "success",
    result: json.result || null,
  };
}
