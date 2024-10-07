const slaFormatter = async (datas) => {
  return datas.map((el) => {
    const sla = {
      ts: el.ts,
      battVolt: el.battVolt,
      vsatCurr: el.load1,
      btsCurr: el.load2,
      oblCurr: el.load3,
      edl1: el.energy?.edl1 || 0,
      edl2: el.energy?.edl2 || 0,
      eh1: el.energy?.eh1 < 0 ? 0 : el.energy?.eh1 || 0,
      eh2: el.energy?.eh2 < 0 ? 0 : el.energy?.eh2 || 0,
      eh3: el.energy?.eh3 || 0,
      pv1Curr: el.pv?.pv1Curr || 0,
      pv2Curr: el.pv?.pv2Curr || 0,
      pv3Curr: el.pv?.pv3Curr || 0,
      pv1Volt: el.pv?.pv1Volt || 0,
      pv2Volt: el.pv?.pv2Volt || 0,
      pv3Volt: el.pv?.pv3Volt || 0,
      flagStatus: "",
    };
    return sla;
  });
};

export { slaFormatter };
