require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectToMongo = require("./db");
const router = require("./Routes/router");

const app = express();

// Connect to MongoDB
connectToMongo();

// ✅ FIXED CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ims-blush.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("IMS Backend is running");
});

// Routes
app.use(router);

// Port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`IMS Backend listening on port ${PORT}`);
});
