const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "542ff061735a40d2ae92fa2a4b608d6e",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("unable to work with the API");
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      return res.status(400).json("Unable to get entries");
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
