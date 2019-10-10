require('dotenv').config();

const express = require('express');
const mongoose = require("mongoose");
const hbs = require('hbs');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");

mongoose
  .connect('mongodb://localhost/fitnessapp', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + "/views/partials")

hbs.registerHelper("data", function(list, options){
  if(list === undefined){
    return options.fn(this);
  }
  else if(list.length < 10){
    return options.fn(this);
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "basic-auth-secret",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000},
  }));

app.use((req,res,next)=>{
  if(req.session.user){
    app.locals.user = req.session.user
  } else if(app.locals.user) {
    delete app.locals.user
  }
  next();
})

const homeRoute = require("./routes/index");
app.use("/", homeRoute);

const aboutRoute = require("./routes/about");
app.use("/", aboutRoute);

const plansRoute = require("./routes/plans");
app.use("/", plansRoute);

const contactRoute = require("./routes/contact");
app.use("/", contactRoute);

const loginRoute = require("./routes/auth/login");
app.use("/auth", loginRoute);

const signupRoute = require("./routes/auth/signup");
app.use("/auth", signupRoute);

app.use((req,res,next)=> {
    if(!req.session.user) res.redirect("/auth/login")
    else next()
  })

const logoutRoute = require("./routes/auth/logout");
app.use("/auth", logoutRoute);

const deleteRoute = require("./routes/auth/delete");
app.use("/auth", deleteRoute);

const profileRoute = require("./routes/auth/profile");
app.use("/auth", profileRoute);

const updateRoute = require("./routes/auth/update");
app.use("/auth", updateRoute);

const activityRoute = require("./routes/auth/activity");
app.use("/auth", activityRoute);

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));
