import express from "express";
import * as SlaControllers from "../controllers/index.js";

const router = express.Router();

router.get("/", SlaControllers.sla1);


export default router;
