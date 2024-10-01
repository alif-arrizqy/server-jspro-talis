const siteInformationFormatter = async (data) => {
  const formattedData = {
    ...data,
    version: data.version === "V3" ? "new" : "old",
    mppt_type: data.scc === "3" ? "mppt-srne" : "mppt-epveper",
  };

  const siteInformation = {
    nojs: formattedData.nojs,
    siteId: formattedData.site_id_name,
    terminalId: formattedData.terminal_id,
    siteName: formattedData.name,
    ip: formattedData.ip_snmp,
    ipMiniPc: formattedData.mini_pc,
    webapp: formattedData.webapp,
    ehubVersion: formattedData.version || "new",
    panel2Type: formattedData.panel2_type || "new",
    mpptType: formattedData.mppt_type || null,
    talisVersion: formattedData.talis_version || false,
    tvdSite: formattedData.tvd_site || false,
  };

  const siteInfoDetail = {
    nojsSite: formattedData.nojs,
    ipGatewayLC: formattedData.ip_gw_lc,
    ipGatewayGS: formattedData.ip_gw_gs,
    subnet: formattedData.subnet,
    cellularOperator: formattedData.cellular_operator,
    lc: formattedData.beam_provider,
    gs: formattedData.provider_gs,
    projectPhase: formattedData.project_phase,
    buildYear: formattedData.build_year,
    onairDate: formattedData.onair_date,
    topoSustainDate: formattedData.topo_sustain_date,
    gsSustainDate: formattedData.gs_sustain_date,
    contactPerson: formattedData.pjs,
    address: formattedData.address,
    subDistrict: formattedData.kecamatan,
    district: formattedData.kabupaten,
    province: formattedData.provinsi,
    latitude: formattedData.latitude,
    longitude: formattedData.longitude,
  };
  return { siteInformation, siteInfoDetail };
};

export default siteInformationFormatter;
