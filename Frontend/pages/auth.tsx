import {
  Button,
  FormControl,
  Text,
  Heading,
  Input,
  Container,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Register } from "@/services/AuthService";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const SignInPage = () => {
  const { login, user } = useAuth();
  const toast = useToast();
  const router = useRouter();

  if (user) router.push("/");
  const [isSignIn, setIsSignIn] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async () => {
    if (await login({ email: inputs.email, password: inputs.password })) {
      router.push("/");
    }
  };
  const handleSignUp = async () => {
    const { error } = await Register(inputs);
    if (error) return;
    toast({
      title: "Account Created.",
      isClosable: true,
      status: "success",
    });
    setIsSignIn(true);
    setInputs((prev) => ({ ...prev, username: "", password: "" }));
  };

  const changeAuthMode = () => setIsSignIn((o) => !o);
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) return;
    if (isSignIn) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };
  return (
    <>
      <Head>
        <title>AgriConnect | {isSignIn ? "Sign In" : "Sign Up"}</title>
      </Head>
      <Container maxW="container.sm" className="">
        <FormControl
          as="form"
          onSubmit={handleFormSubmit}
          className={`mx-auto flex max-w-[500px] flex-col gap-4 pt-16`}
        >
          <Image
            src="/agri-connect-logo.png"
            alt="agri-connect-logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <Heading as="h2" textAlign="center" size="md">
            AgriConnect | {isSignIn ? "Sign In" : "Sign Up"}
          </Heading>
          <Text fontWeight={500} textAlign="center" className="opacity-70">
            {!isSignIn ? "Username and Email cannot be changed later" : ""}
          </Text>

          <Input
            name="email"
            type="email"
            id="emailInput"
            value={inputs.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {!isSignIn && (
            <Input
              name="username"
              type="text"
              value={inputs.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          )}
          <Input
            name="password"
            type="password"
            id="passwordInput"
            value={inputs.password}
            onChange={handleInputChange}
            placeholder="Password"
          />

          <Button type="submit" colorScheme="teal" size="md">
            <span>{isSignIn ? "Sign In" : "Create Account"}</span>
          </Button>

          <Text textAlign="center">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <Button variant="link" colorScheme="teal" onClick={changeAuthMode}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </Button>
          </Text>
        </FormControl>
      </Container>
    </>
  );
};

export default SignInPage;
