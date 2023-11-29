import MessageItem from "@/components/Messages/MessageItem";
import { BASE_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import {
  getAllCommunityChatMessages,
  sendCommunityChatMessage,
} from "@/services/ConversationService";
import { MessageItemType } from "@/types";
import { CommunityChatMessage } from "@/types/shared-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import openSocket from "socket.io-client";

const CommunityChat = () => {
  const { user } = useAuth();

  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<CommunityChatMessage[]>([]);

  const messageContainerRef = useRef<null | HTMLDivElement>(null!);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (!messageContainerRef.current) return;
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }, 400);
  };

  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!messageInput) return;
    const { error } = await sendCommunityChatMessage(messageInput);
    if (error) return;
    setMessageInput("");
  };
  const fetchMessages = async () => {
    const { data, error } = await getAllCommunityChatMessages();
    if (error) {
      console.log(error);
    }
    if (data) {
      setMessages(data);
    }
    scrollToBottom();
  };

  useEffect(() => {
    fetchMessages();
    const socket = openSocket(BASE_URL);

    socket.on(`new-message-community-chat`, (data: CommunityChatMessage) => {
      setMessages((prev) => [...prev, data]);
      scrollToBottom();
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <>
      <main className="flex h-[92vh] overflow-hidden">
        <section className="flex w-full flex-col">
          <div className="drop-shadow-bottom-only flex items-center justify-between bg-[hsl(152,42%,13%)] p-2">
            <div className="flex items-center gap-2">
              <p className="font-poppins text-white">Community Chat</p>
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
              <article
                className={`} mx-4 my-2 flex items-center 
              gap-2 ${message.chatAuthorID === user?.id ? "justify-end" : ""}`}
              >
                {message.chatAuthorID !== user?.id && (
                  <img
                    src={message.chatAuthor.avatarUrl}
                    alt="user image"
                    width={32}
                    height={32}
                    className="h-[32px] w-[32px] rounded-full"
                  />
                )}
                <div>
                  <p className={`rounded-xl bg-[#1c4532] p-2 text-white`}>
                    {message.chatContent}
                  </p>
                </div>
              </article>
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

export default CommunityChat;
