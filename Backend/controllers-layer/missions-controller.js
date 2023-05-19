const express = require("express");
const logic = require("../business-logic-layer/missions-logic");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const products = await logic.getAllMissionsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
router.get("/:num", async (request, response) => {
  try {
    const num = +request.params.num
    const products = await logic.getNumOfMissionsAsync(num);
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const product = request.body;
    const addedProduct = await logic.addMissionAsync(product);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const deleted = await logic.deleteMissionAsync(id);
    if (!deleted)
      return response.status(400).json({ message: "Could not delete row." });
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const product = request.body;
    product.id = id;
    const updateProduct = await logic.updateMissionAsync(product);
    response.status(200).json(updateProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});



module.exports = router;
