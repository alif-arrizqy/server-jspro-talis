import prisma from "../app.js";
import moment from "moment-timezone";
import { bmsLoggersNull, bmsCellNull } from "../helpers/nullValue.js";
import { tsFormatter } from "../helpers/timestampFormatter.js";

const findId = async () => {
  try {
    return await prisma.bmsCellVoltage.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Error finding id:", error);
    return false;
  }
};

// insert for first data
const firstDataNullBmsCellVoltage = async () => {
  try {
    return await prisma.bmsCellVoltage.create({
      data: { ...bmsCellNull },
    });
  } catch (error) {
    console.error("Error inserting null bmsCellVoltage data:", error);
    return false;
  }
};

// insert for logger data is null
const insertNullBmsLogger = async (nojsSite) => {
  try {
    return await prisma.bmsLoggers.create({
      data: {
        ...bmsLoggersNull,
        ts: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
        siteInformation: {
          connect: { nojs: nojsSite },
        },
        bmsCellVoltage: {
          connect: { id: 1 },
        },
      },
    });
  } catch (error) {
    console.error("Error inserting null bmsLogger data:", error);
    return false;
  }
};

const insertBmsCellVoltage = async (talisCell) => {
  try {
    return await prisma.bmsCellVoltage.create({
      data: talisCell,
      select: { id: true },
    });
  } catch (error) {
    console.error("Error inserting bmsCellVoltage data:", error);
    throw new Error("Failed to insert bmsCellVoltage data");
  }
};

const insertBmsLogger = async (talisLogger, nojsSite, cellVoltageId) => {
  try {
    return await prisma.bmsLoggers.create({
      data: {
        ...talisLogger,
        ts: tsFormatter(talisLogger.ts),
        nojsSite,
        cellVoltageId,
      },
    });
  } catch (error) {
    console.error("Error inserting bmsLogger data:", error);
    throw new Error("Failed to insert bmsLogger data");
  }
};

export {
  findId,
  firstDataNullBmsCellVoltage,
  insertNullBmsLogger,
  insertBmsCellVoltage,
  insertBmsLogger,
};
