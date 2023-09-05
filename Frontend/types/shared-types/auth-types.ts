export type UserData = {
  id: string;
  username: string;
  avatarUrl: string;
  isAdmin: boolean;
  token_expiration: Date;
};

export type LoginFields = {
  email: string;
  password: string;
};

export type RegisterFields = {
  username: string;
  email: string;
  password: string;
};
