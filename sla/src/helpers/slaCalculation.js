import { slaFormatter } from "../helpers/slaFormatter.js";
import { millisToSec, secToString, groupingByTs, average, sum } from "../helpers/slaFormatter.js";

// Calculating SLA
const calculateSLA = (datas, date) => {
  let uptime = 0;
  let real = 0;
  let result = [];
  const MAX_DURATION = 300;
  const PERCENT = 100;

  let totalDateSec = millisToSec(date.start, date.end);
  for (let i = 0; i < datas.length; i++) {
    let res = slaFormatter(datas[i]);
    console.log(res);
    const tempTs = datas[i + 1] ? datas[i + 1].ts : res.ts;
    const second = millisToSec(res.ts, tempTs);
    const duration = second > MAX_DURATION ? MAX_DURATION : second;
    const lvd1 = res.vsatCurr > 0 ? res.battVolt : 0;
    const lvd2 = res.btsCurr > 0 ? res.battVolt : 0;
    uptime += duration;
    real += second;
    res = {
      ...res,
      lvd1,
      lvd2,
      duration,
      real: second,
    };
    result.push(res);
  }
  const uptimePercent = ((uptime / totalDateSec) * PERCENT).toFixed(2);
  const sumBattVolt = result.map((e) => e.battVolt).length;
  const avgBattvolt = +average(result, "battVolt", 2);
  const avgVsatCurr = +average(result, "vsatCurr", 2);
  const avgBtsCurr = +average(result, "btsCurr", 2);
  const avg = {
    up_time: secToString(uptime),
    unknown_time: secToString(totalDateSec - uptime),
    up_persentase: `${uptimePercent}%`,
    unknown_persentase: `${(PERCENT - uptimePercent).toFixed(2)}%`,
    eh1: sum(result, "eh1"),
    eh2: sum(result, "eh2"),
    eh3: sum(result, "eh3"),
    batt_volt: avgBattvolt,
    edl1: sum(result, "edl1"),
    edl2: sum(result, "edl2"),
    vsat_curr: avgVsatCurr,
    bts_curr: avgBtsCurr,
    watt: ((avgVsatCurr + avgBtsCurr) * avgBattvolt).toFixed(1),
    duration: uptime,
    second: totalDateSec,
  };
  return { avg, log: result, duration: uptime, sumBattVolt };
};

// Calculating SLA 1
const calculateDataSLA1 = (datas, date) => {
  return calculateSLA(datas, date);
};

// Calculating SLA 2
const calculateDataSLA2 = (datas, date, nojs) => {
  const data = calculateSLA(datas, date);
  const fiveMinutestoDaily = groupingByTs(data.log, 10);
  const dailys = [];

  fiveMinutestoDaily.forEach((log) => {
    const duration = sum(log.data, "duration");
    const newData = {
      nojs: nojs.nojs,
      site: nojs.site,
      date: log.date,
      up_time: secToString(duration),
      batt_volt: average(log.data, "battVolt", 2),
      vsat_curr: average(log.data, "vsatCurr", 2),
      bts_curr: average(log.data, "btsCurr", 2),
      eh1: sum(log.data, "eh1"),
      eh2: sum(log.data, "eh2"),
      eh3: sum(log.data, "eh3"),
      edl1: sum(log.data, "edl1"),
      edl2: sum(log.data, "edl2"),
      lvd1: average(log.data, "lvd1", 2),
      lvd2: average(log.data, "lvd2", 2),
    };
    dailys.push(newData);
  });
  return dailys;
};

export { calculateDataSLA1, calculateDataSLA2 };
