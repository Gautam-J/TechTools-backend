const express = require("express");
const morgan = require("morgan");
const connectToDB = require("./config/db");

const app = express();

// connect to MongoDB
connectToDB();

// Initialize Middlewares
// logger => :method :url :status :response-time ms - :res[content-length]
app.use(morgan("dev"));
// parse incoming requests with JSON payloads
app.use(express.json());

// default empty route to check API
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", require("./routes/userRoutes"));

// either PORT env variable or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`REST API running on port ${PORT}...`));
