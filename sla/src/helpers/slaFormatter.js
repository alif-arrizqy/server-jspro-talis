/*
  Function to format the data
*/
const slaFormatter = async (datas) => {
  return {  
    ts: datas.ts,
    battVolt: datas.battVolt,
    vsatCurr: datas.load1,
    btsCurr: datas.load2,
    oblCurr: datas.load3,
    edl1: datas.energy?.edl1 || 0,
    edl2: datas.energy?.edl2 || 0,
    eh1: datas.energy?.eh1 < 0 ? 0 : datas.energy?.eh1 || 0,
    eh2: datas.energy?.eh2 < 0 ? 0 : datas.energy?.eh2 || 0,
    eh3: datas.energy?.eh3 || 0,
    pv1Curr: datas.pv?.pv1Curr || 0,
    pv2Curr: datas.pv?.pv2Curr || 0,
    pv3Curr: datas.pv?.pv3Curr || 0,
    pv1Volt: datas.pv?.pv1Volt || 0,
    pv2Volt: datas.pv?.pv2Volt || 0,
    pv3Volt: datas.pv?.pv3Volt || 0,
    flagStatus: ""
  }
};

/* 
  Convert millis to seconds
  return seconds
*/
const millisToSec = (ts1, ts2) => {
  const date1 = new Date(ts1);
  const date2 = new Date(ts2);
  return (date2 - date1) / 1000;
};

// Pad number with 0
const pad = (n) => (n < 10 ? `0${n}` : n);

/*
  Convert seconds to string human readable
  return string
*/
const secToString = (sec) => {
  const SECOND_IN_DAY = 60 / 60 / 24;
  const MSEC_DAY = 60 * 60 * 24;
  const SECOND_IN_HOUR = 60 / 60;
  const MSEC_HOUR = 60 * 60;
  const SECOND_IN_MINUTE = 60;

  let msec = sec;
  let day = Math.floor(msec / SECOND_IN_DAY);
  msec -= day * MSEC_DAY;

  let hh = Math.floor(msec / SECOND_IN_HOUR);
  msec -= hh * MSEC_HOUR;

  let mm = Math.floor(msec / SECOND_IN_MINUTE);
  msec -= mm * SECOND_IN_MINUTE;
  let ss = Math.floor(msec);

  // return string human readable
  return day > 0
    ? `${pad(day)}d ${pad(hh)}h ${pad(mm)}m ${pad(ss)}s`
    : `${pad(hh)}h ${pad(mm)}m ${pad(ss)}s`;
};

/* 
  function groups log entries by date (based on a timestamp ts) 
  and returns the grouped logs in an array format
*/
const groupingByTs = (log) => {
  const groups = log.reduce((acc, curr) => {
    const date = curr.ts.slice(0, 10);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      data: groups[date],
    };
  });
  return groupArrays;
};

// // Calculate average
// const average = (arr, param, fix = 0) => {
//   return (
//     arr.map((val) => val[param]).reduce((acc, val) => acc + val, 0) / arr.length
//   ).toFixed(fix);
// };

// // Calculate sum
// const sum = (arr, param, fix = 0) => {
//   return arr
//     .map((val) => val[param])
//     .reduce((acc, val) => acc + val, 0)
//     .toFixed(fix);
// };

// Calculate average
const average = (arr, param, fix = 0) => {
  const total = arr.reduce((acc, val) => acc + val[param], 0);
  return (total / arr.length).toFixed(fix);
};

// Calculate sum
const sum = (arr, param, fix = 0) => {
  const total = arr.reduce((acc, val) => acc + val[param], 0);
  return total.toFixed(fix);
};

export { slaFormatter, millisToSec, secToString, groupingByTs, average, sum };
