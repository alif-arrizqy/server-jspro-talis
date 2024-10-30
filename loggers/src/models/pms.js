import prisma from "../app.js";
import moment from "moment-timezone";
import { tsFormatter } from "../helpers/timestampFormatter.js";
import { pmsLoggersNull, pmsCellNull } from "../helpers/nullValue.js";

const findPvId = async () => {
  try {
    return await prisma.pv.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Error finding pv id:", error);
    return false;
  }
};

const findEnergyId = async () => {
  try {
    return await prisma.energy.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Error finding energy id:", error);
    return false;
  }
};

const firstDataNullPv = async () => {
  try {
    return await prisma.pv.create({
      data: {
        pv1Curr: null,
        pv1Volt: null,
        pv2Curr: null,
        pv2Volt: null,
        pv3Curr: null,
        pv3Volt: null,
      },
    });
  } catch (error) {
    console.error("Error inserting null pv data:", error);
    return false;
  }
};

const firstDataNullEnergy = async () => {
  try {
    return await prisma.energy.create({
      data: {
        edl1: null,
        edl2: null,
        edl3: null,
        eh1: null,
        eh2: null,
        eh3: null,
      },
    });
  } catch (error) {
    console.error("Error inserting null energy data:", error);
    return false;
  }
};

const checkPv = async () => {
  try {
    return await prisma.pv.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Error Check PV data:", error);
    return false;
  }
};

const checkEnergy = async () => {
  try {
    return await prisma.energy.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Error Check Energy data:", error);
    return false;
  }
};

const insertPvNull = async () => {
  try {
    const pv = await prisma.pv.create({
      data: {
        pv1Curr: null,
        pv1Volt: null,
        pv2Curr: null,
        pv2Volt: null,
        pv3Curr: null,
        pv3Volt: null,
      },
    });
    return { status: "success", pvId: pv.id, energyId: energy.id };
  } catch (error) {
    console.error("Error inserting PV data:", error);
    return false;
  }
};

const insertEnergyNull = async () => {
  try {
    return await prisma.energy.create({
      data: {
        edl1: null,
        edl2: null,
        edl3: null,
        eh1: null,
        eh2: null,
        eh3: null,
      },
    });
  } catch (error) {
    console.error("Error inserting Energy data:", error);
    return false;
  }
};

const insertPmsLoggersNull = async (nojsSite) => {
  try {
    return await prisma.pmsLoggers.create({
      data: {
        ...pmsLoggersNull,
        ts: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
        nojsSite: nojsSite,
      },
    });
  } catch (error) {
    console.error("Error inserting null pmsLogger data:", error);
    return false;
  }
};

const insertPmsCellNull = async (nojsSite) => {
  try {
    return await prisma.pmsCell.create({
      data: {
        ...pmsCellNull,
        ts: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
        nojsSite: nojsSite,
      },
    });
  } catch (error) {
    console.error("Error inserting null pms cell data:", error);
    return false;
  }
};

const insertPvAndGetIdPv = async (element) => {
  try {
    const pv = await prisma.pv.create({
      data: element,
      select: { id: true },
    });
    return pv.id;
  } catch (error) {
    console.error("Error Insert and Get Id Pv:", error);
    return false;
  }
};

const insertEnergyAndGetIdEnergy = async (element) => {
  try {
    const energy = await prisma.energy.create({
      data: element,
      select: { id: true },
    });
    return energy.id;
  } catch (error) {
    console.error("Error Insert and Get Id Energy:", error);
    return false;
  }
};

const insertPmsCellAndGetIdPmsCell = async (validData, nojsSite) => {
  try {
    await Promise.all(
      validData.data.pmsCell.map(async (element, key) => {
        try {
          element.map(async (el) => {
            await prisma.pmsCell.create({
              data: {
                ...el,
                nojsSite: nojsSite,
              },
            });
            // await LoggersPms.insertPmsCellAndGetIdPmsCell(el);
          });
        } catch (error) {
          console.error(`Failed to insert data for pmsCell: ${element}`, error);
          throw new Error("Failed to insert data for pmsCell");
        }
      })
    );
  } catch (error) {
    console.error("Error Insert Pms Cell :", error);
    return false;
  }
};

const insertPmsLoggers = async (validData, nojsSite, pvIds, energyIds) => {
  try {
    await prisma.pmsLoggers.createMany({
      data: validData.data.pmsLoggers.map((val, key) => {
        return {
          ...val,
          ts: tsFormatter(val.ts),
          nojsSite: nojsSite,
          pvId: pvIds[key],
          energyId: energyIds[key],
        };
      }),
    });
  } catch (error) {
    console.error("Error Insert Pms Loggers :", error);
    return false;
  }
};

export {
  findPvId,
  findEnergyId,
  firstDataNullPv,
  firstDataNullEnergy,
  checkPv,
  checkEnergy,
  insertPvNull,
  insertEnergyNull,
  insertPmsLoggersNull,
  insertPmsCellNull,
  insertPvAndGetIdPv,
  insertEnergyAndGetIdEnergy,
  insertPmsCellAndGetIdPmsCell,
  insertPmsLoggers,
};
