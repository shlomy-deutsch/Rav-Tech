global.config = require("./config-prod.json");
const cors = require("cors"); // npm i cors
const express = require("express");
const fileUpload = require("express-fileupload");
const missionsController = require("./controllers-layer/missions-controller");
const authController = require("./controllers-layer/auth-controller");
// const productsController = require("./controllers-layer/products-controller");
const PORT = process.env.PORT || 3000;
const socketLogic = require("./socket-logic");
// const { sendEmail } = require("./mail-logic");
const server = express();
server.use(cors());
server.use(express.json());
server.use(fileUpload());
server.use("/api/appointment", missionsController);
server.use("/api/auth", authController);
// server.use("/api/products", productsController);
// server.post("/api/mail", sendEmail);


server.use("*", (request, response) =>
  response.status(404).send("Route not found.")
);

const listener = server.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);
socketLogic.start(listener);
