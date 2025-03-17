import express from "express";
import { deleteAUser, findAllDashboardUser, postUser, updateUser } from "./user.controllers";
import { verifyToken } from "../../middlewares/verify.token";
const router = express.Router();

// Create, Get User
router
  .route("/")
  .get(verifyToken, findAllDashboardUser)
  .post(verifyToken, postUser)
  .patch(verifyToken, updateUser)
  .delete(verifyToken, deleteAUser);

export const UserRegRoutes = router;
