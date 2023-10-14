// Auth Controller Responses===============================================
export type PostLoginDataResponse = LoggedInUserData;
export type PostRegisterDataResponse = null;
export type PostLogoutDataResponse = null;

// Product Controller Responses ===========================================
export type PostCreateProductDataResponse = ProductData;
export type GetProductByIdDataResponse = ProductData;
export type GetProductsDataResponse = ProductData[];

// User Controller Responses ==============================================
export type GetUserProfileDataResponse = UserProfile;

//  FIELDS ================================================================
export type LoginFields = {
  email: string;
  password: string;
};

export type RegisterFields = {
  username: string;
  email: string;
  password: string;
};

export type LoggedInUserData = {
  id: string;
  username: string;
  avatarUrl: string;
  isAdmin: boolean;
  token_expiration: Date;
};

// Prisma Types ================================================================
export type ProductData = {
  productID: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productPricePer: string;
  productImageUrl: string;
  productOwnerId: string;
  createdAt: Date;
};

export type UserData = {
  userID: string;
  email: string;
  password: string;
  avatarUrl: string;
  username: string;
  verified: boolean;
  isAdmin: boolean;
  createdAt: Date;
};

// Complex Queries ================================================================
export type UserProfile = {
  _count: {
    products: number;
    ProductEndorsers: number;
  };
  products: ProductData[];
} & UserData;
