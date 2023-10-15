import { changePassword } from "@/services/AuthService";
import { createProduct } from "@/services/ProductService";
import { ChangePasswordFields } from "@/types/shared-types";
import {
  useColorModeValue,
  FormLabel,
  Input,
  Container,
  Divider,
  Button,
  Heading,
  Text,
  createStandaloneToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";

const SettingsPage = () => {
  const router = useRouter();
  const bgColor = useColorModeValue("white", "hsl(220,26%,18%)");

  const [changePasswordFields, setChangePasswordFields] =
    useState<ChangePasswordFields>({
      oldPassword: "",
      newPassword: "",
    });
  const handleChangePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChangePasswordFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { toast } = createStandaloneToast();

  const handleChangePassword = async (e: FormEvent) => {
    const { error } = await changePassword(changePasswordFields);
    if (error) return;
    toast({ title: "Password changed successfully", status: "success" });
    setChangePasswordFields({ oldPassword: "", newPassword: "" });
  };
  const handleDeleteAccount = () => {
    console.log("delete account");
  };

  return (
    <>
      <Head>
        <title>AgriConnect | Settings</title>
      </Head>
      <Container
        bg={bgColor}
        minH="110vh"
        maxW="container.md"
        className="shadow-lg"
      >
        <div className="flex flex-col items-start gap-4 max-w-[500px] mx-auto ">
          <Heading className="pt-[5vh]">Agriconnect | Settings </Heading>

          <Divider />
          <FormLabel>Change Passowrd</FormLabel>
          <Input
            name="oldPassword"
            data-cy="oldPasswordField"
            type="password"
            value={changePasswordFields.oldPassword}
            onChange={handleChangePasswordInputChange}
            placeholder="Old Password"
            variant="filled"
          />
          <Input
            name="newPassword"
            data-cy="newPasswordField"
            type="password"
            value={changePasswordFields.newPassword}
            onChange={handleChangePasswordInputChange}
            placeholder="New Password"
            variant="filled"
          />
          <Button
            type="button"
            colorScheme="teal"
            variant="outline"
            data-cy="changePasswordButton"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
          <Divider className="mt-4" />

          <FormLabel>Delete Account</FormLabel>
          <Text>
            Deleting your account will delete all your data. This action cannot
            be undone.
          </Text>
          <Button
            type="button"
            colorScheme="red"
            variant="solid"
            data-cy="deleteAccountButton"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </Container>
    </>
  );
};

export default SettingsPage;
