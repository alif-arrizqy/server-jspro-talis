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

    // filter duplicate data
    const seen = new Set();
    const result = fetchAll.filter((item) => {
      const duplicate = seen.has(item.ts);
      seen.add(item.ts);
      return !duplicate;
    });

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { fetchAllDataSla };
