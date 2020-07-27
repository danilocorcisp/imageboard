const express = require('express');
const app = express();

app.use(express.static("public"));

app.get("/cities", (req, res) => {
    const cities = [
        {
            name: "Berlin",
            country: "Germany",
        },
        {
            name: "Sao Paulo",
            country: "Brasil"
        },
        {
            name: "Jundiaí",
            country: "Brasil"
        }
    ];
    res.json(cities);

})

app.listen(8080, () => console.log("the world of images is running"));