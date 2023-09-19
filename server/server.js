const express = require("express");
const cors = require("cors");
const db = require("./db/db-connection.js");
require('dotenv').config()
// console.log(process.env)
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

//SPECIES
app.get("/", (req, res) => {
    res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
  });

app.get('/species', async (req, res) => {
    try {
        const {rows : species} = await db.query('SELECT * FROM species');
        res.send(species);
    } catch (error) {
        console.error("Error fetching species:", error.message);
        res.status(500).send({ error: "Failed to fetch species." });
    }
});

app.post('/species', async (req, res) => {
    try {
        const {common_name, scientific_name, estimated_number, conservation_code, created_at } = req.body;

        const newSpecies = await db.query (
            "INSERT INTO species (common_name, scientific_name, estimated_number, conservation_code, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *", [common_name, scientific_name, estimated_number, conservation_code, created_at]
        );

        res.json(newSpecies.rows[0])
        
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error});
    }
})

app.put('/species/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const {common_name, scientific_name, estimated_number, conservation_code, created_at } = req.body;

        const editedSpecies = await db.query(
            "UPDATE species SET common_name = $1, scientific_name = $2, estimated_number = $3, conservation_code = $4, created_at = $5 WHERE id = $6 RETURNING *", [common_name, scientific_name, estimated_number, conservation_code, created_at, id]
        );

        res.json(editedSpecies.rows[0])

    } catch (error) {
        console.error(error.message)
        res.status(400).json({error});
    }
})

app.delete('/species/:id', async (req, res) => {
    try {
        const {id} = req.params;
        console.log("id is here " + id)
        const deleteSpecies = await db.query("DELETE FROM species WHERE id = $1", [id]
        );

        res.json("Event was deleted!");

    } catch (error) {
        console.error(error.message)
        res.status(400).json({error});
    }
})



//TEST FOR CONNECTION OF DB
app.get('/testdb', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT NOW()');
        res.send({ currentTime: rows[0].now });
    } catch (error) {
        console.error("DB Test failed:", error.message);
        res.status(500).send({ error: "DB Test failed." });
    }
});


app.listen(PORT, () => {
    console.log("This is a test for the backend server")
})