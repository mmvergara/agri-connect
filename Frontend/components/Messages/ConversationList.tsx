import { getAllConversation } from "@/services/ConversationService";
import { GetAllConversationsDataResponse } from "@/types/shared-types";
import Link from "next/link";
import { useEffect, useState } from "react";

type props = {
  conversations: GetAllConversationsDataResponse;
};

const ConversationList = ({ conversations }: props) => {
  return (
    <>
      {conversations.map((v) => {
        return (
          <Link
            href={`/messages?id=${v.conversationID}`}
            key={v.conversationID}
          >
            <article
              key={v.conversationID}
              className="m-2 flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-[hsl(152,42%,19%)]"
            >
              <img
                src={v.user.avatarUrl}
                alt="user image"
                className="h-[48px] w-[48px] rounded-full"
              />
              <p>{v.user.username}</p>
            </article>
          </Link>
        );
      })}
    </>
  );
};

export default ConversationList;
