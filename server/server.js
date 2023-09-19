const express = require("express");
const cors = require("cors");
const db = require("./db/db-connection.js");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log("This is a test for the backend server")
})