import prisma from "../app.js";

const selectAll = async () => {
  const fetchAll = await prisma.siteInfoDetail.findMany({
    include: {
      siteInformation: true,
    },
  });

  if (!fetchAll) {
    return false;
  }

  return fetchAll.map((data) => {
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
};

const selectSite = async (nojs) => {
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
    return false;
  }

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

  return response;
};

const findNoJS = async (nojs) => {
  const isExist = await prisma.siteInformation.findUnique({
    where: {
      nojs: nojs,
    },
  });

  if (!isExist) {
    return false;
  }

  return isExist;
};

const insertSiteInformation = async (datas) => {
  try {
    // Insert site information
    await prisma.siteInformation.create({
      data: datas.siteInformation,
    });

    // Insert site info detail
    await prisma.siteInfoDetail.create({
      data: datas.siteInfoDetail,
    });

    return true;
  } catch (error) {
    console.error("Error inserting site information:", error);
    return false;
  }
};

const updateSiteInformation = async (nojs, datas) => {
  try {
    // Update site information
    await prisma.siteInformation.update({
      where: {
        nojs: nojs,
      },
      data: datas.siteInformation,
    });

    // Update site info detail
    await prisma.siteInfoDetail.update({
      where: {
        nojsSite: nojs,
      },
      data: datas.siteInfoDetail,
    });

    return true;
  } catch (error) {
    console.error("Error updating site information:", error);
    return false;
  }
};

const deleteSiteInformation = async (nojs) => {
  try {
    await prisma.siteInformation.delete({
      where: {
        nojs: nojs,
      },
    });

    return true;
  } catch (error) {
    console.error("Error deleting site information:", error);
    return false;
  }
};

export {
  selectAll,
  selectSite,
  findNoJS,
  insertSiteInformation,
  updateSiteInformation,
  deleteSiteInformation,
};
