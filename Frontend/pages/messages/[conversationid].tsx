import { useState } from "react";
import {
  VStack,
  Box,
  Text,
  InputGroup,
  Input,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

type Message = {
  text: string;
  isMine: boolean;
};

const ConversationPage = () => {
  const bgColor = useColorModeValue("hsl(0,0%,95%)", "#252b36");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, isMine: true }]);
      setMessage("");
    }
  };

  return (
    <main className="h-[100vh]">
      <Box className="mx-auto max-w-[1200px]">
        <VStack spacing={4} align="stretch" p={4}>
          <Box
            p={4}
            borderRadius="lg"
            h="80vh"
            className="flex flex-col gap-4 overflow-x-hidden overflow-y-scroll p-4"
            style={{ backgroundColor: bgColor }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                bg={message.isMine ? "cyan.500" : "gray.200"}
                p={2}
                borderRadius="lg"
                color={message.isMine ? "white" : "black"}
                alignSelf={message.isMine ? "flex-end" : "flex-start"}
                maxW="60%"
              >
                <Text>{message.text}</Text>
              </Box>
            ))}
          </Box>
          <InputGroup>
            <Input
              placeholder="Type a message"
              variant="filled"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton
              aria-label="Send message"
              icon={<FaPaperPlane />}
              colorScheme="cyan"
              onClick={handleSendMessage}
            />
          </InputGroup>
        </VStack>
      </Box>
    </main>
  );
};

export default ConversationPage;
