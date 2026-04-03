import express from "express";
import * as authController from "../controllers/AuthController";

const router = express.Router();

router.post("/google", authController.googleAuth);

export default router;