import ConversationList from "@/components/Messages/ConversationList";
import { getAllConversation } from "@/services/ConversationService";
import { GetAllConversationsDataResponse } from "@/types/shared-types";
import { useEffect, useState } from "react";

const ConversationListPage = () => {
  const [conversations, setConversations] =
    useState<GetAllConversationsDataResponse>([]);
  const fetchConversations = async () => {
    const { data } = await getAllConversation();
    if (data) setConversations(data);
  };
  useEffect(() => {
    fetchConversations();
  }, []);
  return (
    <main className="flex">
      <section className="mx-auto min-w-[700px] border-[hsl(34,45%,75%)] bg-[hsl(152,42%,13%)] font-poppins text-white ">
        <div className="conversations-container ">
          <ConversationList conversations={conversations} />
        </div>
      </section>
    </main>
  );
};

export default ConversationListPage;
