const { Schema, model } = require("mongoose");
const { common } = require("./common");

const movieSchema = new Schema({
    movie_name: common,
    genre: common,
    ratings: {
        ...common,
        type:Number
    },
    movie_img: {
        ...common,
        required:false
    },
}, { timestamps: true })

exports.Movie = model('movie',movieSchema);