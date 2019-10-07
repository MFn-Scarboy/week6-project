const express      = require('express');
const router       = express.Router();
const mongoose     = require('mongoose');

const session      = require("express-session")   //for login remembering
const MongoStore   = require("connect-mongo")(session)  



module.exports = router