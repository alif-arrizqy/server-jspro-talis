import express from "express";
import * as SlaControllers from "../controllers/index.js";

const router = express.Router();

router.get("/", SlaControllers.sla);
router.get("/sla3", SlaControllers.sla3Export);

export default router;
