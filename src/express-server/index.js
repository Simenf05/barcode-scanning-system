const express = require('express');
const axios = require('axios').default;
const session = require('express-session');

const login = require('./routes/login');
const pages = require('./routes/pages');

const external_port = process.env.PORT_OUT;
const internal_port = process.env.WEB_PORT || 8080;
const api_port = process.env.API_PORT || 3000;



app = express();

app.use('/login', login)
app.use('/', pages)

app.listen(internal_port, () => {
    console.log(`App listening on internal port: ${internal_port} and external port: ${external_port}`);
})