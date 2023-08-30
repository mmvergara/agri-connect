interface NewUserRequest {
  email: string;
  username: string;
  password: string;
}

interface NewUserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
}
