import { fetchAllDataSla } from "../models/index.js";
import * as ResponseHelper from "../helpers/responseHelper.js";
import { calculateDataSLA1, calculateDataSLA2 } from "../helpers/slaCalculation.js";
import compareDates from "../helpers/dateValidation.js";

const sla = async (req, res) => {
  try {
    let dateTime;
    const {nojs, start, end, daily} = req.query;

    if (!nojs) {
      return res.status(404).json(ResponseHelper.errorMessage("Nojs Not Found", 404));
    }

    // start date and end date validation
    const checkDate = compareDates(start, end);
    if (!checkDate) {
      return res.status(400).json(ResponseHelper.errorMessage("Invalid Date", 400));
    }

    dateTime = { start, end }
    const fetchSla = await fetchAllDataSla(dateTime, nojs);
    
    // SLA 1
    if (!daily) {
      const responseCalculate = calculateDataSLA1(fetchSla, dateTime);
      const response = {
        nojs: fetchSla[0].nojsSite,
        site: fetchSla[0].siteName,
        lc: fetchSla[0].lc,
        ...responseCalculate.avg,
      }
      return res.status(200).json(ResponseHelper.successData(response, 200));
    } else {
      // SLA 2
      const responseCalculate = calculateDataSLA2(fetchSla, dateTime, nojs);
      return res.status(200).json(ResponseHelper.successData(responseCalculate, 200));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseHelper.errorMessage("Internal Server Error", 500));
  }
};

export { sla };
