export type UserData = {
  id: string;
  avatarUrl: string;
  username: string;
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
