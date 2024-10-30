import * as ResponseHelper from "../../helpers/responseHelper.js";
import validatePmsLoggers from "../../helpers/validationSchema/pmsValidation.js";
import { fetchLogger, deleteLogger } from "../../helpers/fetchApiHelper.js";
import * as LoggersPms from "../../models/pms.js";

const createFirstDataPms = async () => {
  try {
    // check if id 1 is already exists
    const checkPv = await LoggersPms.checkPv();

    // const checkEnergy = await prisma.energy.findUnique({
    const checkEnergy = await LoggersPms.checkEnergy();

    if (checkPv === null && checkEnergy === null) {
      // insert pv
      await LoggersPms.insertPvNull();

      // insert energy
      await LoggersPms.insertEnergyNull();
      return ResponseHelper.successMessage(
        "First data pms created successfully",
        201
      );
    } else {
      console.log("First data already exists");
      return { status: "error", message: "First data already exists" };
    }
  } catch (error) {
    console.error("Error in fetching first data", error);
    return null;
  }
};

const createPmsLoggers = async (nojsSite, ip) => {
  try {
    const loggerData = await fetchLogger(ip);

    if (loggerData === null) {
      console.log("No response received from server");

      // insert pms loggers
      try {
        await LoggersPms.insertPmsCellNull(nojsSite);
        await LoggersPms.insertPmsLoggersNull(nojsSite);

        console.log("PmsLoggers with null values inserted successfully");
        return ResponseHelper.successMessage(
          "Pms loggers with null value created successfully",
          201
        );
      } catch (error) {
        console.error("Error in inserting pmsLoggers data:", error);
        return ResponseHelper.errorMessage(
          "Failed to insert pmsLoggers data",
          500
        );
      }
    }

    const validData = await validatePmsLoggers(loggerData.data);

    if (validData.status === "error") {
      return ResponseHelper.errorMessage("Failed to validated data", 400);
    }

    // insert pv and get id pv
    const pvIds = await Promise.all(
      validData.data.pv.map(async (element) => {
        await LoggersPms.insertPvAndGetIdPv(element);
      })
    );

    // insert energy and get id energy
    const energyIds = await Promise.all(
      validData.data.energy.map(async (element) => {
        await LoggersPms.insertEnergyAndGetIdEnergy(element);
      })
    );

    // insert pms cell and get id pms cell
    try {
      await LoggersPms.insertPmsCellAndGetIdPmsCell(validData, nojsSite);
      console.log("All pmsCell data inserted successfully");
    } catch (error) {
      console.error("Error in inserting pmsCell data:", error);
      return ResponseHelper.errorMessage("Failed to insert pmsCell data", 500);
    }

    // insert pms loggers
    try {
      await LoggersPms.insertPmsLoggers(validData, nojsSite, pvIds, energyIds);
      console.log("All pmsLoggers data inserted successfully");

      // delete logger
      const deleteLoggerResults = await Promise.all(
        validData.data.pmsLoggers.map(async (val) => {
          try {
            const deleteLoggerData = await deleteLogger(ip, val.ts);
            if (deleteLoggerData === null) {
              console.log(
                `No response received from server for NoJS: ${nojsSite} ts: ${val.ts}`
              );
              return ResponseHelper.errorMessage(
                "No response received from server",
                404
              );
            } else if (deleteLoggerData.code === 200) {
              console.log(
                `PMS loggers for NoJS: ${nojsSite} - ts: ${val.ts} created and deleted successfully`
              );
              return ResponseHelper.successMessage(
                "Pms loggers created and deleted successfully",
                201
              );
            } else {
              console.log(`Failed to delete logger for ts: ${val.ts}`);
              return ResponseHelper.errorMessage(
                "Failed to delete logger",
                500
              );
            }
          } catch (error) {
            console.error(
              `Error in deleting logger data for ts: ${val.ts}`,
              error
            );
            return ResponseHelper.errorMessage(
              "Failed to delete logger data",
              500
            );
          }
        })
      );

      // Check if any deleteLoggerResults contains an error message
      const hasError = deleteLoggerResults.some(
        (result) => result.status === "error"
      );
      if (hasError) {
        console.error(`PMS loggers for NoJS: ${nojsSite} failed to delete`);
        return ResponseHelper.errorMessage(
          "Some loggers failed to delete",
          500
        );
      }
    } catch (error) {
      console.error("Error in inserting pmsLoggers data:", error);
      return ResponseHelper.errorMessage(
        "Failed to insert pmsLoggers data",
        500
      );
    }
  } catch (error) {
    console.log(error);
    return ResponseHelper.errorMessage("Failed to create pms loggers", 500);
  }
};

export { createFirstDataPms, createPmsLoggers };
