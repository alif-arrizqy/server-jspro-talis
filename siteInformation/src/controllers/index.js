import * as ResponseHelper from "../helpers/responseHelper.js";
import validateSiteInformation from "../helpers/validationSchema/siteInfoValidation.js";
import * as Sites from "../models/index.js";

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

const createSiteInformation = async (req, res) => {
  try {
    const data = req.body;
    const validatedData = await validateSiteInformation(data);

    if (validatedData.status === "failed") {
      return res.status(200).json(ResponseHelper.errorMessage("Validation failed", 400, validatedData.errors));
    }

    // insert new data
    await Sites.insertSiteInformation(validatedData);

    return res.status(201).json(ResponseHelper.successMessage("Site information created successfully", 201));
  } catch (error) {
    console.error("Error creating site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to create site information", 500));
  }
};

const updateSiteInformation = async (req, res) => {
  try {
    const data = req.body;
    const nojs = req.params.nojs;

    // check if site information exist
    const isExist = await Sites.findNoJS(nojs);
    if (!isExist) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    // validate site information and site information detail
    const validatedData = await validateSiteInformation(data);

    if (validatedData.status === "failed") {
      return res.status(400).json(ResponseHelper.errorMessage("Validation failed", 400, validatedData.errors));
    }

    // update site information
    await Sites.updateSiteInformation(nojs, validatedData);

    return res.status(200).json(ResponseHelper.successMessage("Site information updated successfully", 200));
  } catch (error) {
    console.error("Error updating site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to update site information", 500));
  }
};

const deleteSiteInformation = async (req, res) => {
  try {
    const nojs = req.params.nojs;

    const isExist = await Sites.findNoJS(nojs);
    if (!isExist) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    // delete site information
    await Sites.deleteSiteInformation(nojs);

    return res.status(200).json(ResponseHelper.successMessage("Site information deleted successfully", 200));
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
