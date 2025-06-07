import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const MovieForm = () => {
  const { handleSubmit, register, reset } = useForm();
  const [allMovies, setAllMovies] = useState([]);
  const [edit, setEdit] = useState(null);

  const viewMovies = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies`);
      if (res.data.success) {
        setAllMovies(res.data.movies);
      }
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/movies/${id}`);
      viewMovies();
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  const updateMovie = (movie) => {
    reset({
      movie_name: movie.movie_name,
      genre: movie.genre,
      ratings: movie.ratings,
    });
    setEdit(movie);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("movie_name", data.movie_name);
    formData.append("genre", data.genre);
    formData.append("ratings", data.ratings);
    if (data.movie_img?.[0]) {
      formData.append("movie_img", data.movie_img[0]);
    }

    try {
      if (edit) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/movies/${edit._id}`,
          formData
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/movies`, formData);
      }

      reset({
        movie_name: "",
        genre: "",
        ratings: "",
        movie_img: null,
      });
      setEdit(null);
      viewMovies();
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  useEffect(() => {
    viewMovies();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <form
          className="col-lg-6 mx-auto my-5 p-5 shadow"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Movie Name"
              {...register("movie_name")}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Genre"
              {...register("genre")}
            />
          </div>
          <div className="mt-4">
            <label className="form-label">Select Rating</label>
            <div className="d-flex gap-3">
              {[1, 2, 3, 4, 5].map((r) => (
                <div className="form-check" key={r}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={r}
                    {...register("ratings")}
                    id={`rating${r} Star`}
                  />
                  <label className="form-check-label" htmlFor={`rating${r}`}>
                    {r}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <input
              type="file"
              className="form-control"
              {...register("movie_img")}
            />
          </div>
          <div className="mt-4">
            {edit ? (
              <button className="btn btn-warning">Update</button>
            ) : (
              <button className="btn btn-success">Submit</button>
            )}
          </div>
        </form>
      </div>

      <div className="row">
        {allMovies.map((movie) => (
          <div key={movie._id} className="col-lg-4 col-md-6 col-sm-12 my-3">
            <div className="card shadow">
              <img
                src={`${import.meta.env.VITE_MEDIA_URL}${movie.movie_img}`}
                className="card-img-top"
                alt={movie.movie_name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.movie_name}</h5>
                <p className="card-text">Genre: {movie.genre}</p>
                <p className="card-text">Rating: {movie.ratings}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning"
                    onClick={() => updateMovie(movie)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMovie(movie._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieForm;
