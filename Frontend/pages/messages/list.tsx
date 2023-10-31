import ConversationList from "@/components/Messages/ConversationList";

const ConversationListPage = () => {
  const renderConversationItems = () => {
    const conversationItems = [];
    for (let index = 1; index <= 20; index++) {
      conversationItems.push(
        <article
          key={index}
          className="m-2 flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-[hsl(152,42%,19%)]"
        >
          <img
            src="https://picsum.photos/200/300"
            alt="user image"
            className="h-[48px] w-[48px] rounded-full"
          />
          <p>Username</p>
        </article>,
      );
    }
    return conversationItems;
  };

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
