const express = require("express");

const router = express.Router();

const Sauce = require("../models/sauce");

const saucesCtrl = require("../controllers/sauce");

router.get("/", saucesCtrl.getAllSauces);
router.post("/", saucesCtrl.createSauce);
router.get("/:id", saucesCtrl.getOneSauce);
router.put("/:id", saucesCtrl.modifySauce);
router.delete("/:id", saucesCtrl.deleteSauce);

module.exports = router;
