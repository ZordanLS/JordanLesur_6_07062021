// Importations

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const saucesRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path");
require("dotenv").config();

// Connection à la base de données

mongoose
  .connect(process.env.DATABASE_URL_USER, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json());

// Déclaration des différents chemins

app.use("/api/sauces", saucesRoutes);

app.use("/api/auth", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
