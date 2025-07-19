import express from "express";
import {
  signup,
  getAllUsers,
  login,
  refreshToken,
  logout,
} from "../controllers/userCreateController";
import User from "../models/user";

const UserRouter = express.Router();

UserRouter.post("/signUp", signup);
UserRouter.get("/users", getAllUsers);
UserRouter.post("/login", login);
UserRouter.post("/refresh-token", refreshToken);
UserRouter.post("/logout", logout);

export default UserRouter;
