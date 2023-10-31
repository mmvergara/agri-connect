import { MessageItemType } from "@/types";

interface Props {
  message: MessageItemType;
}

const MessageItem: React.FC<Props> = ({ message }) => {
  return (
    <article
      className={`mx-4 my-2 flex items-center gap-2 ${
        !message.isFirstMessage && !message.isMessageOwner ? "ml-4" : ""
      } ${message.isMessageOwner ? "justify-end" : ""}`}
    >
      {message.isFirstMessage && !message.isMessageOwner && (
        <img
          src={message.userImg}
          alt="user image"
          width={32}
          height={32}
          className="h-[32px] w-[32px] rounded-full"
        />
      )}
      <div>
        <p
          className={`rounded-xl bg-[#1c4532] p-2 text-white ${
            !message.isFirstMessage && !message.isMessageOwner ? "ml-10" : ""
          }`}
        >
          {message.content}
        </p>
      </div>
    </article>
  );
};

export default MessageItem;
