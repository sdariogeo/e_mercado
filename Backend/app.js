const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "EL ASADO ES EN DICIEMBRE";
const path = require("path");
// Aquí importamos los routers
const productsRouter = require("./routes/productRoute");
const categories = require("./emercado-api-main/cats/cat.json");
//const cats_products = require("./emercado-api/cats_products/");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor del e-commerce</h1>");
});

//Con este GET se traen los archivos del directorio de cats
app.get("/cats/cat", (req, res) => {
  res.json(categories);
});
//Con este GET se traen los archivos de cats_products por id
app.get("/cats_products/:id", (req, res) => {
 res.sendFile(path.join(__dirname, `./emercado-api-main/cats_products/${req.params.id}.json`));
});
//GET a products
app.get("/products/:id", (req, res) => {
  res.sendFile(path.join(__dirname, `./emercado-api-main/products/${req.params.id}.json`));
 });

//GET a products_comments
app.get("/products_comments/:id", (req, res) => {
  res.sendFile(path.join(__dirname, `./emercado-api-main/products_comments/${req.params.id}.json`));
 });
 //GET a user_cart
 app.get("/user_cart/:id", (req, res) => {
  res.sendFile(path.join(__dirname, `./emercado-api-main/user_cart/${req.params.id}.json`));
 });
// la autenticación funciona
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "duende" && password === "asado") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a /emercado-api (no sería realizar peticiones a /cart ?)
//Problema: el middleware devuelve false
// Posible respuesta: creo que está devolviendo false porque en el archivo peopleModel.js todos los métodos consultan a la base de datos, pero no tenemos una base de datos asociada
app.use("/cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access_token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//---

// Asociamos el router de people con la ruta /people
app.use("/cart", productsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
