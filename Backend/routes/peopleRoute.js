const express = require("express");
const peopleRouter = express.Router();
// Importamos los controllers necesarios
const peopleController = require("../controllers/peopleController");

peopleRouter.get("/", peopleController.getUsers);

peopleRouter.get("/:id", peopleController.getUserById);

peopleRouter.post("/", peopleController.createUser);

peopleRouter.put("/:id", peopleController.updateUser);

peopleRouter.delete("/:id", peopleController.deleteUser);

module.exports = peopleRouter;
