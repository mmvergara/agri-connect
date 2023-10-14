import { useState } from "react";
import {
  ChakraProvider,
  Container,
  VStack,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

type Message = {
  text: string;
  isMine: boolean;
};

const CommunityChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, isMine: true }]);
      setMessage("");
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="md">
        <VStack spacing={4} align="stretch" p={4}>
          <Box
            bg="gray.100"
            p={4}
            borderRadius="lg"
            h="300px"
            overflowY="auto"
          ></Box>
          <InputGroup>
            <Input
              placeholder="Type a message"
              variant="filled"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="Send message"
                icon={<FaPaperPlane />}
                colorScheme="cyan"
                onClick={handleSendMessage}
              />
            </InputRightElement>
          </InputGroup>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default CommunityChat;
