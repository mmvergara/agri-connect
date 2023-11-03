import { db } from "../../lib/db";

export const fetchAllConversationMessages = async (conversationID: string) => {
  try {
    const messages = await db.messages.findMany({
      where: { conversationID },
    });
  } catch (error) {}
};

export const fetchAllConversations = async (userID: string) => {
  try {
    const conversation = await db.conversations.findMany({
      where: {
        OR: [
          {
            participantFirstID: userID,
          },
          {
            participantSecondID: userID,
          },
        ],
      },
    });
    // find the user with the id of not userID then get the user

    const conversations = await Promise.all(
      conversation.map(async (conversation) => {
        const user =
          conversation.participantFirstID === userID
            ? await db.user.findUnique({
                where: {
                  userID: conversation.participantSecondID,
                },
              })
            : await db.user.findUnique({
                where: {
                  userID: conversation.participantFirstID,
                },
              });

        user.password = "";
        user.email = "";
        user.isAdmin = false;
        return {
          ...conversation,
          user,
        };
      })
    );

    return conversations;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting all conversations");
  }
};

export const isPartOfConversation = async (
  userID: string,
  conversationID: string
) => {
  try {
    const conversation = await db.conversations.findFirst({
      where: {
        AND: [
          {
            conversationID,
          },
          {
            OR: [
              {
                participantFirstID: userID,
              },
              {
                participantSecondID: userID,
              },
            ],
          },
        ],
      },
    });
    return conversation;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating conversation");
  }
};

export const findConversation = async (userID1: string, userID2: string) => {
  try {
    // use OR to find the conversation
    const conversation = await db.conversations.findFirst({
      where: {
        OR: [
          {
            participantFirstID: userID1,
            participantSecondID: userID2,
          },
          {
            participantFirstID: userID2,
            participantSecondID: userID1,
          },
        ],
      },
    });

    return conversation;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating conversation");
  }
};

export const createConversation = async (userID: string, userID2: string) => {
  try {
    if (userID === userID2) throw new Error("Cannot message yourself");
    const conversation = await db.conversations.create({
      data: {
        participantFirstID: userID,
        participantSecondID: userID2,
      },
    });

    return conversation;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating conversation");
  }
};

// MESSAGING

export const getMessagesByConversationID = async (conversationID: string) => {
  try {
    const messages = await db.messages.findMany({
      where: {
        conversationID,
      },
      orderBy: {
        messageDate: "asc",
      },
    });
    console.log("====================================");
    return messages;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting messages");
  }
};

export const sendMessage = async (
  userID: string,
  conversationID: string,
  message: string
) => {
  try {
    const newMessage = await db.messages.create({
      data: {
        conversationID,
        messageContent: message,
        senderID: userID,
      },
    });

    console.log(newMessage);

    return newMessage;
  } catch (error) {
    console.log(error);
    throw new Error("Error sending message");
  }
};
