const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const { restart } = require("nodemon");
const connectionString = process.env.DATABASE_URL;
const cors = require("cors");
app.use(cors());

const pool = new Pool({
  connectionString: connectionString,
});
pool.connect();

app.use(express.json());

//testing route for server:
app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

// A route for reading all list names
app.get("/api/lists", (req, res) => {
  pool.query(`SELECT * FROM lists ORDER BY list_id;`).then((result) => {
    console.log(result.rows);
    res.json(result.rows);
  });
});

// A route for a single list with its items
app.get("/api/lists/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.status(404).send("Enter a valid list id.");
    return;
  }
  pool
    .query(
      `SELECT l.list_id, l.listname, json_agg(json_build_object('id', i.id, 'name', i.itemname)) AS items
      FROM lists l
      LEFT JOIN items i ON l.list_id = i.list
      WHERE l.list_id = $1
      GROUP BY l.list_id;`,
      [id]
    )
    .then((result) => {
      console.log(result);
      if (result.rows.length === 0) {
        res.status(404).send("This list doesn't exist.");
        return;
      } else {
        let data = {
          list_id: result.rows[0].list_id,
          listname: result.rows[0].listname,
          items: result.rows[0].items,
        };
        res.send(data);
      }
    });
});

// A route for creating a new list title
app.post("/api/lists", (req, res) => {
  if (!req.body.listName) {
    res.status(400).send("Please enter a list name.");
    return;
  } else {
    pool
      .query(`INSERT INTO lists (listName) VALUES ($1) RETURNING *;`, [
        req.body.listName,
      ])
      .then((result) => {
        res.status(201).send(result.rows[0]);
      });
  }
});

// A route for creating new list items
app.post("/api/items", (req, res) => {
  let listId = req.body.list;
  let itemName = req.body.itemName;
  pool
    .query(`INSERT INTO items (list, itemName) VALUES ($1, $2) RETURNING *;`, [
      listId,
      itemName,
    ])
    .then((result) => {
      res.status(201).send(JSON.stringify(result.rows[0]) + " created");
    });
});

// A route for deleting lists and their items
app.delete("/api/lists/:id", (req, res) => {
  const listId = req.params.id;
  pool
    .query(
      `
        DELETE FROM items
        WHERE list IN (
          SELECT list_id FROM lists
          WHERE list_id = $1
        );
        `,
      [listId]
    )
    .then(() => {
      pool
        .query(
          `
            DELETE FROM lists
            WHERE list_id = $1 RETURNING *;
            `,
          [listId]
        )
        .then((result) => {
          console.log(result.rows[0]);
          res.status(204).send(result.rows[0]);
        })
        .catch((error) => {
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// A route for deleting individual list items
app.delete("/api/items/:id", (req, res) => {
  const itemId = req.params.id;
  pool
    .query(`DELETE FROM items WHERE id = $1 RETURNING *;`, [itemId])
    .then((result) => {
      const deletedItem = result.rows[0];
      console.log(deletedItem);
      res
        .status(204)
        // .send(result.rows[0])
        .json({
          message: `Item ${itemId} deleted.`,
          deletedItemId: deletedItem.id,
        });
    })
    .catch((error) => {
      restart.status(500).send(error.message);
    });
});

// Start the app listening on a port
app.listen(PORT, (error) => {
  if (error) console.log(error);
  else {
    console.log(`Listening on port: ${PORT}`);
  }
});
