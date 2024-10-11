import axios from "axios";
import { fetchAllDataSla } from "../models/index.js";
import * as ResponseHelper from "../helpers/responseHelper.js";
import { calculateDataSLA1, calculateDataSLA2 } from "../helpers/slaCalculation.js";
import compareDates from "../helpers/dateValidation.js";
import { monthFormater } from "../helpers/slaHelper.js";
import download from "../helpers/slaExport.js";

/**
 * @swagger
 * /v1/api/sla1:
 *   get:
 *     summary: Retrieve SLA 1 data
 *     description: Retrieve SLA 1 data based on the provided parameters.
 *     parameters:
 *       - in: query
 *         name: nojs
 *         schema:
 *           type: string
 *         required: true
 *         description: nojs site
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: The start date and time
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: The end date and time
 *     responses:
 *       200:
 *         description: SLA 1 data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessSLA1'
 *       400:
 *         description: Invalid Date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
const sla1 = async (req, res) => {
  try {
    let dateTime;
    const {nojs, start, end} = req.query;

    if (!nojs) {
      return res.status(404).json(ResponseHelper.errorMessage("Nojs Not Found", 404));
    }

    // start date and end date validation
    const checkDate = compareDates(start, end);
    if (!checkDate) {
      return res.status(400).json(ResponseHelper.errorMessage("Invalid Date", 400));
    }

    // fetching data pmsLoggers and siteInformation from DB
    dateTime = { start, end }
    const fetchSla = await fetchAllDataSla(dateTime, nojs);
    // if fetchSla is empty
    if (fetchSla.length === 0) {
      return res.status(404).json(ResponseHelper.errorMessage("SLA Data Not Found", 404));
    }

    const responseCalculate = calculateDataSLA1(fetchSla, dateTime);
    const response = {
      nojs: fetchSla[0].nojsSite,
      site: fetchSla[0].siteName,
      lc: fetchSla[0].lc,
      ...responseCalculate.avg,
    }
    return res.status(200).json(ResponseHelper.successData(response, 200));
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseHelper.errorMessage("Internal Server Error", 500));
  }
};

/**
 * @swagger
 * /v1/api/sla2:
 *   get:
 *     summary: Retrieve SLA 2 data
 *     description: Retrieve SLA 2 data based on the provided parameters.
 *     parameters:
 *       - in: query
 *         name: nojs
 *         schema:
 *           type: string
 *         required: true
 *         description: nojs site
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: The start date and time
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: The end date and time
 *     responses:
 *       200:
 *         description: SLA 2 data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessSLA2'
 *       400:
 *         description: Invalid Date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
const sla2 = async (req, res) => {
  try {
    let dateTime;
    const {nojs, start, end} = req.query;

    if (!nojs) {
      return res.status(404).json(ResponseHelper.errorMessage("Nojs Not Found", 404));
    }

    // start date and end date validation
    const checkDate = compareDates(start, end);
    if (!checkDate) {
      return res.status(400).json(ResponseHelper.errorMessage("Invalid Date", 400));
    }

    // fetching data pmsLoggers and siteInformation from DB
    dateTime = { start, end }
    const fetchSla = await fetchAllDataSla(dateTime, nojs);
    // if fetchSla is empty
    if (fetchSla.length === 0) {
      return res.status(404).json(ResponseHelper.errorMessage("SLA Data Not Found", 404));
    }

    // Calculate SLA 2
    const responseCalculate = calculateDataSLA2(fetchSla, dateTime, nojs);

    return res.status(200).json(ResponseHelper.successData(responseCalculate, 200));
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseHelper.errorMessage("Internal Server Error", 500));
  }
};

/**
 * @swagger
 * /v1/api/sla3:
 *   get:
 *     summary: Retrieve SLA 3 data
 *     description: Retrieve SLA 3 data based on the provided parameters and export as an Excel file.
 *     parameters:
 *       - in: query
 *         name: nojs
 *         schema:
 *           type: string
 *         required: true
 *         description: nojs site
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: The start date and time
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: The end date and time
 *     responses:
 *       200:
 *         description: File exported successfully and ready for download
 *       400:
 *         description: Invalid Date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
const sla3Export = async (req, res) => {
  try {
    const { nojs, start, end } = req.query;
    
    if (!nojs) {
      return res.status(404).json(ResponseHelper.errorMessage("Nojs Not Found", 404));
    }

    // start date and end date validation
    const checkDate = compareDates(start, end);
    if (!checkDate) {
      return res.status(400).json(ResponseHelper.errorMessage("Invalid Date", 400));
    }

    // fetching alarm data from grafana DB 
    const apiURL = process.env.MULTIPLE_BE;
    const apiResponse = await axios.get(
      `${apiURL}/getFilteredHistory?nojs=${nojs}&start=${start}&end=${end}`
    );
    const apiData = apiResponse.data;
    // if length of apiData is 0
    if (apiData.length === 0) {
      return res.status(404).json(ResponseHelper.errorMessage("Alarm Data Not Found", 404));
    }

    // fetching data pmsLoggers and siteInformation from DB
    const dateTime = { start, end };
    const fetchSla = await fetchAllDataSla(dateTime, nojs);
    // if fetchSla is empty
    if (fetchSla.length === 0) {
      return res.status(404).json(ResponseHelper.errorMessage("SLA Data Not Found", 404));
    }

    // Calculate SLA
    const responseCalculate = calculateDataSLA1(fetchSla, dateTime);

    // find the nearest date and update flagStatus
    const slaData = findNearestDate(apiData, responseCalculate);

    // create object response
    // const wb = {
    //     log: slaData.log,
    //   site: fetchSla[0].siteName,
    //   uptime: responseCalculate.duration,
    //   sumVolt: responseCalculate.sumBattVolt,
    //   date: monthFormater(start),
    //   v3: isV3 === "true",
    // }
    // return res.status(200).json(ResponseHelper.successData(wb, 200));
    
    // Create the Excel file (workbook)
    const wb = download({
      log: slaData.log,
      site: fetchSla[0].siteName,
      uptime: responseCalculate.duration,
      sumVolt: responseCalculate.sumBattVolt,
      date: monthFormater(start),
    })

    // Set headers for the file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fetchSla[0].siteName}.xlsx`
    );

    // Write the workbook to the response and send a success response
    await wb.xlsx.write(res).then(() => {
      return res.status(200).json(ResponseHelper.successMessage("Excel file exported successfully", 200));
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseHelper.errorMessage("Internal Server Error", 500));
  }
};

const findNearestDate = (apiData, slaData) => {
  if (!apiData || !apiData.data || !slaData || !slaData.log) {
    return slaData; // Return the original data if either apiData or slaData is missing
  }

  const maxDifference = 3 * 60 * 1000; // 2 minutes in milliseconds

  slaData.log.forEach((logEntry) => {
    let nearestFlag = null;
    let smallestDiff = Infinity;

    const logTs = new Date(logEntry.ts).getTime(); // Convert SLA timestamp to milliseconds

    // Find the nearest date in apiData, but limit to 3 minutes difference
    apiData.data.forEach((apiEntry) => {
      const apiDate = new Date(apiEntry.date).getTime();
      const diff = Math.abs(logTs - apiDate); // Calculate the time difference

      // Check if the difference is within the 3-minute window and is smaller than the current smallest difference
      if (diff < smallestDiff && diff <= maxDifference) {
        smallestDiff = diff;
        nearestFlag = apiEntry.flag;
      }
    });

    // If a nearest flag is found within 3minutes, update the flagStatus in slaData
    if (nearestFlag) {
      logEntry.flagStatus = nearestFlag;
    }
  });

  return slaData;
} 

export { sla1, sla2, sla3Export };
