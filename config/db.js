const mongoose = require("mongoose");
const config = require("config");

// get URI from ./default.json
const uri = config.get("mongoURI");

// connect to mongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);

    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectToDB;
