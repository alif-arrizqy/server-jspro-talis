import * as ResponseHelper from "../../helpers/responseHelper.js";
import validateTalisLoggers from "../../helpers/validationSchema/talisValidation.js";
import { fetchLoggerTalis, deleteLoggerTalis } from "../../helpers/fetchApiHelper.js";
import * as Loggers from "../../models/talis.js";

const handleDeleteLogger = async (ip, tsArray) => {
  const deleteResults = [];

  try {
    await Promise.all(
      tsArray.map(async (ts) => {
        try {
          const deleteResponse = await deleteLoggerTalis(ip, ts);

          if (deleteResponse === null) {
            console.log(`No response received from server for ts: ${ts}`);
          } else if (deleteResponse.code === 200) {
            console.log(`Talis logger data for ts: ${ts} deleted successfully`);
            deleteResults.push(ts);
          } else {
            console.log(`Failed to delete talis logger data for ts: ${ts}`);
          }
        } catch (error) {
          console.error(
            `Error deleting talis logger data for ts: ${ts}`,
            error
          );
        }
      })
    );
  } catch (error) {
    console.error("Error in handleDeleteLogger:", error);
  }

  return deleteResults;
};

const createFirstDataTalis = async () => {
  try {
    // check if id 1 is already exists
    const cellId = await Loggers.findIdCell();
    const mpptId = await Loggers.findIdMppt();

    if (cellId && mpptId) {
      console.log("Data already exists");
      return ResponseHelper.errorMessage("Data already exists", 400);
    }

    // create first data
    await Loggers.firstDataNullBmsCellVoltage();
    await Loggers.firstDataNullMpptLogger();

    return ResponseHelper.successMessage(
      "First data created successfully",
      201
    );
  } catch (error) {
    console.error("Error in createFirstDataTalis:", error);
    return ResponseHelper.errorMessage("Failed to create first data", 500);
  }
};

