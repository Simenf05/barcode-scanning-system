const express = require('express');
const session = require('express-session');

const login = require('./routes/login');
const pages = require('./routes/pages');

const external_port = process.env.PORT_OUT;
const internal_port = process.env.WEB_PORT || 8080;


app = express();



app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const oneMin = 1000 * 60 * 5;

app.use(session({
    secret: 'simenerveldigkul',
    cookie: { maxAge: oneMin },
    saveUninitialized: false,
    resave: true
}))

app.use('/login', login)
app.use('/', pages)

app.listen(internal_port, () => {
    console.log(`App listening on internal port: ${internal_port} and external port: ${external_port}`);
})