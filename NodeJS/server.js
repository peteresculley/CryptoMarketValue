// Libraries
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

const http = require('http').Server(app);

dotenv.config();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json({ extended: true, limit: 52428800 }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));
app.use(express.static('public'));

http.listen(Number(process.env.PORT), () => {
    console.log(`Listening on port ${Number(process.env.PORT)}`);
});