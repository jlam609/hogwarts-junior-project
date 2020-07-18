require("./config/passportconfig");
const express = require("express");
const { seed, Session, User } = require("./db");
const apiRouter = require("./api/routers");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const dotenv = require("dotenv");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const findUserBySession = (sessionId) =>
  User.findOne({
    include: [
      {
        model: Session,
        where: {
          id: sessionId,
        },
      },
    ],
  });
app.use(async (req, res, next) => {
  if (!req.cookies.session_id) {
    const session = await Session.create();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    res.cookie("session_id", session.id, {
      path: "/",
      expires: new Date(Date.now() + oneWeek),
    });
    req.session_id = session.id;
    next();
  } else {
    req.session_id = req.cookies.session_id;
    const user = await findUserBySession(req.session_id);
    // console.log('Session User: ', user.get());
    if (user) {
      req.user = user;
    }
    next();
  }
});

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));

app.use("/", apiRouter);

const startServer = () =>
  new Promise(() => {
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  });

seed(true).then(startServer);
