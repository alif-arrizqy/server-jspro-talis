import { fetchAllDataSla } from "../models/index.js";
import * as ResponseHelper from "../helpers/responseHelper.js";
import { calculateDataSLA1, calculateDataSLA2 } from "../helpers/slaCalculation.js";

const sla1 = async (req, res) => {
  try {
    let dateTime;
    const {nojs, start, end} = req.query;
    if (!nojs) {
      return res.status(404).json(ResponseHelper.errorMessage("Nojs Not Found", 404));
    }

    dateTime = { start, end }
    const fetchSla = await fetchAllDataSla(dateTime, nojs);
    const responseCalculate = calculateDataSLA1(fetchSla, dateTime);
    const response = {
      nojs: fetchSla.nojs,
      site: fetchSla.site,
      lc: fetchSla.lc,
      ...responseCalculate.avg
    }
    return res.status(200).json(ResponseHelper.successData(response, 200));
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseHelper.errorMessage("Internal Server Error", 500));
  }
}

export { sla1 };
