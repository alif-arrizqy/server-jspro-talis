/*
  Function to format the data
*/
const slaFormatter = (datas) => {
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
  const SECONDS_IN_DAY = 86400; // 60 * 60 * 24
  const SECONDS_IN_HOUR = 3600; // 60 * 60
  const SECONDS_IN_MINUTE = 60;

  let remainingSeconds = sec;
  const days = Math.floor(remainingSeconds / SECONDS_IN_DAY);
  remainingSeconds -= days * SECONDS_IN_DAY;
  const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
  remainingSeconds -= hours * SECONDS_IN_HOUR;
  const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
  remainingSeconds -= minutes * SECONDS_IN_MINUTE;
  const seconds = Math.floor(remainingSeconds);

  // Helper function to pad single digit numbers with a leading zero
  const pad = (num) => String(num).padStart(2, "0");

  // Return string in human-readable format
  return days > 0
    ? `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
    : `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
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

// Calculate average
const average = (arr, param, fix = 0) => {
  const total = arr.reduce((acc, val) => acc + val[param], 0);
  return ((total / arr.length) / 100).toFixed(fix);
};

// Calculate sum
const sum = (arr, param, fix = 0) => {
  const total = arr.reduce((acc, val) => acc + val[param], 0);
  return total.toFixed(fix);
};

export { slaFormatter, millisToSec, secToString, groupingByTs, average, sum };
