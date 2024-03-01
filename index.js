import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const port = 3004;

app.use(express.json());
app.use(cors);

const server = httpServer.listen(port, () => {
  console.log(`API corriendo en el puerto ${port}`);
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("message", (message) => {
    console.log("Mensaje recibido del cliente: %s", message);
    io.emit("mensajeServidor", message); 
  });
});
