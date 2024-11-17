import prisma from "../app.js";
import moment from "moment-timezone";
import { bmsLoggersNull, bmsCellNull, mpptLoggersNull } from "../helpers/nullValue.js";
import { tsFormatter } from "../helpers/timestampFormatter.js";

const findIdCell = async () => {
  try {
    return await prisma.bmsCellVoltage.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Error finding id BMS Cell Voltage:", error);
    return false;
  }
};

const findIdMppt = async () => {
  try {
    return await prisma.mpptLoggers.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Error finding id MPPT Loggers:", error);
    return false;
  }
}

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

const firstDataNullMpptLogger = async () => {
  try {
    return await prisma.mpptLoggers.create({
      data: { ...mpptLoggersNull },
    });
  } catch (error) {
    console.error("Error inserting null mpptLogger data:", error);
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

const insertMpptLogger = async (mpptLogger) => {
  try {
    return await prisma.mpptLoggers.create({
      data: {
        ...mpptLogger,
        ts: tsFormatter(mpptLogger.ts),
      },
      select: { id: true },
    });
  } catch (error) {
    console.error("Error inserting mpptLogger data:", error);
    throw new Error("Failed to insert mpptLogger data");
  }
}

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

const insertBmsLogger = async (talisLogger, nojsSite, cellVoltageId, mpptLoggersId) => {
  try {
    return await prisma.bmsLoggers.create({
      data: {
        ...talisLogger,
        ts: tsFormatter(talisLogger.ts),
        nojsSite,
        cellVoltageId,
        mpptLoggersId
      },
    });
  } catch (error) {
    console.error("Error inserting bmsLogger data:", error);
    throw new Error("Failed to insert bmsLogger data");
  }
};

export {
  findIdCell,
  findIdMppt,
  firstDataNullBmsCellVoltage,
  insertNullBmsLogger,
  firstDataNullMpptLogger,
  insertMpptLogger,
  insertBmsCellVoltage,
  insertBmsLogger,
};
