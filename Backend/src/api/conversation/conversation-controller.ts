import {
  GetAllConversationsDataResponse,
  GetConversationDataResponse,
} from "../../shared-types";
import { Req, Res } from "../../types/express-types";
import {
  createConversation,
  fetchAllConversations,
  findConversation,
  getMessagesByConversationID,
  isPartOfConversation,
  sendMessage,
} from "./conversation-services";

export const getAllConversations = async (req: Req, res: Res) => {
  try {
    const userID = req.session.user_id;
    const data: GetAllConversationsDataResponse = await fetchAllConversations(
      userID
    );
    return res.status(200).json({ data, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const getConversation = async (req: Req, res: Res) => {
  try {
    const { userID2 } = req.body;
    const userID = req.session.user_id;
    let conversation = await findConversation(userID, userID2);

    // if no conversation is found, create one
    if (!conversation) {
      console.log("creating conversation");
      conversation = await createConversation(userID, userID2);
    }

    const messages = await getMessagesByConversationID(
      conversation.conversationID
    );

    const data: GetConversationDataResponse = {
      conversation,
      messages,
    };

    return res.status(200).json({
      data,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const postSendMessage = async (req: Req, res: Res) => {
  try {
    const { message, conversationID } = req.body;
    const userID = req.session.user_id;
    const conversation = await isPartOfConversation(userID, conversationID);

    if (!conversation) {
      throw new Error("You are not part of this conversation");
    }
    const sentMessage = await sendMessage(userID, conversationID, message);

    return res.status(200).json({ data: sentMessage, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};
