const express = require("express");
const app = express();
const PORT = 3030;
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

db.sequelize.sync()
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.error(`Error starting server: ${err}`);
    })

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});