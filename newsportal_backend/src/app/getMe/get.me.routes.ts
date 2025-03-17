import express from "express";
import { getMeUser, getUserInformation } from "./get.me.controllers";
const router = express.Router();

//  Get and update User
router.route('/').get(getMeUser);

// get single user information
router.route('/:user_phone').get(getUserInformation);

export const UserGetMeRoutes = router;