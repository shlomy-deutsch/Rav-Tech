const express = require("express");
const logic = require("../business-logic-layer/auth-logic");
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const product = request.body;
    const addedProduct = await logic.loginAsync(product);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
