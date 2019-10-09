const express = require('express');
const hbs = require('hbs');
const port = 3000;
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const session      = require("express-session")

const app = express();

mongoose
.connect('mongodb://localhost/fitnessapp', {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + "/views/partials")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const homeRoute = require("./routes/index");
app.use("/", homeRoute);

const aboutRoute = require("./routes/about");
app.use("/", aboutRoute);

const contactRoute = require("./routes/contact");
app.use("/", contactRoute);

const loginRoute = require("./routes/auth/login");
app.use("/auth", loginRoute);

const signupRoute = require("./routes/auth/signup");
app.use("/auth", signupRoute);

app.use((req,res,next)=> {
   if(!req.session.currentUser) res.redirect("/auth/login")
   else next()
 })

const logoutRoute = require("./routes/auth/logout");
app.use("/auth", logoutRoute);

const profileRoute = require("./routes/auth/profile");
app.use("/auth", profileRoute);

app.listen(3000, () => console.log(`App running on port ${port}`));
