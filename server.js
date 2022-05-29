const express = require("express");
const axios = require("axios");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const io = http.createServer(app);

const enchereUser = (IDUtilisateur, Enchere, IDAnnonce) => {
  console.log(Enchere);
  axios.get(`http://localhost:2000/encherir`, {
    params: {
      IDUtilisateur: IDUtilisateur,
      Enchere: Enchere,
      IDAnnonce: IDAnnonce,
    },
  });
};
const server = new Server(io, {
  cors: { origin: "*" },
});
let i = 0;

server.on("connection", (socket) => {
  console.log("connexion");
  server.emit("hello", "world");
  socket.on("encherir", (value) => {
    console.log(value);
    enchereUser(value.IDUtilisateur, value.ench, value.IDAnnonce);
    server.emit("res_encherir", { ok: true, val: value.ench });
  });
});

server.listen(2001, () => {
  console.log("Server listening to post 2001");
});
