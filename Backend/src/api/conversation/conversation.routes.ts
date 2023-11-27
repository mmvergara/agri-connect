import { isAuth } from "../../middleware/isAuth";
import type { Router } from "express";
import {
  getAllConversations,
  getCommunityChatMessages,
  postGetConversationByID,
  postGetConversationByUserID,
  postSendMessage,
  postSendMessageCommunityChat,
} from "./conversation-controller";

export default (router: Router) => {
  router.get("/conversation/all", isAuth, getAllConversations);
  router.get("/conversation/community/all", isAuth, getCommunityChatMessages);

  router.post(
    "/conversation/community/send",
    isAuth,
    postSendMessageCommunityChat
  );
  router.post("/conversation/getByUserId", isAuth, postGetConversationByUserID);
  router.post("/conversation/send", isAuth, postSendMessage);
  router.post("/conversation/getById", isAuth, postGetConversationByID);
  router.post("/conversation/message/send", isAuth, postSendMessage);
};
