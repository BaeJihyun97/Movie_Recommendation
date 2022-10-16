import React from 'react';
import '../css/movieCard.css';

const MovieCard = (props) => {

    const path = process.env.PUBLIC_URL + "/poster/movie_" + props.movieNum + ".jpg"
    return (
        <div id='card'>
            <div id='poster'>
                <img src={path} alt={props.movieTitle}></img>
            </div>

            <div id='metaData'>
                {props.movieTitle}
            </div>
        </div>
    );
};

export default MovieCard;