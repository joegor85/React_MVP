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









app.listen(PORT, (error) => {
  if (error) console.log(error);
  else {
    console.log(`Listening on port: ${PORT}`);
  }
});
