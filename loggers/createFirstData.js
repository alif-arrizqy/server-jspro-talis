import { createFirstData } from "./src/controllers/talisLoggers/index.js";

console.log("Creating first data...");

// PMS Loggers


// Talis 
const isCreated = createFirstData(); // Talis
isCreated.then((res) => {
  console.log(`talis: ${res.message}`);
});