const createTalisLoggers = async (nojsSite, ip) => {
  try {
    // const loggerData = await fetchLoggerTalis(ip);
    const loggerData = {
      code: 200,
      data: {
        mppt: [
          {
            batt_volt: 5384,
            cpu_temp: 55.8,
            edl1: -47.3,
            edl2: -219.7,
            edl3: 0,
            eh1: 7.199999999999989,
            eh2: 0,
            load1: 1.79,
            load2: 8.81,
            load3: 0,
            pv1_curr: 20.73,
            pv1_volt: 56.63,
            pv2_curr: 22.52,
            pv2_volt: 56.76,
            ts: "20241114T111433",
          },
        ],
        usb0: [
          {
            ambient_temperature: 334,
            average_cell_temperature: 307,
            cell_difference: 2,
            cell_temperature: [309, 305, 307],
            cell_voltage: [
              3324, 3324, 3322, 3322, 3322, 3322, 3322, 3322, 3322, 3322, 3323,
              3322, 3322, 3322, 3322, 3322,
            ],
            counter: 18,
            cycle_count: 6,
            environment_temperature: 334,
            error_messages: [
              "Pack voltage 5315 below limit 5325",
              "Max cell voltage 3324 exceeds limit 425 at indices [0, 1]",
              "Min cell voltage 3322 exceeds limit 375 at indices [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15]",
              "Cell difference 2 below limit 5",
              "Max cell temperature 309 exceeds limit 240 at indices [0]",
              "Min cell temperature 305 exceeds limit 230 at indices [1]",
              "FET temperature 317 exceeds limit 250",
            ],
            fault_status_flag: [
              "state of charge",
              "charge Mosfet ON",
              "discharge Mosfet ON",
              "charge limit current function is ON",
            ],
            fet_temperature: 317,
            full_charged_capacity: 108,
            max_cell_temperature: 309,
            max_cell_voltage: 3324,
            min_cell_temperature: 305,
            min_cell_voltage: 3322,
            pack_current: 45,
            pack_voltage: 5315,
            pcb_code: "TBI23122400196",
            port: "usb0",
            protection_flag: ["no alarm detected"],
            remaining_capacity: 78,
            remaining_charge_time: 392,
            remaining_discharge_time: 65535,
            slave_id: 6,
            sn1_code: "AO67950037",
            soc: 7270,
            soh: 10000,
            ts: "20241114T111433",
            warning_flag: ["no alarm detected"],
          },
        ],
        usb1: [
          {
            ambient_temperature: 334,
            average_cell_temperature: 310,
            cell_difference: 3,
            cell_temperature: [311, 310, 310],
            cell_voltage: [
              3324, 3322, 3322, 3322, 3323, 3325, 3323, 3323, 3323, 3324, 3323,
              3324, 3325, 3323, 3323, 3324,
            ],
            counter: 0,
            cycle_count: 6,
            environment_temperature: 334,
            error_messages: [
              "Pack voltage 5317 below limit 5325",
              "Max cell voltage 3325 exceeds limit 425 at indices [5, 12]",
              "Min cell voltage 3322 exceeds limit 375 at indices [1, 2, 3]",
              "Cell difference 3 below limit 5",
              "Max cell temperature 311 exceeds limit 240 at indices [0]",
              "Min cell temperature 310 exceeds limit 230 at indices [1, 2]",
              "FET temperature 319 exceeds limit 250",
            ],
            fault_status_flag: [
              "state of charge",
              "charge Mosfet ON",
              "discharge Mosfet ON",
              "charge limit current function is ON",
            ],
            fet_temperature: 319,
            full_charged_capacity: 108,
            max_cell_temperature: 311,
            max_cell_voltage: 3325,
            min_cell_temperature: 310,
            min_cell_voltage: 3322,
            pack_current: 35,
            pack_voltage: 5317,
            pcb_code: "TBI24032702974",
            port: "usb1",
            protection_flag: ["no alarm detected"],
            remaining_capacity: 106,
            remaining_charge_time: 33,
            remaining_discharge_time: 65535,
            slave_id: 1,
            sn1_code: "AO67950130",
            soc: 9815,
            soh: 10000,
            ts: "20241114T111433",
            warning_flag: ["no alarm detected"],
          },
        ],
      },
      message: "Success",
    };
    
    if (loggerData === null) {
      console.log("No response received from server");
      // return ResponseHelper.errorMessage("No response received from server", 404);

      try {
        // Insert null data
        await Loggers.insertNullBmsLogger(nojsSite);

        return ResponseHelper.successMessage("Talis loggers with null values created successfully", 201);
      } catch (error) {
        console.error("Error inserting talis loggers data:", error);
        return ResponseHelper.errorMessage("Failed to insert talis loggers data", 500);
      }
    }

    const validatedData = await validateTalisLoggers(loggerData.data);
    // if (!validatedData.every((data) => data.status === "success")) {
    //   console.log("Some data failed to validate");
    //   const failedData = validatedData.filter((data) => data.status === "failed");
    //   console.log("failed validate data:", failedData);
    //   return ResponseHelper.errorMessage("Failed to validate talis loggers", 500);
    // }

    // // Insert Mppt Loggers
    let mpptLoggerId;
    try {
      const mpptLoggerInsertions = await Promise.all(
        validatedData.map(async (element) => {
          // if (element.mpptLogger) {
          //   const response = await Loggers.insertMpptLogger(element.mpptLogger);
          //   return response.id; // Return the ID if insertion is successful
          // }
          // return null; // Return null if no mpptLogger

          // Check if mpptLogger is undefined or {}
          if (element.mpptLogger && Object.keys(element.mpptLogger).length > 0) {
            const response = await Loggers.insertMpptLogger(element.mpptLogger);
            console.log(response.id);
            return response.id; // Return the ID if insertion is successful
          } else {
            return 1; // Return 1 if no mpptLogger
          }
        })
      );
      // return mpptLoggerId;
    } catch (error) {
      console.error("Error inserting mpptLogger data:", error);
      return ResponseHelper.errorMessage("Failed to insert mpptLogger data", 500);
    }

    const tsArray = [];
    const results = await Promise.all(
      validatedData.map(async (element) => {
        try {
          console.log(mpptLoggerId);

          // // Insert BMS Cell Voltage and return id BMS Cell Voltage
          // let bmsCellId;
          // if (element.talisCell) {
          //   const response = await Loggers.insertBmsCellVoltage(element.talisCell);
          //   bmsCellId = response.id;
          // }
          
          // if (mpptLoggerId && bmsCellId) {
          //   // Insert Talis Loggers
          //   const insertTalisLogger = await Loggers.insertBmsLogger(
          //     element.talisLogger,
          //     nojsSite,
          //     bmsCellId,
          //     mpptLoggerId
          //   );
  
          //   if (!insertTalisLogger) {
          //     console.log(`nojsSite: ${nojsSite} - ts: ${element.talisLogger.ts} - Failed to create talis logger data`);
          //     return ResponseHelper.errorMessage("Failed to create talis logger data", 500);
          //   }
  
          //   // Add ts to tsArray if not already present
          //   if (!tsArray.includes(element.talisLogger.ts)) {
          //     tsArray.push(element.talisLogger.ts);
          //   }
  
          //   return null; // Return null for successful creation
          // }
        } catch (error) {
          console.error(`nojsSite: ${nojsSite} Error creating talis logger data:`, error);
          return ResponseHelper.errorMessage("Failed to process talis logger data", 500);
        }
      })
    );

    // // Handle deletion of loggers
    // const deleteResults = await handleDeleteLogger(ip, tsArray);

    // if (deleteResults.length > 0) {
    //   console.log(`Talis loggers for NoJS: ${nojsSite} - ts: ${deleteResults} created and deleted successfully`);
    //   return ResponseHelper.successMessage("Talis loggers created and delete successfully", 201);
    // }
  } catch (error) {
    console.error("Error in createTalisLoggers:", error);
    return ResponseHelper.errorMessage("Failed to create talis loggers", 500);
  }
};

export { createTalisLoggers, createFirstDataTalis };
