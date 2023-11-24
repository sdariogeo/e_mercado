const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA";

// Aquí importamos los routers
const peopleRouter = require("./routes/peopleRoute");


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor del e-commerce</h1>");
});

//Con este GET se traen los archivos del directorio de cats
app.get("/emercado-api/cats/cat.json", (req, res) => {
  res.sendFile(path.join(__dirname, "cats/cat.json"));
});

//Con este GET se traen todos los archivos del directorio de sell
app.get("/emercado-api/sell/publish.json", (req, res) => {
  res.sendFile(path.join(__dirname, "sell/publish.json"));
});
//
app.get("/emercado-api/sell/cats_products/", (req, res) => {
  res.sendFile(path.join(__dirname, "cats_products/"));
});
//
// Auth
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a /emercado-api
app.use("/emercado-api", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//---

// Asociamos el router de people con la ruta /people
app.use("/emercado-api", peopleRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
