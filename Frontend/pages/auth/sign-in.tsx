import {
  Button,
  Flex,
  FormControl,
  Text,
  Heading,
  Input,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const SignInPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Flex grow={1} height="94.2vh" className="overflow-hidden">
      <Flex flex={1} bg="green.800" height="100%">
        <Heading>Agri Connect</Heading>
      </Flex>
      <Flex flex={1}>
        <FormControl
          className={`max-w-[500px] pl-16 flex flex-col gap-8 pt-16`}
        >
          <Image
            src="/agri-connect-logo.png"
            alt="agri-connect-logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <Heading as="h2" textAlign="center" size="md">
            AgriConnect | Sign Up
          </Heading>
          <Text fontWeight={500} textAlign="center" className="opacity-70">
            Username and Email cannot be changed later
          </Text>
          <Divider />
          <Input
            name="username"
            type="text"
            value={inputs.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
          <Input
            name="email"
            type="email"
            value={inputs.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <Divider />

          <Button colorScheme="teal" size="md">
            <span>Create Account</span>
          </Button>

          <Text textAlign="center">
            Already have an account?{" "}
            <Button variant="link" colorScheme="teal">
              Sign In
            </Button>
          </Text>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default SignInPage;
