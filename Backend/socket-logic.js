const io = require("socket.io");

let socketsManager;

function start(listener) {
  socketsManager = io(listener, { cors: { origin: "*" } });

  socketsManager.sockets.on("connection", (socket) => {

    console.log("One new client has been connected.");

    socket.on("disconnect", () => {
      console.log("One client disconnect.");
    });

    socket.on("msg-from-client", (msg) => {
      console.log("Client sent message: ", msg);
      socketsManager.sockets.emit("msg-from-server", msg);
    });
  });
}

module.exports = {
  start,
};


