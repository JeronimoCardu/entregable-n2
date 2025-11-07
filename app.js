const express = require("express");
require("dotenv").config();
const PORT = 3000;
const handlebars = require("express-handlebars");
const productsRouter = require("./src/routes/productsRouter");
const viewsRouter = require("./src/routes/views.router");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Permitir acceso a io en las rutas
app.set('io', io);

app.use("/", viewsRouter); // Uso de las vistas
app.use("/api/products", productsRouter); // Uso de la API


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
