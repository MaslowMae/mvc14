const path = require("path");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require("./config/connection");
console.log("checkpoint0")

const routes = require("./controllers");
const signupRoutes = require('./controllers/signupRoutes'); // Include the signupRoutes
const helpers = require("./utils/helpers");
const exphbs = require('express-handlebars');
const hbs = exphbs.create();

console.log("checkpoint1");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    expiration: 24 * 60 * 60 * 1000 // Session expiration set to 24 hours
  }),
};

app.use(session(sess));


// set up handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/api/users', require('./controllers/api/userRoutes'));
app.use(routes);
app.use('/api/signup', signupRoutes);

// Synchronize the session store with the database after server starts listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on Port ${PORT}`);
    // Synchronize session store with the database
    sess.store.sync();
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});