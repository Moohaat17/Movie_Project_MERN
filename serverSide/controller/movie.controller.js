const { Movie } = require("../models/movie.model");

exports.creation = async (req, res) => {
  try {
    const { movie_name, genre, ratings } = req.body;
    const movie_img = req.file ? `/uploads/${req.file.filename}` : '';

    const movie = await Movie.create({
      movie_name,
      genre,
      ratings,
      movie_img,
    });

    res.json({ message: "Movie created successfully!", movie });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.viewing = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ success: true, movies });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

exports.singleViewing = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json({ success: true, movie });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

exports.deletion = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Movie deleted!" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

exports.updation = async (req, res) => {
  try {
    const { movie_name, genre, ratings } = req.body;
    const updateData = { movie_name, genre, ratings };

    if (req.file) updateData.movie_img = `/uploads/${req.file.filename}`;

    const updated = await Movie.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({ success: true, message: "Movie updated!", updated });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
