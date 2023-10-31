import { Input } from "@chakra-ui/react";

const Conversation = () => {
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
  const dummyMessages: any = [
    /* Array of dummy messages */
  ]; // Assuming you have an array of messages

  return (
    <main className="flex h-[92vh] overflow-hidden">
      <section className="hidden min-w-[300px] border-[hsl(34,45%,75%)] bg-[hsl(152,42%,13%)] font-poppins text-white sm:block">
        <div className="conversations-container h-[100%] overflow-y-scroll">
          {renderConversationItems()}
        </div>
      </section>
      <section className="flex w-full flex-col">
        <div className="drop-shadow-bottom-only flex items-center justify-between bg-[#eadbc8] p-2">
          <div className="flex items-center gap-2">
            <img
              src="https://picsum.photos/200/300"
              alt="user image"
              className="h-[32px] w-[32px] rounded-full"
            />
            <p>Username</p>
          </div>
          <div className="block sm:hidden">
            <button
              className="flex items-center justify-center rounded-md bg-[hsl(34,45%,50%)] p-2"
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
            </button>
          </div>
        </div>
        <div className="grow-1 conversation-container flex-1 overflow-y-scroll border-b-2 border-b-[hsl(34,45%,70%)]">
          {/* Message Container */}
          {/* {dummyMessages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))} */}
          {/* Message Container */}
        </div>
        <div className="flex p-2">
          <input
            type="text"
            className="w-[80%] rounded-lg bg-[hsl(34,45%,80%)] p-2 placeholder-[hsl(0,0%,40%)] outline-none"
            placeholder="Type a message"
            name="messageInput"
            id="messageInput"
            data-cy="message-input"
          />
          <button
            className="mx-2 flex w-[20%] items-center justify-center rounded-lg bg-[hsl(34,45%,70%)] hover:bg-[hsl(34,45%,60%)]"
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
        </div>
      </section>
    </main>
  );
};

export default Conversation;
