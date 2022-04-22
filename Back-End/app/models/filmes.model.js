const sql = require("./db.js");
// constructor
const Filme = function(Filme) {
  this.title = Filme.title;
  this.description = Filme.description;
  this.published = Filme.published;
};



Filme.create = (filme, result) => {
  sql.query("INSERT INTO Filme SET ?", filme, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Filme: ", { id: res.insertId, ...filme });
    result(null, { id: res.insertId, ...filme });
  });
};




Filme.findById = (id, result) => {
  sql.query(`SELECT * FROM Filme WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found Filme: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Filme with the id
    result({ kind: "not_found" }, null);
  });
};




Filme.getAll = (title, result) => {
  let query = "SELECT * FROM Filme";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Filme: ", res);
    result(null, res);
  });
};




Filme.getAllPublished = result => {
  sql.query("SELECT * FROM Filme WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Filme: ", res);
    result(null, res);
  });
};



Filme.updateById = (id, Filme, result) => {
  sql.query(
    "UPDATE Filme SET title = ?, description = ?, published = ? WHERE id = ?",
    [Filme.title, Filme.description, Filme.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Filme with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Filme: ", { id: id, ...Filme });
      result(null, { id: id, ...Filme });
    }
  );
};



Filme.remove = (id, result) => {
  sql.query("DELETE FROM Filme WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Filme with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Filme with id: ", id);
    result(null, res);
  });
};




Filme.removeAll = result => {
  sql.query("DELETE FROM Filme", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} Filme`);
    result(null, res);
  });
};
module.exports = Filme;