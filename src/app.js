// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv"); instead to this one we can use below codes beause we have used babel. it convert es7 versions to es5
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect } from "./utils/database.connection";
import passport from "passport";
import { googleAuth } from "./configs/google.auth";
import session from "express-session";
import config from "./configs";
import {routesInit} from "./api/routes"
import MongoStore from "connect-mongo";

// require("dotenv").config(); //configure dotnet

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors()); //use cors in our app
app.use(express.json({ limit: "20mb" })); //limit the data comming from json bosy
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl: config.DB_CONNECTION_STRING}),
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 10000),
      maxAge: 10000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (res, req, next) => {
  req.send("<a href='http://localhost:8090/auth/google/'>Login with Google</a>");
  next();
});

app.listen(PORT, () => {
  console.log(` 🚀 Server is up and runnimg on PORT ${PORT}`);
  connect();
  routesInit(app,passport);
  googleAuth(passport);

});
