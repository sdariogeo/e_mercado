const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA";
const path = require("path");
// Aquí importamos los routers
const peopleRouter = require("./routes/peopleRoute");
const categories = require("./emercado-api-main/cats/cat.json");
//const cats_products = require("./emercado-api/cats_products/");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor del e-commerce</h1>");
});

//Con este GET se traen los archivos del directorio de cats
app.get("/cats", (req, res) => {
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
  if (username === "duende" && password === "pajero") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a /emercado-api
//Problema: el middleware devuelve false
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
app.use("/cart", peopleRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
