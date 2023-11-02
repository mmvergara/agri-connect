import ConversationList from "@/components/Messages/ConversationList";

const ConversationListPage = () => {
  return (
    <main className="flex">
      <section className="mx-auto min-w-[700px] border-[hsl(34,45%,75%)] bg-[hsl(152,42%,13%)] font-poppins text-white ">
        <div className="conversations-container ">
          <ConversationList />
        </div>
      </section>
    </main>
  );
};

export default ConversationListPage;
