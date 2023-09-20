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
        const deleteSpecies = await db.query("DELETE FROM species WHERE id = $1", [id]
        );

        res.json("The species was deleted!");

    } catch (error) {
        console.error(error.message)
        res.status(400).json({error});
    }
})

//INDIVIDUALS
app.get('/individuals', async (req, res) => {
    try {
        const {rows : individuals} = await db.query('SELECT * FROM individuals');
        res.send(individuals);
    } catch (error) {
        console.error("Error fetching species:", error.message);
        res.status(500).send({ error: "Failed to fetch species." });
    }
});

app.post('/individuals', async (req, res) => {
    try {
        
        const {nickname, scientist_tracking, species_id, created_at } = req.body;

        const newIndividual =  await db.query("INSERT INTO individuals (nickname, scientist_tracking, species_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *", [nickname, scientist_tracking, species_id, created_at]);

        res.json(newIndividual.rows[0])
        
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error});

    }
})

app.put('/individuals/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {nickname, scientist_tracking, species_id, created_at } = req.body;

        const editedIndividual = await db.query("UPDATE individuals SET nickname = $1, scientist_tracking = $2, species_id = $3, created_at = $4 WHERE id = $5 RETURNING *", [nickname, scientist_tracking, species_id, created_at, id]);

        res.json(editedIndividual.rows[0])

    } catch (error) {
        console.error(error.message)
        res.status(400).json({error});
    }

})

app.delete('/individuals/:id', async (req, res) => {
    try {

        const {id} = req.params;
        const deleteIndividual = await db.query("DELETE FROM individuals WHERE id = $1", [id]
        );

        res.json("The individual was deleted!");

    } catch (error) {
        console.error(error.message)
        res.status(400).json({error});
    }
})


//SIGHTINGS
app.get('/sightings', async (req, res) => {
    try {
        const {rows : sightings} = await db.query('SELECT * FROM sightings');
        res.send(sightings);
    } catch (error) {
        console.error("Error fetching species:", error.message);
        res.status(500).send({ error: "Failed to fetch species." });
    }
});

app.post('/sightings', async (req, res) => {
    try {
        
        const {sighting_timestamp, individual_id, location_text, is_healthy, email_address, created_at } = req.body;

        const newSighting =  await db.query("INSERT INTO sightings (sighting_timestamp, individual_id, location_text, is_healthy, email_address, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [sighting_timestamp, individual_id, location_text, is_healthy, email_address, created_at]);

        res.json(newSighting.rows[0])
        
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error});

    }
})


app.delete('/sightings/:id', async (req, res) => {
    try {

        const {id} = req.params;
        const deleteSighting = await db.query("DELETE FROM sightings WHERE id = $1", [id]
        );

        res.json("The sighting was deleted!");

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