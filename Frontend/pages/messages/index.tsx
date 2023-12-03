import ConversationList from "@/components/Messages/ConversationList";
import MessageItem from "@/components/Messages/MessageItem";
import { BASE_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import {
  getAllConversation,
  getConversationById,
  sendMessage,
} from "@/services/ConversationService";
import { MessageItemType } from "@/types";
import {
  GetAllConversationsDataResponse,
  MessageData,
} from "@/types/shared-types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import openSocket from "socket.io-client";
const Conversation = () => {
  const { query } = useRouter();
  const { user } = useAuth();

  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageItemType[]>([]);
  const conversationID = query.id as string;

  const messageContainerRef = useRef<null | HTMLDivElement>(null!);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (!messageContainerRef.current) return;
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }, 400);
  };

  const [conversations, setConversations] =
    useState<GetAllConversationsDataResponse>([]);

  const fetchConversations = async () => {
    const { data } = await getAllConversation();
    if (data) setConversations(data);
  };

  const currentConversationUser = conversations.find(
    (v) => v.conversationID === conversationID,
  )?.user;

  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!messageInput) return;
    if (!query.id) return;
    const { error } = await sendMessage({
      conversationID,
      message: messageInput,
    });
    if (error) return;
    setMessageInput("");
  };
  const fetchMessages = async (conversationID: string) => {
    const { data } = await getConversationById({ conversationID });
    if (data) {
      const { messages } = data;
      const allMessages: MessageItemType[] = [];
      for (let i = 0; i < messages.length; i++) {
        let isFirstMessage = true;
        if (i > 0 && messages[i].senderID === messages[i - 1].senderID)
          isFirstMessage = false;
        const isMessageOwner = messages[i].senderID === user?.id;
        const message: MessageItemType = {
          senderID: messages[i].senderID,
          content: messages[i].messageContent,
          created_at: new Date(messages[i].messageDate).toUTCString(),
          isMessageOwner,
          isFirstMessage,
        };
        allMessages.push(message);
      }
      setMessages(allMessages);
    }
    scrollToBottom();
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const socket = openSocket(BASE_URL);
    const conID = query.id || "";
    if (conID) {
      fetchMessages(query.id as string);
      socket.on(`new-message-${conversationID}`, (data: MessageData) => {
        console.log(`new-message-${conversationID}`, data);
        if (data.conversationID === conversationID) {
          const message: MessageItemType = {
            senderID: data.senderID,
            content: data.messageContent,
            created_at: new Date(data.messageDate).toUTCString(),
            isMessageOwner: data.senderID === user?.id,
            isFirstMessage: false,
          };
          setMessages((prev) => [...prev, message]);
          scrollToBottom();
        }
      });
    } else {
      setMessages([]);
    }

    return () => {
      socket.off(`new-message-${conversationID}`);
    };
  }, [query]);

  return (
    <>
      <Head>
        <title>AgriConnect - Messages</title>
      </Head>
      <main className="flex h-[92vh] overflow-hidden">
        <section className="hidden min-w-[300px] border-[hsl(34,45%,75%)] bg-[hsl(152,42%,13%)] font-poppins text-white sm:block">
          <div className="conversations-container h-[100%] overflow-y-scroll">
            <ConversationList conversations={conversations} />
          </div>
        </section>

        {/* Message Body */}
        <section className="flex w-full flex-col">
          <div className="drop-shadow-bottom-only flex items-center justify-between bg-[hsl(152,42%,13%)] p-2">
            <div className="flex items-center gap-2">
              {currentConversationUser?.avatarUrl && (
                <img
                  src={currentConversationUser?.avatarUrl}
                  alt="user image"
                  className="h-[32px] w-[32px] rounded-full"
                />
              )}
              <p className="font-poppins text-white">
                {currentConversationUser?.username}
              </p>
            </div>
            <div className="block sm:hidden">
              <Link
                href="/messages/list"
                className="flex items-center justify-center rounded-md bg-[hsl(152,42%,17%)] p-2"
                data-cy="back-conversation-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="h-6 w-6"
                >
                  <path d="M20.25 11.25H5.414l4.293-4.293a.75.75 0 10-1.061-1.061l-6 6a.75.75 0 000 1.061l6 6a.75.75 0 101.061-1.061L5.414 12.75H20.25a.75.75 0 000-1.5z" />
                </svg>
              </Link>
            </div>
          </div>
          <div
            className="grow-1 conversation-container flex-1 overflow-y-scroll border-b-2 border-b-[#132f22]"
            id="message-container"
            ref={messageContainerRef}
          >
            {/* Message Container */}
            {messages.map((message, index) => (
              <MessageItem
                key={index}
                message={message}
                avatarURL={
                  currentConversationUser?.avatarUrl ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
              />
            ))}
            {/* Message Container */}
          </div>
          <form
            className="flex bg-[#132f22] p-2"
            onSubmit={handleSubmitMessage}
          >
            <input
              data-cy="message-input"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              type="text"
              className="w-[80%] rounded-lg bg-[hsl(152,42%,20%)] p-2 text-white placeholder-[hsl(0,0%,79%)] outline-none"
              placeholder="Type a message"
              name="messageInput"
              id="messageInput"
            />
            <button
              className="mx-2 flex w-[20%] items-center justify-center rounded-lg bg-[hsl(152,42%,15%)] hover:bg-[hsl(152,42%,20%)]"
              type="submit"
              data-cy="send-message-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-6 w-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986a.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Conversation;
