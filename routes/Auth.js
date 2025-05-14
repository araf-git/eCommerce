import express from "express";
import { register, login } from "../controller/Auth.js";

const router = express.Router();

router
    .post("/signup", register).
    post("/login", login);

export default router;
