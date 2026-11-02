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

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.post("/komik", async (req, res) => {
    const data = req.body;

    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})
