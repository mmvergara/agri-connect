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

export type ProductData = {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productPricePer: string;
  productImageUrl: string;
  productOwner: UserData;
  productInStock: boolean;
};
