import {
  changePassword,
  changePfp,
  deleteAccount,
} from "@/services/AuthService";
import { ChangePasswordFields } from "@/types/shared-types";
import { useAuth } from "@/context/AuthContext";
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
import { useState, FormEvent, useEffect, useRef } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa";

const SettingsPage = () => {
  const user = useAuth();
  const auth = user;
  const router = useRouter();
  const bgColor = useColorModeValue("white", "hsl(220,26%,18%)");

  const [image, setImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null!);
  const handleImageUploadClick = () => imageInputRef.current?.click();
  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return console.log("No files");
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const handleSubmitProfilePicture = async () => {
    if (!image) return console.log("No image");
    const formData = new FormData();
    formData.append("avatar", image);
    const { error } = await changePfp(formData);
    if (error) {
      toast({ title: "Error changing profile picture", status: "error" });
      return;
    }
    toast({ title: "Profile picture changed successfully", status: "success" });
    router.push(`/u/${user.user?.username}`);
  };

  const [changePasswordFields, setChangePasswordFields] =
    useState<ChangePasswordFields>({
      oldPassword: "",
      newPassword: "",
    });

  const [deleteAccountPassword, setDeleteAccountPassword] =
    useState<string>("");

  const handleChangePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
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
    user.logout();
  };

  const handleDeleteAccount = () => {
    deleteAccount(deleteAccountPassword);
    toast({ title: "Account deleted successfully", status: "success" });
    user.logout();
  };

  useEffect(() => {
    if (!auth.user) {
      router.push("/auth");
    }
  }, [auth.user]);

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
        <div className="mx-auto flex max-w-[500px] flex-col items-start gap-4 ">
          <Heading className="pt-[5vh]">Agriconnect | Settings </Heading>

          <Divider />
          <FormLabel>Change Passowrd</FormLabel>
          <Input
            data-cy="old-password-input"
            name="oldPassword"
            type="password"
            value={changePasswordFields.oldPassword}
            onChange={handleChangePasswordInputChange}
            placeholder="Old Password"
            variant="filled"
          />
          <Input
            data-cy="new-password-input"
            name="newPassword"
            type="password"
            value={changePasswordFields.newPassword}
            onChange={handleChangePasswordInputChange}
            placeholder="New Password"
            variant="filled"
          />
          <Button
            data-cy="change-password-button"
            type="button"
            colorScheme="teal"
            variant="outline"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
          <Divider className="mt-4" />

          {image && (
            <div>
              <Image
                src={URL.createObjectURL(image)}
                alt="product-image"
                width={300}
                height={200}
                className="mx-auto h-[200px] w-[300px] rounded-md bg-gray-500 p-[1px]"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          )}
          <input
            data-cy="product-image-input"
            type="file"
            multiple={false}
            hidden
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageInputChange}
          />
          <Button
            data-cy="upload-product-image-button"
            type="button"
            leftIcon={<FaImage />}
            colorScheme="teal"
            onClick={handleImageUploadClick}
          >
            Upload Profile Image
          </Button>
          {image && (
            <Button
              data-cy="upload-product-image-button"
              type="button"
              leftIcon={<FaImage />}
              colorScheme="teal"
              onClick={handleSubmitProfilePicture}
            >
              Submit New Profile Picture
            </Button>
          )}
          <Divider className="mt-4" />

          <FormLabel>Delete Account</FormLabel>
          <Input
            data-cy="delete-account-password-input"
            name="deleteAccountPassword"
            type="password"
            value={deleteAccountPassword}
            onChange={(e) => {
              setDeleteAccountPassword(e.target.value);
            }}
            placeholder="Password"
            variant="filled"
          />
          <Text>
            Deleting your account will delete all your data. This action cannot
            be undone.
          </Text>
          <Button
            data-cy="delete-account-button"
            type="button"
            colorScheme="red"
            variant="solid"
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
