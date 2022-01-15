const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.hb0ma.mongodb.net/f1network",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('connected to MongoDB'))
    .catch((err) => console.log("Failed to connect to MongoDB", err));