// Importations

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:Zordan389@cluster0.xsqei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

const Sauce = require('./models/Sauce');

const User = require('./models/User');

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json());

// Middlewares POST

app.post("/api/sauces", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
});

app.post("/api/sauces/:id", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
});

app.post("/api/sauces/:id/like", (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: "Objet créé !",
    });
  });

// Middlewares GET

app.use("/api/sauces", (req, res, next) => {
  const stuff = [];
  res.status(200).json(stuff);
});

app.use("/api/sauces/:id", (req, res, next) => {
  const stuff = [];
  res.status(200).json(stuff);
});

module.exports = app;
