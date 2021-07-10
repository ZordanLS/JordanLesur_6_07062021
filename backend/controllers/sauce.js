const Sauce = require("../models/sauce");
const fs = require("fs");

// Fonction de création d'une sauce

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
  });
  console.log(sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Fonction de récupération des informations d'une sauce

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((Sauce) => {
      res.status(200).json(Sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Fonction de modification d'une sauce

exports.modifySauce = (req, res, next) => {
  const sauceObjet = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
    .then(() => res.status(201).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error: error }));
};

// Fonction de suppression d'une sauce

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Fonction de récupération des informations de toutes les sauces

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((Sauces) => {
      res.status(200).json(Sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Fonctions pour les différents cas de figure like/dislike

function Like(idSauce, idUser, res) {
  Sauce.updateOne(
    { _id: idSauce },
    {
      $inc: { likes: 1 },
      $push: { usersLiked: idUser },
    }
  )
    .then(() => res.status(201).json({ message: "Sauce mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
}

function Dislike(idSauce, idUser, res) {
  Sauce.updateOne(
    { _id: idSauce },
    {
      $inc: { dislikes: 1 },
      $push: { usersDisliked: idUser },
    }
  )
    .then(() => res.status(201).json({ message: "Sauce mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
}

function removeLike(idSauce, idUser, res) {
  Sauce.updateOne(
    { _id: idSauce },
    {
      $inc: { likes: -1 },
      $pull: { usersLiked: idUser },
    }
  )
    .then(() => res.status(201).json({ message: "Sauce mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
}

function removeDislike(idSauce, idUser, res) {
  Sauce.updateOne(
    { _id: idSauce },
    {
      $inc: { dislikes: -1 },
      $pull: { usersDisliked: idUser },
    }
  )
    .then(() => res.status(201).json({ message: "Sauce mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
}

// Fonction globale like/dislike qui appelle les fonctions précédentes avec switch pour gérer les différents cas de figure et avoir une meilleure structure qu'avec des if/else

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauceInfos) => {
    switch (req.body.like) {
      case 0:
        for (let i = 0; i < sauceInfos.usersLiked.length; i++) {
          if (sauceInfos.usersLiked[i]) {
            return removeLike(req.params.id, req.body.userId, res);
          }
        }
        return removeDislike(req.params.id, req.body.userId, res);
      case 1:
        return Like(req.params.id, req.body.userId, res);
      case -1:
        return Dislike(req.params.id, req.body.userId, res);
      default:
        res.status(404).json({ error });
        return;
    }
  });
};
