require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectToMongo = require("./db");
const router = require("./Routes/router");

const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);

// Use environment port (Render-safe)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
