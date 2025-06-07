const express = require("express");
const router = express.Router();
const upload = require("../upload");
const {
  creation,
  viewing,
  singleViewing,
  deletion,
  updation
} = require("../controller/movie.controller");

router.post("/", upload.single("movie_img"), creation);
router.get("/", viewing);
router.get("/:id", singleViewing);
router.delete("/:id", deletion);
router.put("/:id", upload.single("movie_img"), updation);

module.exports = router;
