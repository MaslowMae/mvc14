const express = require("express");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.store);
const sequelize = require("./config/connection");
const routes = require("./controllers");

const helpers = require("./utils/helpers");
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// set up handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


// app.use(userRoutes);
app.use(routes);

//start server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
