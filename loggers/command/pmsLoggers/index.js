import prisma from "../../src/app.js";
import { createFirstData, createPmsLoggers } from "../../src/controllers/pmsLoggers/index.js";

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established.");

    // insert first data
    // const firstData = await createFirstData();
    // console.log(firstData);

    // Add nojsLoggers
    const nojsSite = "JS998";
    const resp = await createPmsLoggers(nojsSite);
    console.log(resp);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
};

main();