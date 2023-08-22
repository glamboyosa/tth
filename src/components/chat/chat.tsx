import Image from "next/image";
import ChatInput from "./chat-input";

type ChatProps = {};
const NMY = (
  <>
    <Image
      src="/remote-work.svg"
      width={400}
      height={400}
      alt="remote work GIF"
    />
    <p className="text-xl md:text-2xl text-center">No Messages Yet...</p>
  </>
);
const Chat: React.FC<ChatProps> = () => {
  return (
    <form className="mt-28">
      {NMY}
      <ChatInput onChangeHandler={() => {}} value="" />
    </form>
  );
};

export default Chat;
