const express = require('express');
const session = require('express-session');
const https = require('https')
const fs = require('fs')
const path = require('path')

const login = require('./routes/login');
const pages = require('./routes/pages');



const external_port = process.env.PORT_OUT;
const internal_port = process.env.WEB_PORT || 8080;


app = express();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionTimer = 1000 * 60 * 30;

app.use(session({
    secret: 'simenerveldigkul',
    cookie: { maxAge: sessionTimer },
    saveUninitialized: false,
    resave: true
}))

app.use('/login', login)
app.use('/', pages)



httpsServer = https
    .createServer(
        {
            key: fs.readFileSync(path.join('.', 'ssl', 'key.pem')),
            cert: fs.readFileSync(path.join('.', 'ssl', 'cert.pem'))
        },
        app
    )

const runningServer = httpsServer.listen(internal_port, () => {
    console.log(`App listening on internal port: ${internal_port} and external port: ${external_port}`);
})


process.on('SIGTERM', () => {
    console.debug('SIGTERM signal received: closing HTTP server')
    runningServer.close(() => {
      console.debug('HTTP server closed')
    })
})
