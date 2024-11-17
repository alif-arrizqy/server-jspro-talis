import z from "zod";
import { talisLoggersFormatter, mpptLoggersFormatter } from "../../helpers/databaseFormatter.js";

const taliSchemas = z.object({
  ts: z.string(),
  slaveId: z.number(),
  port: z.string(),
  errorMessages: z.array(z.string()).optional(),
  pcbCode: z.string(),
  sn1Code: z.string().optional(),
  packVoltage: z.number(),
  packCurrent: z.number(),
  remainingCapacity: z.number(),
  averageCellTemperature: z.number(),
  environmentTemperature: z.number(),
  warningFlag: z.array(z.string()),
  protectionFlag: z.array(z.string()),
  faultStatus: z.array(z.string()),
  soc: z.number(),
  soh: z.number(),
  fullChargedCapacity: z.number(),
  cycleCount: z.number(),
  maxCellVoltage: z.number(),
  minCellVoltage: z.number(),
  cellDifference: z.number(),
  maxCellTemperature: z.number(),
  minCellTemperature: z.number(),
  fetTemperature: z.number(),
  cellTemperature1: z.number(),
  cellTemperature2: z.number(),
  cellTemperature3: z.number(),
  ambientTemperature: z.number(),
  remainingChargeTime: z.number(),
  remainingDischargeTime: z.number(),
});

const talisCellSchemas = z.object({
  cell1: z.number().optional(),
  cell2: z.number().optional(),
  cell3: z.number().optional(),
  cell4: z.number().optional(),
  cell5: z.number().optional(),
  cell6: z.number().optional(),
  cell7: z.number().optional(),
  cell8: z.number().optional(),
  cell9: z.number().optional(),
  cell10: z.number().optional(),
  cell11: z.number().optional(),
  cell12: z.number().optional(),
  cell13: z.number().optional(),
  cell14: z.number().optional(),
  cell15: z.number().optional(),
  cell16: z.number().optional(),
});

const mpptSchemas = z.object({
  ts: z.string(),
  battVolt: z.number().nullable(),
  cpuTemp: z.number().nullable(),
  load1: z.number().nullable(),
  load2: z.number().nullable(),
  load3: z.number().nullable(),
  pv1Volt: z.number().nullable(),
  pv2Volt: z.number().nullable(),
  pv3Volt: z.number().nullable(),
  pv1Curr: z.number().nullable(),
  pv2Curr: z.number().nullable(),
  pv3Curr: z.number().nullable(),
  edl1: z.number().nullable(),
  edl2: z.number().nullable(),
  edl3: z.number().nullable(),
  eh1: z.number().nullable(),
  eh2: z.number().nullable(),
  eh3: z.number().nullable(),
});

const validateTalisLoggers = async (datas) => {
  try {
    // merge usb0 and usb1 data
    const USB0 = datas.usb0;
    const USB1 = datas.usb1;
    const MPPT = datas.mppt;

    // merge usb0 and usb1 data
    const mergedData = USB0.concat(USB1);

    const parsedData = await talisLoggersFormatter(mergedData);
    const parsedMPPT = await mpptLoggersFormatter(MPPT);
    
    // validate talis loggers
    const talisResults = parsedData.map((el) => {
      const validLogger = taliSchemas.safeParse(el.talis);
      const validCell = talisCellSchemas.safeParse(el.talisCellPack);
      return {
        status: validLogger.success && validCell.success ? "success" : "failed",
        talisLogger: validLogger.data,
        talisCell: validCell.data,
        errors: {
          loggerErrors: validLogger.error || null,
          cellErrors: validCell.error || null,
        },
      };
    });

    // Validate MPPT loggers
    // const mpptResults = parsedMPPT.map((el) => {
    //   const validMPPT = mpptSchemas.safeParse(el.mppt);
    //   return {
    //     status: validMPPT.success ? "success" : "failed",
    //     mpptLogger: validMPPT.data,
    //     errors: {
    //       mpptLoggerErrors: validMPPT.error || null,
    //     },
    //   };
    // });
    // Handling parsedMPPT is empty list
    const mpptResults = parsedMPPT.length > 0 ? parsedMPPT.map((el) => {
      const validMPPT = mpptSchemas.safeParse(el.mppt);
      return {
        status: validMPPT.success ? "success" : "failed",
        mpptLogger: validMPPT.data,
        errors: {
          mpptLoggerErrors: validMPPT.error || null,
        },
      };
    }) : [{
      status: "success",
      mpptLogger: {},
    }];

    // Combine both results
    return [...talisResults, ...mpptResults];
  } catch (error) {
    console.error("Error validating talis loggers:", error);
    return { status: "error" };
  }
};

export default validateTalisLoggers;
