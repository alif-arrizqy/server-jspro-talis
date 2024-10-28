const responseSchemas = {
  BadRequest: {
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 400,
          },
          status: {
            type: "string",
            example: "failed",
          },
          message: {
            type: "string",
            example: "Bad Request",
          },
        },
      },
    },
  },
  NotFound: {
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 404,
          },
          status: {
            type: "string",
            example: "failed",
          },
          message: {
            type: "string",
            example: "Data Not Found",
          },
        },
      },
    },
  },
  InternalServerError: {
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 500,
          },
          status: {
            type: "string",
            example: "failed",
          },
          message: {
            type: "string",
            example: "Internal Server Error",
          },
        },
      },
    },
  },
  SuccessAllSite: {
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 200,
          },
          status: {
            type: "string",
            example: "success",
          },
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                nojs: {
                  type: "string",
                  example: "JS999",
                },
                siteName: {
                  type: "string",
                  example: "Site Name",
                },
                ip: {
                  type: "string",
                  example: "10.10.10.1",
                },
                ipMiniPc: {
                  type: "string",
                  example: "null",
                },
                webapp: {
                  type: "string",
                  example: "site.sundaya.local",
                },
                ehubVersion: {
                  type: "string",
                  example: "new",
                },
                panel2Type: {
                  type: "string",
                  example: "new",
                },
                mpptType: {
                  type: "string",
                  example: "mppt-srne or mppt-epveper",
                },
                talisVersion: {
                  type: "boolean",
                  example: true,
                },
                tvdSite: {
                  type: "boolean",
                  example: false,
                },
                ipGatewayLC: {
                  type: "string",
                  example: "10.10.13.1",
                },
                ipGatewayGS: {
                  type: "string",
                  example: "10.10.14.1",
                },
                subnet: {
                  type: "string",
                  example: "/29",
                },
                cellularOperator: {
                  type: "string",
                  example: "TELKOMSEL",
                },
                lc: {
                  type: "string",
                  example: "PSN",
                },
                gs: {
                  type: "string",
                  example: "PT. AJN Solusindo",
                },
                projectPhase: {
                  type: "string",
                  example: "Phase 1",
                },
                buildYear: {
                  type: "string",
                  example: "2020-12-01",
                },
                onairDate: {
                  type: "string",
                  example: "2020-12-01",
                },
                topoSustainDate: {
                  type: "string",
                  example: "2020-12-01",
                },
                gsSustainDate: {
                  type: "string",
                  example: "2020-12-01",
                },
                contactPerson: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        example: "John",
                      },
                      phone: {
                        type: "string",
                        example: "08123456789",
                      },
                    },
                  },
                },
                address: {
                  type: "string",
                  example: "Jl. Raya",
                },
                subDistrict: {
                  type: "string",
                  example: "Sub District",
                },
                district: {
                  type: "string",
                  example: "District",
                },
                province: {
                  type: "string",
                  example: "Province",
                },
                latitude: {
                  type: "string",
                  example: "-6.123456",
                },
                longitude: {
                  type: "string",
                  example: "106.123456",
                },
              },
            },
          },
        },
      },
    },
  },
  SuccessSite: {
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 200,
          },
          status: {
            type: "string",
            example: "success",
          },
          data: {
            type: "object",
            properties: {
              nojs: {
                type: "string",
                example: "JS999",
              },
              siteName: {
                type: "string",
                example: "Site Name",
              },
              ip: {
                type: "string",
                example: "10.10.10.1",
              },
              ipMiniPc: {
                type: "string",
                example: "null",
              },
              webapp: {
                type: "string",
                example: "site.sundaya.local",
              },
              ehubVersion: {
                type: "string",
                example: "new",
              },
              panel2Type: {
                type: "string",
                example: "new",
              },
              mpptType: {
                type: "string",
                example: "mppt-srne or mppt-epveper",
              },
              talisVersion: {
                type: "boolean",
                example: true,
              },
              tvdSite: {
                type: "boolean",
                example: false,
              },
              ipGatewayLC: {
                type: "string",
                example: "10.10.13.1",
              },
              ipGatewayGS: {
                type: "string",
                example: "10.10.14.1",
              },
              subnet: {
                type: "string",
                example: "/29",
              },
              cellularOperator: {
                type: "string",
                example: "TELKOMSEL",
              },
              lc: {
                type: "string",
                example: "PSN",
              },
              gs: {
                type: "string",
                example: "PT. AJN Solusindo",
              },
              projectPhase: {
                type: "string",
                example: "Phase 1",
              },
              buildYear: {
                type: "string",
                example: "2020-12-01",
              },
              onairDate: {
                type: "string",
                example: "2020-12-01",
              },
              topoSustainDate: {
                type: "string",
                example: "2020-12-01",
              },
              gsSustainDate: {
                type: "string",
                example: "2020-12-01",
              },
              contactPerson: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "John",
                    },
                    phone: {
                      type: "string",
                      example: "08123456789",
                    },
                  },
                },
              },
              address: {
                type: "string",
                example: "Jl. Raya",
              },
              subDistrict: {
                type: "string",
                example: "Sub District",
              },
              district: {
                type: "string",
                example: "District",
              },
              province: {
                type: "string",
                example: "Province",
              },
              latitude: {
                type: "string",
                example: "-6.123456",
              },
              longitude: {
                type: "string",
                example: "106.123456",
              },
            },
          },
        },
      },
    },
  },
  SuccessMessage: {
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 200,
          },
          status: {
            type: "string",
            example: "success",
          },
          message: {
            type: "string",
            example: "Success message",
          },
        },
      },
    },
  },
  SuccessCreate: {
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 201,
          },
          status: {
            type: "string",
            example: "success",
          },
          message: {
            type: "string",
            example: "Success message",
          },
        },
      },
    },
  },
  CreateSiteInformation: {
    type: "object",
    properties: {
      site_id_name: {
        type: "string",
        example: "XXY123",
      },
      name: {
        type: "string",
        example: "Site Name",
      },
      nojs: {
        type: "string",
        example: "JS999",
      },
      onair_date: {
        type: "string",
        example: "2020-12-01",
      },
      topo_sustain_date: {
        type: "string",
        example: "2020-12-01",
      },
      gs_sustain_date: {
        type: "string",
        example: "2020-12-01",
      },
      longitude: {
        type: "number",
        example: 106.123456,
      },
      latitude: {
        type: "number",
        example: -6.123456,
      },
      provinsi: {
        type: "string",
        example: "Province",
      },
      kabupaten: {
        type: "string",
        example: "Kabupaten",
      },
      kecamatan: {
        type: "string",
        example: "Kecamatan",
      },
      provider_gs: {
        type: "string",
        example: "Provider GS",
      },
      address: {
        type: "string",
        example: "Address",
      },
      beam_provider: {
        type: "string",
        example: "Beam Provider",
      },
      cellular_operator: {
        type: "string",
        example: "Cell Operator",
      },
      project_phase: {
        type: "string",
        example: "Project Phase",
      },
      build_year: {
        type: "string",
        example: "2020-12-01",
      },
      version: {
        type: "string",
        example: "V3",
      },
      webapp: {
        type: "string",
        example: "site.sundaya.local",
      },
      mini_pc: {
        type: "string",
        example: null,
      },
      terminal_id: {
        type: "string",
        example: "Terminal ID",
      },
      mppt_type: {
        type: "string",
        example: "2",
      },
      panel2_type: {
        type: "string",
        example: "new",
      },
      talis_version: {
        type: "boolean",
        example: true,
      },
      tvd_site: {
        type: "boolean",
        example: false,
      },
      ip_gw_lc: {
        type: "string",
        example: "10.10.10.1",
      },
      ip_gw_gs: {
        type: "string",
        example: "10.10.10.2",
      },
      ip_snmp: {
        type: "string",
        example: "10.10.10.4",
      },
      subnet: {
        type: "string",
        example: "/29",
      },
      pjs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "John",
            },
            phone: {
              type: "string",
              example: "08123456789",
            },
          },
        },
      },
    },
  },
};

export default responseSchemas;
