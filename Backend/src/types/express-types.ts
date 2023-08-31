import { NextFunction, Request, Response } from "express";

export interface Req extends Request {
  session: {
    isLoggedIn: boolean;
    userId: string;
    destroy: () => void;
  };
}

export type Res = Response;
export type Next = NextFunction;
