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
  productPricePer: string;
  productImageUrl: string;
  productOwner: userDbData;
  productInStock: boolean;
};

export type endorserDbData = {
  endorser: userDbData;
  userBeingEndorsed: userDbData;
};

export type recommendationDbData = {
  recommender: userDbData;
  productBeingRecommended: productDbData;
};
