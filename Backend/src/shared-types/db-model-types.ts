export type userDbData = {
  email: string;
  password: string;
  avatarUrl: string;
  username: string;
  verified: boolean;
  isAdmin: boolean;
};

export type productDbData = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImages: string[];
};
