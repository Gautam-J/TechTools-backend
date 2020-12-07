const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev")); // logger
// :method :url :status :response-time ms - :res[content-length]

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`REST API running on port ${PORT}`));
