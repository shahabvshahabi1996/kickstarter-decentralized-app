const express = require('express');
const app = express();
/* --------------------------------------------------------- */
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const path = require('path');
const expressValidator = require('express-validator');
/* --------------------------------------------------------- */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use(expressValidator());
app.use(express.static(__dirname + './public'));
/* --------------------------------------------------------- */
/* --------------------------------------------------------- */
app.set('view engine', 'ejs');
const routes = require('./routes'); 
routes(app);
/* --------------------------------------------------------- */
require('./model/campaignModel');
require('./model/favoriteModel');
require('./model/reportsModel');
require('./model/userModel');
/* --------------------------------------------------------- */
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
/* --------------------------------------------------------- */
