const Filme = require("../models/filmes.model");

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Filme.updateById(
    req.params.id,
    new Filme(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Filme with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Filme with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.create = (req, res) => {  
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body.title)
    // Create a Filme
    const filme = new Filme({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published || false
    });
    // Save Filme in the database
    Filme.create(filme, (err, data) => {    
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Filme."
        });
      else res.send(data);
    });
  };



  exports.findAll = (req, res) => {
    const title = req.query.title;
    Filme.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving filme."
        });
      else res.send(data);
    });
  };




  exports.findAllPublished = (req, res) => {
    Filme.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving filme."
        });
      else res.send(data);
    });
  };




  exports.findOne = (req, res) => {
    Filme.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Filme with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Filme with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };



  exports.delete = (req, res) => {
    Filme.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Filme with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Filme with id " + req.params.id
          });
        }
      } else res.send({ message: `Filme was deleted successfully!` });
    });
  };



  
  exports.deleteAll = (req, res) => {
    Filme.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Filmes."
        });
      else res.send({ message: `All Filmes were deleted successfully!` });
    });
  };