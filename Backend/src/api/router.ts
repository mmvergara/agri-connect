import authenticationRoutes from "./auth/auth.routes";
import type { Router } from "express";
import express from "express";
import productRoutes from "./product/product.routes";
import userRoutes from "./user/user.routes";
import conversationRoutes from "./conversation/conversation.routes";
import postsRoutes from "./posts/posts.routes";

const router = express.Router();

export default (): Router => {
  authenticationRoutes(router);
  conversationRoutes(router);
  productRoutes(router);
  postsRoutes(router);
  userRoutes(router);
  return router;
};
