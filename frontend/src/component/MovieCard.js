import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import '../css/movieCard.css';


const MovieCard = (props) => {
    const path = process.env.PUBLIC_URL + "/poster/movie_" + props.movieNum + ".jpg"
    const path2 = process.env.PUBLIC_URL + "/img/heart.png"
    const path3 = process.env.PUBLIC_URL + "/img/heart_empty.png"
    const navigate = useNavigate();

    const submitLiked = () => {
        if (sessionStorage.getItem("UID") != null)
            props.propFunction({"liked_movie": props.movieNum, "liked": props.liked, "uid":sessionStorage.getItem("UID")})
        else
            navigate("/login");
    }

    return (
        <div id='card'>
            <div id='poster'>
                <img src={path} alt={props.movieTitle}></img>
            </div>

            <div>
            <button onClick={submitLiked}>
                {
                    props.liked?<img src={path2} alt={0}></img>:<img src={path3} alt={1}></img>

                }
                </button>
            </div>

            <div id='metaData'>
                {props.movieTitle}
            </div>
        </div>
    );
};

export default MovieCard;