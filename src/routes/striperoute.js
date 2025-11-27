import express from "express";
import { stripeController } from "../controllers/stripecontroller.js";

const router = express.Router();

router.get("/stripe", stripeController);

export default router;
