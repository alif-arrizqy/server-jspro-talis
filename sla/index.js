import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import { setupSwagger } from "./swagger/index.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// default route
app.get("/", (req, res) => {
  res.send("Welcome to Server 2.0");
});

// routes
app.use("/v1/api/", router);

// Setup Swagger
setupSwagger(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
