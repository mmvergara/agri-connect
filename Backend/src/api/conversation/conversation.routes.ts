import { isAuth } from "../../middleware/isAuth";
import type { Router } from "express";
import {
  getAllConversations,
  postGetConversationByID,
  postGetConversationByUserID,
  postSendMessage,
} from "./conversation-controller";

export default (router: Router) => {
  router.get("/conversation/all", isAuth, getAllConversations);
  router.post("/conversation/getByUserId", isAuth, postGetConversationByUserID);
  router.post("/conversation/send", isAuth, postSendMessage);
  router.post("/conversation/getById", isAuth, postGetConversationByID);
  router.post("/conversation/message/send", isAuth, postSendMessage);
};
