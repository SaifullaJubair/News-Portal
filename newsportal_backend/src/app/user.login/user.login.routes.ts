import express from "express";
import { postLogUser } from "./user.login.controllers";
const router = express.Router();

// Create, Get User
router.route("/").post(postLogUser);

export const UserLogRoutes = router;
