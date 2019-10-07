const express = require('express');
const hbs = require('hbs');
const port = 3000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + "/views/partials")

const homeRoute = require("./routes/index");
app.use("/", homeRoute);

app.listen(3000, () => console.log(`App running on port ${port}`));
