import * as ResponseHelper from "../helpers/responseHelper.js";
import validateSiteInformation from "../helpers/validationSchema/siteInfoValidation.js";
import * as Sites from "../models/index.js";

/**
 * @swagger
 * /v1/api/:
 *   get:
 *     summary: Fetch all site information
 *     description: Retrieve all data site information
 *     tags: [Site Information]
 *     responses:
 *       200:
 *         description: Success fetching all site information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessAllSite'
 *       400:
 *         description: Invalid Date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 * 
 */
const fetchAllSiteInformation = async (req, res) => {
  try {
    const response = await Sites.selectAll();
    if (!response) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }
    return res.status(200).json(ResponseHelper.successData(response, 200));
  } catch (error) {
    console.error("Error fetching all site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to fetch site information", 500));
  }
};

/**
 * @swagger
 * /v1/api/{nojs}:
 *   get:
 *     summary: Fetch site information by nojs
 *     description: Retrieve site information by nojs
 *     tags: [Site Information]
 *     parameters:
 *       - in: path
 *         name: nojs
 *         schema:
 *           type: string
 *         required: true
 *         description: nojs site information
 *     responses:
 *       200:
 *         description: Success fetching site information by nojs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessSite'
 *       400:
 *         description: Invalid Date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 * 
 */
const fetchSiteInformation = async (req, res) => {
  const nojs = req.params.nojs;
  try {
    const response = await Sites.selectSite(nojs);
    if (!response) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    return res.status(200).json(ResponseHelper.successData(response, 200));
  } catch (error) {
    console.error("Error fetching site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to fetch site information", 500));
  }
};

/**
 * @swagger
 * /v1/api/:
 *   post:
 *     summary: Create site information and site information detail
 *     description: Create new site information and site information detail
 *     tags: [Site Information]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSiteInformation'
 *     responses:
 *       200:
 *         description: Success creating site information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Invalid Date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 * 
 */
const createSiteInformation = async (req, res) => {
  try {
    const data = req.body;
    const validatedData = await validateSiteInformation(data);

    if (validatedData.status === "failed") {
      return res.status(200).json(ResponseHelper.errorMessage("Validation failed", 400, validatedData.errors));
    }

    // insert new data
    const isSuccess = await Sites.insertSiteInformation(validatedData);
    if (isSuccess === false) {
      return res.status(500).json(ResponseHelper.errorMessage("Failed to create site information", 500));
    } else {
      return res.status(201).json(ResponseHelper.successMessage("Site information created successfully", 201));
    }
  } catch (error) {
    console.error("Error creating site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to create site information", 500));
  }
};

/**
 * @swagger
 * /v1/api/{nojs}:
 *   patch:
 *     summary: Update site information and site information detail
 *     description: Update site information and site information detail by nojs
 *     tags: [Site Information]
 *     parameters:
 *       - in: path
 *         name: nojs
 *         schema:
 *           type: string
 *         required: true
 *         description: nojs site information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSiteInformation'
 *     responses:
 *       200:
 *         description: Success creating site information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Invalid Date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 * 
 */
const updateSiteInformation = async (req, res) => {
  try {
    const data = req.body;
    const nojs = req.params.nojs;

    // check if site information exist
    const isExist = await Sites.findNoJS(nojs);
    if (!isExist) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    // check nojs in data is the same as nojs in params
    if (data.nojs !== nojs) {
      return res.status(400).json(ResponseHelper.errorMessage("nojs in params not match in nojs data", 400));
    }

    // validate site information and site information detail
    const validatedData = await validateSiteInformation(data);

    if (validatedData.status === "failed") {
      return res.status(400).json(ResponseHelper.errorMessage("Validation failed", 400, validatedData.errors));
    }

    // update site information
    const isUpdate = await Sites.updateSiteInformation(nojs, validatedData);
    if (isUpdate === false) {
      return res.status(500).json(ResponseHelper.errorMessage("Failed to update site information", 500));
    } else {
      return res.status(200).json(ResponseHelper.successMessage("Site information updated successfully", 200));
    }

  } catch (error) {
    console.error("Error updating site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to update site information", 500));
  }
};

/**
 * @swagger
 * /v1/api/{nojs}:
 *   delete:
 *     summary: Delete site information
 *     description: Delete site information by nojs
 *     tags: [Site Information]
 *     parameters:
 *       - in: path
 *         name: nojs
 *         schema:
 *           type: string
 *         required: true
 *         description: nojs site information
 *     responses:
 *       200:
 *         description: Success deleting site information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Invalid Date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
const deleteSiteInformation = async (req, res) => {
  try {
    const nojs = req.params.nojs;

    const isExist = await Sites.findNoJS(nojs);
    if (!isExist) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    // delete site information
    const isDelete = await Sites.deleteSiteInformation(nojs);
    if (isDelete === false) {
      return res.status(500).json(ResponseHelper.errorMessage("Failed to delete site information", 500));
    } else {
      return res.status(200).json(ResponseHelper.successMessage("Site information deleted successfully", 200));
    }
    
  } catch (error) {
    console.error("Error deleting site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to delete site information", 500));
  }
};

export {
  fetchAllSiteInformation,
  fetchSiteInformation,
  createSiteInformation, 
  updateSiteInformation,
  deleteSiteInformation
};
