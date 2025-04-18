import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/No-Poster (1).png" // Ensure absolute path
        }
        alt={movie.title}
        className="rounded-lg"
      />
      
      <div className="mt-4">
        <h3>{movie.title}</h3>
        <div className="content">
            <div className="rating">
                <img src="/Vector.svg" alt="" /> {/* Ensure absolute path */}
                <p>{movie.vote_average?movie.vote_average.toFixed(1):'N/A'}</p>
            </div>
            <span>.</span>
            <p className="lang">{movie.original_language}</p>
            <span>.</span>
            <p className="year">{movie.release_date?movie.release_date.split('-')[0]:'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
