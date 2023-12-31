import {
  CommunityChatMessage,
  GetAllConversationsDataResponse,
  PostGetConversationByIDDataResponse,
  PostGetConversationByUserIDataResponse,
  SendMessageFields,
} from "../../shared-types";
import { Req, Res } from "../../types/express-types";
import { getSocket } from "../../utilities/socket";
import {
  createConversation,
  fetchAllConversations,
  fetchCommunityChatMessages,
  findConversation,
  getMessagesByConversationID,
  isPartOfConversation,
  sendCommunityChatMessage,
  sendMessage,
} from "./conversation-services";

export const getAllConversations = async (req: Req, res: Res) => {
  try {
    const userID = req.session.user_id;
    const data = await fetchAllConversations(userID);

    // sort by last message date
    data.sort((a, b) => {
      return (
        new Date(b.lastMessageDate).getTime() -
        new Date(a.lastMessageDate).getTime()
      );
    });
    return res.status(200).json({ data, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};
export const postGetConversationByID = async (req: Req, res: Res) => {
  try {
    const { conversationID } = req.body;
    const userID = req.session.user_id;
    console.log(req.body);
    const conversation = await isPartOfConversation(userID, conversationID);

    if (!conversation) {
      throw new Error("You are not part of this conversation");
    }

    const messages = await getMessagesByConversationID(conversationID);

    const data: PostGetConversationByIDDataResponse = {
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
export const postGetConversationByUserID = async (req: Req, res: Res) => {
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

    const data: PostGetConversationByUserIDataResponse = {
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

export const getConversationMessages = async (req: Req, res: Res) => {
  try {
    const { conversationID } = req.params;
    const userID = req.session.user_id;
    const conversation = await isPartOfConversation(userID, conversationID);

    if (!conversation) {
      throw new Error("You are not part of this conversation");
    }

    const messages = await getMessagesByConversationID(conversationID);

    return res.status(200).json({ data: messages, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const postSendMessage = async (req: Req, res: Res) => {
  try {
    const { message, conversationID } = req.body as SendMessageFields;
    const userID = req.session.user_id;
    const conversation = await isPartOfConversation(userID, conversationID);

    if (!conversation) {
      throw new Error("You are not part of this conversation");
    }

    const sentMessage = await sendMessage(userID, conversationID, message);

    const io = getSocket();

    io.emit(`new-message-${conversationID}`, sentMessage);

    return res.status(200).json({ data: sentMessage, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const postSendMessageCommunityChat = async (req: Req, res: Res) => {
  try {
    const { message } = req.body;
    const userID = req.session.user_id;

    const sentMessage = await sendCommunityChatMessage(userID, message);

    const io = getSocket();

    io.emit(`new-message-community-chat`, sentMessage);

    return res.status(200).json({ data: sentMessage, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const getCommunityChatMessages = async (req: Req, res: Res) => {
  try {
    const messages: CommunityChatMessage[] = await fetchCommunityChatMessages();
    return res.status(200).json({ data: messages, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};
