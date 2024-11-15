import { createFirstDataTalis } from "./src/controllers/talisLoggers/index.js";
import { createFirstDataPms } from "./src/controllers/pmsLoggers/index.js";

console.log("Creating first data...");

// PMS Loggers
const isCreatedPms = createFirstDataPms(); // pms
isCreatedPms.then((res) => {
  console.log(`pms: ${res.message}`);
});

// Talis
const isCreatedTalis = createFirstDataTalis(); // Talis
isCreatedTalis.then((res) => {
  console.log(`talis: ${res.message}`);
});
