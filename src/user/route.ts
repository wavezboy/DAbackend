import express from "express";
import * as userController from "./controller";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getAuthUser", userController.getAuthUser);
router.post("/logout", userController.logOutUser);

export default router;
