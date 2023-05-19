const dal = require("../data-access-layer/dal-sql");

async function getAllMissionsAsync() {
  const sql = "SELECT `ID`, `Description`, `Done`, `Priority` FROM `misions` LIMIT 4";
  const products = await dal.executeAsync(sql);
  return products;
}
async function getNumOfMissionsAsync(num){
  const sql = `SELECT * FROM misions LIMIT 3 OFFSET ${num}`;
  const products = await dal.executeAsync(sql);
  return products;
}

async function deleteMissionAsync(id) {
  const sql = `DELETE FROM misions WHERE ID = ${id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? false : true;
}

async function addMissionAsync(product) {
  const sql = `INSERT INTO misions(Description, Done, Priority)
                VALUES('${product.Description}', 'false', '${product.Priority}')`;
  const addedProduct = await dal.executeAsync(sql);
  product.id = addedProduct.insertId;
  return product;
}

async function updateMissionAsync(product) {
  const sql = `UPDATE misions SET Description = '${product.Description}', Done = '${product.Done}',Priority = '${product.Priority}'  WHERE ID = ${product.id}`;
  const addedProduct = await dal.executeAsync(sql);
  return product;
}

module.exports = {
  getAllMissionsAsync,
  getNumOfMissionsAsync,
  addMissionAsync,
  updateMissionAsync,
  deleteMissionAsync,
};
