import express from "express";
import { logIn } from "../controllers/userController";
const router = express.Router();

router.post('/login',logIn)

export default router