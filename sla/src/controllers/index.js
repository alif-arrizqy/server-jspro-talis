import { fetchAllDataSla } from "../models/index.js";
import * as ResponseHelper from "../helpers/responseHelper.js";
import { slaFormatter } from "../helpers/slaFormatter.js";

const sla1 = async (req, res) => {
  try {
    let dateTime;
    const {nojs, start, end} = req.query;
    if (!nojs) {
      return res.status(404).json(ResponseHelper.errorMessage("Nojs Not Found", 404));
    }

    dateTime = { start, end }
    const fetchSla = await fetchAllDataSla(dateTime, nojs);
    // format data
    const slaData = slaFormatter(fetchSla);
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseHelper.errorMessage("Internal Server Error", 500));
  }
}

export { sla1 };
