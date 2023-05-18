const dal = require("../data-access-layer/dal-sql");

async function loginAsync(credentials) {
  const sql = `SELECT username, admin FROM admin WHERE username = '${credentials.username}' AND password = '${credentials.password}' LIMIT 1`;
  const user = await dal.executeAsync(sql);
  if (user.length === 0) return null;
  const users = user[0];

  return users;
}

module.exports = {
  loginAsync,
};
