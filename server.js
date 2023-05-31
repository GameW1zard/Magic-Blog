const path = require ('path');
const express = require ('express');
const sequelize = require ('./config/connection');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
// const hbs = require('handlebars');

const helpers = require('./Utils/helpers.js');

const app = express();
const PORT = process.env.PORT || 3001;



const sess = {
    secret: 'secret',
    cookie: {httpOnly: false, maxAge: 24 * 60 * 60 * 1000, secure: false,},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
console.log(session(sess))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = expressHandlebars.create({ helpers });

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}. Visit http://localhost:${PORT} in your browser.`));
});