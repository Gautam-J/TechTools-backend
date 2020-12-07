const express = require("express");
const morgan = require("morgan");

const app = express();

// Initialize Middlewares
// logger => :method :url :status :response-time ms - :res[content-length]
app.use(morgan("dev"));
// parse incoming requests with JSON payloads
app.use(express.json());

// default empty route to check API
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// either PORT env variable or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`REST API running on port ${PORT}...`));
