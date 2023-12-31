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
export type PostGetConversationByIDDataResponse = {
  messages: MessageData[];
  conversation: ConversationData;
};
export type PostGetConversationByUserIDataResponse = {
  messages: MessageData[];
  conversation: ConversationData;
};
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

//  FIELDS ================================================================

export type GetConversationByUserIdFields = {
  userID2: string;
};
export type GetConversationByIdFields = {
  conversationID: string;
};
export type SendMessageFields = {
  conversationID: string;
  message: string;
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

export type PostCreateField = {
  postAuthorID: string;
  postTitle: string;
  postContent: string;
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

export type UserEndorsersData = {
  userID: string;
  productID: string;
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

export type PostData = {
  postID: string;
  postTitle: string;
  postContent: string;
  postDate: Date;
  postAuthorID: string;
};

export type PostDataWithAuthor = {
  postID: string;
  postTitle: string;
  postContent: string;
  postComments: any[];
  postLikes: any[];
  postDate: Date;
  postAuthor: UserData;
};

export type PostCommentType = {
  commentAuthor: UserData;
  commentAuthorID: string;
  commentContent: string;
  commentDate: string;
  commentID: string;
  postID: string;
  postCommentsLikes: {
    userID: string;
  }[];
};

// Complex Queries ================================================================
export type UserProfile = {
  _count: {
    products: number;
  };
  products: ProductData[];
  ProductEndorsers: {
    id: string;
    productID: string;
    userID: string;
  }[];
} & UserData;

export type SocketData = {
  action: "send-message" | "delete-message";
  conversationID: string;
  content: string;
  to: string;
  from: string;
};

export type CommunityChatMessage = {
  chatAuthor: {
    userID: string;
    username: string;
    avatarUrl: string;
  };
} & {
  chatID: string;
  chatContent: string;
  chatDate: Date;
  chatAuthorID: string;
};
