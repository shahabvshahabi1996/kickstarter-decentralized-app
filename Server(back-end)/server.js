const express = require('express');
const app = express();

const connection = 'mongodb://<dbuser>:<dbpassword>@ds111319.mlab.com:11319/kickstarter';

const port = 8000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))