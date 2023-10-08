import {
  dataTemp,
  postLogin,
  postLogout,
  postRegister,
} from "../controllers/auth-controller";
import type { Router } from "express";
import { isAuth } from "../middleware/isAuth";

export default (router: Router) => {
  router.post("/auth/register", postRegister);
  router.post("/auth/login", postLogin);
  router.post("/auth/logout", postLogout);
  router.get("/auth/data", isAuth, dataTemp);
};
