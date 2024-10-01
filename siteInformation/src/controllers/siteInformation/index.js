import prisma from "../../app.js";
import * as ResponseHelper from "../../helpers/responseHelper.js";
import validateSiteInformation from "../../helpers/validationSchema/siteInfoValidation.js";

const fetchAllSiteInformation = async (req, res) => {
  /*
    Fetch all site information
  */

  try {
    const fetchAll = await prisma.siteInfoDetail.findMany({
      include: {
        siteInformation: true,
      },
    });

    if (!fetchAll) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    // change the response format
    const response = fetchAll.map((data) => {
      return {
        nojs: data.nojsSite,
        siteName: data.siteInformation.siteName,
        ip: data.siteInformation.ip,
        ipMiniPc: data.siteInformation.ipMiniPc,
        webapp: data.siteInformation.webapp,
        ehubVersion: data.siteInformation.ehubVersion,
        panel2Type: data.siteInformation.panel2Type,
        mpptType: data.siteInformation.mpptType,
        talisVersion: data.siteInformation.talisVersion,
        tvdSite: data.siteInformation.tvdSite,
        ipGatewayLC: data.ipGatewayLC,
        ipGatewayGS: data.ipGatewayGS,
        subnet: data.subnet,
        cellularOperator: data.cellularOperator,
        lc: data.lc,
        gs: data.gs,
        projectPhase: data.projectPhase,
        buildYear: data.buildYear,
        onairDate: data.onairDate,
        topoSustainDate: data.topoSustainDate,
        gsSustainDate: data.gsSustainDate,
        contactPerson: data.contactPerson,
        address: data.address,
        subDistrict: data.subDistrict,
        district: data.district,
        province: data.province,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    });
    return res.status(200).json(ResponseHelper.successData(response, 200));
  } catch (error) {
    console.error("Error fetching all site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to fetch site information", 500));
  }
};

const fetchSiteInformation = async (req, res) => {
  /*
    Fetch site information by nojs
  */
  const nojs = req.params.nojs;
  try {
    // find Site Information Detail by nojs
    const siteInfoDetail = await prisma.siteInfoDetail.findUnique({
      where: {
        nojsSite: nojs,
      },
      include: {
        siteInformation: {
          select: {
            nojs: true,
            siteName: true,
            ip: true,
            ipMiniPc: true,
            webapp: true,
            ehubVersion: true,
            panel2Type: true,
            mpptType: true,
            talisVersion: true,
            tvdSite: true,
          },
        },
      },
    });
    if (!siteInfoDetail) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    // change the response format
    const response = {
      nojs: siteInfoDetail.nojsSite,
      siteName: siteInfoDetail.siteInformation.siteName,
      ip: siteInfoDetail.siteInformation.ip,
      ipMiniPc: siteInfoDetail.siteInformation.ipMiniPc,
      webapp: siteInfoDetail.siteInformation.webapp,
      ehubVersion: siteInfoDetail.siteInformation.ehubVersion,
      panel2Type: siteInfoDetail.siteInformation.panel2Type,
      mpptType: siteInfoDetail.siteInformation.mpptType,
      talisVersion: siteInfoDetail.siteInformation.talisVersion,
      tvdSite: siteInfoDetail.siteInformation.tvdSite,
      ipGatewayLC: siteInfoDetail.ipGatewayLC,
      ipGatewayGS: siteInfoDetail.ipGatewayGS,
      subnet: siteInfoDetail.subnet,
      cellularOperator: siteInfoDetail.cellularOperator,
      lc: siteInfoDetail.lc,
      gs: siteInfoDetail.gs,
      projectPhase: siteInfoDetail.projectPhase,
      buildYear: siteInfoDetail.buildYear,
      onairDate: siteInfoDetail.onairDate,
      topoSustainDate: siteInfoDetail.topoSustainDate,
      gsSustainDate: siteInfoDetail.gsSustainDate,
      contactPerson: siteInfoDetail.contactPerson,
      address: siteInfoDetail.address,
      subDistrict: siteInfoDetail.subDistrict,
      district: siteInfoDetail.district,
      province: siteInfoDetail.province,
      latitude: siteInfoDetail.latitude,
      longitude: siteInfoDetail.longitude,
    };

    return res.status(200).json(ResponseHelper.successData(response, 200));
  } catch (error) {
    console.error("Error fetching site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to fetch site information", 500));
  }
};

const createSiteInformation = async (req, res) => {
  /*
    Create site information
  */
  try {
    const data = req.body;
    
    // Validate format and data site information and site information detail
    const validatedData = await validateSiteInformation(data);
    if (validatedData.status === "failed") {
      return res.status(200).json(ResponseHelper.errorMessage("Validation failed", 400, validatedData.errors));
    }
    
    // insert site information
    await prisma.siteInformation.create({
      data: validatedData.siteInformation,
    });

    // insert site information detail
    await prisma.siteInfoDetail.create({
      data: validatedData.siteInfoDetail
    });

    return res.status(201).json(ResponseHelper.successMessage("Site information created successfully", 201));
  } catch (error) {
    console.error("Error creating site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to create site information", 500));
  }
};

const updateSiteInformation = async (req, res) => {
  /*
    Update site information by nojs
  */
  try {
    const data = req.body;
    const nojs = req.params.nojs;

    // check if site information exist
    const isExist = await prisma.siteInformation.findUnique({
      where: {
        nojs: nojs,
      },
    });

    if (!isExist) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    // validate format and data site information and site information detail
    const validatedData = await validateSiteInformation(data);

    if (validatedData.status === "failed") {
      return res.status(400).json(ResponseHelper.errorMessage("Validation failed", 400, validatedData.errors));
    }

    // update site information
    await prisma.siteInformation.update({
      where: {
        nojs: nojs,
      },
      data: validatedData.siteInformation,
    });

    // update site information detail
    await prisma.siteInfoDetail.update({
      where: {
        nojsSite: nojs,
      },
      data: validatedData.siteInfoDetail,
    });

    return res.status(200).json(ResponseHelper.successMessage("Site information updated successfully", 200));
  } catch (error) {
    console.error("Error updating site information:", error);
    return res.status(500).json(ResponseHelper.errorMessage("Failed to update site information", 500));
  }
};

const deleteSiteInformation = async (req, res) => {
  /*
    Delete site information by nojs
  */
  try {
    const nojs = req.params.nojs;

    // check if site information exist
    const isExist = await prisma.siteInformation.findUnique({
      where: {
        nojs: nojs,
      },
    });

    if (!isExist) {
      return res.status(404).json(ResponseHelper.errorMessage("Site information not found", 404));
    }

    // delete site information
    await prisma.siteInformation.delete({
      where: {
        nojs: nojs,
      },
    });

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
