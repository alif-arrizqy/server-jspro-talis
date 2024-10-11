import express from "express";
import * as SlaControllers from "../controllers/index.js";

const router = express.Router();

router.get("/sla1", SlaControllers.sla1);
router.get("/sla2", SlaControllers.sla2);
router.get("/sla3", SlaControllers.sla3Export);

export default router;
