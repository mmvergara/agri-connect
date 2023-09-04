import { NextFunction, Request, Response } from "express";

export interface Req extends Request {
  session: Request["session"] & { isLoggedIn: boolean };
}

export type Res = Response;
export type Next = NextFunction;
