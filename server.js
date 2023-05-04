const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
});
pool.connect();

app.use(express.json());

//testing route for server:
app.get('/',(req,res)=>{ res.send({'hello':'world'}); })

//read all list names
app.get("/api/lists", (req, res) => {
    pool.query(`SELECT * FROM lists ORDER BY list_id;`).then((result) => {
        console.log(result.rows);
        res.json(result.rows);
    });
});

app.get("/api/lists/:id", (req, res) => {
    let id = req.params.id;
    if (isNaN(id)) {
        res.status(404).send("Enter a valid list id.");
        return;
    }
    pool.query(`SELECT l.listname, json_agg(i.itemname) AS items
    FROM lists l
    JOIN items i ON l.list_id = i.list
    WHERE l.list_id = $1
    GROUP BY l.listname;`, [id]).then((result) => {
        console.log(result);
        if (result.rows.length === 0) {
            res.status(404).send("This list doesn't exist.");
            return;
        } else {
            let data = {
                listname: result.rows[0].listname,
                items: result.rows[0].items
            };
            res.send(data);
        }
    });
});







app.listen(PORT, (error) => {
  if (error) console.log(error);
  else {
    console.log(`Listening on port: ${PORT}`);
  }
});
