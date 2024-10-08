import prisma from "../app.js";

const fetchAllDataSla = async (dateTime, nojs) => {
  try {
    const fetchAll = await prisma.pmsLoggers.findMany({
      where: {
        nojsSite: nojs,
        ts: {
          gte: dateTime.start,
          lte: dateTime.end,
        },
        energyId: {
          not: 1,
        },
        pvId: {
          not: 1,
        },
      },
      include: {
        energy: true,
        pv: true,
      },
      orderBy: {
        ts: "asc",
      },
    });

    const siteInfo = await prisma.siteInfoDetail.findUnique({
      where: {
        nojsSite: nojs,
      },
      include: {
        siteInformation: {
          select: {
            nojs: true,
            siteName: true,
          },
        },
      },
    });

    // filter duplicate data
    const seen = new Set();
    const result = fetchAll.filter((item) => {
      const duplicate = seen.has(item.ts);
      seen.add(item.ts);
      return !duplicate;
    });

    // add siteInfo to each item in result
    const resultWithSiteInfo = result.map((item) => ({
      lc: siteInfo.lc,
      gs: siteInfo.gs,
      siteName: siteInfo.siteInformation.siteName,
      ...item
    }));

    return resultWithSiteInfo;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { fetchAllDataSla };
