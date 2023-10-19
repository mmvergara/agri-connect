// Auth Controller Responses===============================================
export type PostLoginDataResponse = LoggedInUserData;
export type PostRegisterDataResponse = null;
export type PostLogoutDataResponse = null;
export type PostChangePasswordResponse = null;

// Product Controller Responses ===========================================
export type PostCreateProductDataResponse = ProductData;
export type GetProductByIdDataResponse = ProductData;
export type GetAllProductsDataResponse = ProductData[];
export type GetSearchProductsDataResponse = ProductData[];

// User Controller Responses ==============================================
export type GetUserProfileDataResponse = UserProfile;

// Conversation Controller Responses =======================================
export type GetAllConversationsDataResponse = {
  user: {
    userID: string;
    email: string;
    password: string;
    avatarUrl: string;
    username: string;
    verified: boolean;
    isAdmin: boolean;
    createdAt: Date;
  };
  conversationID: string;
  participantFirstID: string;
  participantSecondID: string;
  lastMessageDate: Date;
}[];

export type GetConversationDataResponse = {
  messages: MessageData[];
  conversation: ConversationData;
};

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

export type ChangePasswordFields = {
  oldPassword: string;
  newPassword: string;
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

export type ConversationData = {
  conversationID: string;
  participantFirstID: string;
  participantSecondID: string;
  lastMessageDate: Date;
};

export type MessageData = {
  messageID: string;
  conversationID: string;
  senderID: string;
  messageContent: string;
  messageDate: Date;
};

// Complex Queries ================================================================
export type UserProfile = {
  _count: {
    products: number;
    ProductEndorsers: number;
  };
  products: ProductData[];
} & UserData;
