const responseSchemas = {
  ErrorData: {
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
          data: {
            type: "object",
            example: {
              message: "Error message",
            },
          },
        },
      },
    },
  },
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
  SuccessSLA2: {
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
                date: {
                  type: "string",
                  example: "2024-09-02",
                },
                up_time: {
                  type: "string",
                  example: "07h 04m 51s",
                },
                batt_volt: {
                  type: "float",
                  example: 53.46,
                },
                vsat_curr: {
                  type: "float",
                  example: 1.12,
                },
                bts_curr: {
                  type: "float",
                  example: 5.12,
                },
                eh1: {
                  type: "number",
                  example: 35466,
                },
                eh2: {
                  type: "number",
                  example: 30,
                },
                eh3: {
                  type: "number",
                  example: 0,
                },
                edl1: {
                  type: "number",
                  example: -11,
                },
                edl2: {
                  type: "number",
                  example: -4,
                },
                edl3: {
                  type: "number",
                  example: -12,
                },
                lvd1: {
                  type: "float",
                  example: 13.78,
                },
                lvd2: {
                  type: "float",
                  example: 10.12,
                },
              },
            },
          },
        },
      },
    },
  },
  SuccessSLA1: {
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
              site: {
                type: "string",
                example: "Sundaya Sentul",
              },
              lc: {
                type: "string",
                example: "IFORTE",
              },
              up_time: {
                type: "string",
                example: "13h 34m 51s",
              },
              unknown_time: {
                type: "string",
                example: "03d 07h 58m 21s",
              },
              up_persentase: {
                type: "string",
                example: "35.99%",
              },
              eh1: {
                type: "number",
                example: 35466,
              },
              eh2: {
                type: "number",
                example: 30,
              },
              eh3: {
                type: "number",
                example: 0,
              },
              batt_volt: {
                type: "float",
                example: 53.46,
              },
              edl1: {
                type: "number",
                example: -11,
              },
              edl2: {
                type: "number",
                example: -4,
              },
              edl3: {
                type: "number",
                example: -12,
              },
              vsat_curr: {
                type: "float",
                example: 1.12,
              },
              bts_curr: {
                type: "float",
                example: 5.12,
              },
              watt: {
                type: "number",
                example: 0,
              },
              duration: {
                type: "number",
                example: 57698,
              },
              second: {
                type: "number",
                example: 345599,
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
};

export default responseSchemas;
