import session from "express-session";
import Sequelize from "sequelize";
import passport from "passport";

const configSession = (app) => {
  const SequelizeStore = require("connect-session-sequelize")(session.Store);

  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: false,
      define: {
        freezeTableName: true,
      },
    }
  );
  const myStore = new SequelizeStore({
    db: sequelize,
  });
  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: myStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  }));

  myStore.sync();
  app.use(passport.authenticate("session"));

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
    //   cb(null, { id: user.id, username: user.username });
    cb(null, user);
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configSession;
