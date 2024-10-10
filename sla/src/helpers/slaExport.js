import Excel from 'exceljs';

export default ({ log, site, uptime, sumVolt, v3, date }) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(site.toUpperCase());

  let columns;

  if (log[0].pv3Curr === undefined || log[0].pv3Curr === null) {
    // SCC 2
    columns = [
      { header: "Date Time", key: "ts", width: 23 },
      { header: "Eh1", key: "eh1", width: 12 },
      { header: "Eh2", key: "eh2", width: 7 },
      { header: "Vsat Curr", key: "vsatCurr", width: 10 },
      { header: "Bts Curr", key: "btsCurr", width: 10 },
      { header: "Obl Curr", key: "oblCurr", width: 10 },
      { header: "Batt Volt", key: "battVolt", width: 10 },
      { header: "Edl1", key: "edl1", width: 10 },
      { header: "Edl2", key: "edl2", width: 10 },
      { header: "Lvd1", key: "lvd1", width: 10 },
      { header: "Lvd2", key: "lvd2", width: 10 },

      { header: "Pv1Curr", key: "pv1Curr", width: 10 },
      { header: "Pv2Curr", key: "pv2Curr", width: 10 },
      { header: "pv1Volt", key: "pv1Volt", width: 10 },
      { header: "pv2Volt", key: "pv2Volt", width: 10 },

      { header: "Duration", key: "duration", width: 10 },
      { header: "Real", key: "real", width: 10 },

      { header: "Flag Status", key: "flagStatus", width: 15 },
    ];
  } else {
    // SCC 3
    columns = [
      { header: "Date Time", key: "ts", width: 23 },
      { header: "Eh1", key: "eh1", width: 12 },
      { header: "Eh2", key: "eh2", width: 7 },
      { header: "Vsat Curr", key: "vsatCurr", width: 10 },
      { header: "Bts Curr", key: "btsCurr", width: 10 },
      { header: "Obl Curr", key: "oblCurr", width: 10 },
      { header: "Batt Volt", key: "battVolt", width: 10 },
      { header: "Edl1", key: "edl1", width: 10 },
      { header: "Edl2", key: "edl2", width: 10 },
      { header: "Lvd1", key: "lvd1", width: 10 },
      { header: "Lvd2", key: "lvd2", width: 10 },

      { header: "Pv1Curr", key: "pv1Curr", width: 10 },
      { header: "Pv2Curr", key: "pv2Curr", width: 10 },
      { header: "Pv3Curr", key: "pv3Curr", width: 10 },
      { header: "pv1Volt", key: "pv1Volt", width: 10 },
      { header: "pv2Volt", key: "pv2Volt", width: 10 },
      { header: "pv3Volt", key: "pv3Volt", width: 10 },

      { header: "Duration", key: "duration", width: 10 },
      { header: "Real", key: "real", width: 10 },

      { header: "Flag Status", key: "flagStatus", width: 15 },
    ];
  }

  const newColumn = { header: "Eh3", key: "eh3", width: 10 };
  v3 && columns.splice(3, 0, newColumn);

  worksheet.columns = columns;
  worksheet.addRows(log);

  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.font = {
        size: 12,
      };
      cell.alignment = {
        vertical: "bottom",
        horizontal: "right",
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  const array = new Array([], [], []);
  const duration = ["Duration", uptime];
  const battVolt = ["Batt Volt", +sumVolt];
  const val1 = "LOG POWER JOULE STORE PRO",
    val2 = `Site ${site}`,
    val3 = date;
  const fontH = { size: 14, bold: true };
  const alignH = { vertical: "middle", horizontal: "center" };

  let dataHeading;
  if (log[0].pv3Curr === undefined || log[0].pv3Curr === null) {
    dataHeading = [
      { h: v3 ? "A1:R1" : "A1:R1", c: "A1", val: val1 },
      { h: v3 ? "A2:R2" : "A2:R2", c: "A2", val: val2 },
      { h: v3 ? "A3:R3" : "A3:R3", c: "A3", val: val3 },
    ];
  } else {
    dataHeading = [
      { h: v3 ? "A1:U1" : "A1:S1", c: "A1", val: val1 },
      { h: v3 ? "A2:U2" : "A2:S2", c: "A2", val: val2 },
      { h: v3 ? "A3:U3" : "A3:S3", c: "A3", val: val3 },
    ];
  }

  worksheet.spliceRows(1, 0, ...array, duration, battVolt, []);
  dataHeading.forEach((el) => {
    let cell = worksheet.getCell(el.c);
    worksheet.mergeCells(el.h);
    cell.value = el.val;
    cell.font = fontH;
    cell.alignment = alignH;
  });
  worksheet.getRow(4).font = fontH;
  worksheet.getRow(5).font = fontH;
  worksheet.getRow(4).alignment = alignH;
  worksheet.getRow(5).alignment = alignH;
  worksheet.getRow(7).font = { size: 13, bold: true };
  worksheet.getRow(7).alignment = { vertical: "middle", horizontal: "center" };

  return workbook;
};