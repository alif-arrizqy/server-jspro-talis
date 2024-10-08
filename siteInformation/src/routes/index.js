import express from "express";
import * as siteInfoControllers from "../controllers/index.js";

const router = express.Router();

router.get("/", siteInfoControllers.fetchAllSiteInformation);
router.get("/:nojs", siteInfoControllers.fetchSiteInformation);
router.post("/", siteInfoControllers.createSiteInformation);
router.patch("/:nojs", siteInfoControllers.updateSiteInformation);
router.delete("/:nojs", siteInfoControllers.deleteSiteInformation);

export default router;