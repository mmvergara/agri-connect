import { isAuth } from "../../middleware/isAuth";
import type { Router } from "express";
import {
  getAllConversations,
  postGetConversation,
} from "./conversation-controller";

export default (router: Router) => {
  router.get("/conversation/all", isAuth, getAllConversations);
  router.post("/conversation/get", isAuth, postGetConversation);
};
