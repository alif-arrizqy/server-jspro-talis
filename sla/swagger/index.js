import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import responseSchemas from "./response.js";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SLA API Documentation",
      version: "1.0.0",
      description: "API Documentation for SLA",
    },
    components: {
      schemas: {
        ...responseSchemas
      }
    },
  },
  apis: ["./src/controllers/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
