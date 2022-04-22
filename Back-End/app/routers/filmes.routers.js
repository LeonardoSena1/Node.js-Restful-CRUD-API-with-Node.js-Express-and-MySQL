const auth = require("../middleware/auth");
const { admin } = require("../middleware/roles");

module.exports = app => {
  const filme = require("../controllers/filmes.controller");
  var router = require("express").Router();
  // Create a new filme
  router.post("/", [auth, admin], filme.create);
  // Retrieve all filme
  router.get("/", filme.findAll);
  // Retrieve all published filme
  router.get("/published", filme.findAllPublished);
  // Retrieve a single filme with id
  router.get("/:id", [auth, admin], filme.findOne);
  // Update a filme with id
  router.put("/:id", [auth, admin], filme.update);
  // Delete a filme with id
  router.delete("/:id", [auth, admin], filme.delete);
  // Delete all filme
  router.delete("/", [auth, admin], filme.deleteAll);
  app.use('/api/filme', router);
};