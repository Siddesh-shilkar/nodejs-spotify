require('dotenv').config({ 'path': '.env' });
const express = require('express');
const path = require('path');
const session = require('cookie-session');
const helmet = require('helmet')
const hbs = require('hbs');

const routes = require('./api/routes');

const app = express()
const port = process.env.PORT

app.use(express.static(path.join(__dirname, '/public')));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use(helmet());
app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "img-src": ["'self'", "i.scdn.co"],
        },
      },
    })
  );

app.use(
    session({
        name: 'session',
        secret: process.env.SECRET_KEY,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
);

app.use('/', routes);

//error handling
app.use((err, req, res, next) => {
    res.status(500).json(err);
});

let server = app.listen(port, '0.0.0.0', () => {
    console.log(`Running on port ${port}`)
});


module.exports = server