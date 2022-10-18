import MovieComponent from './MovieComponent';
import '../sass/MovieDetail.scss';

const MovieDetail = () => {
    return (
    <div className="movie-detail">
        <div className="movie-container">
            <div>
                <h1>작은 아씨들</h1>
                <img className="movie-img" src="./img/main.jpeg" />
            </div>
            <div className="description">
                <p>설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명</p>
                <p>감독 : </p>
                <p>배우 : </p>
            </div>
        </div>
        <div className="list">
            <h3>비슷한 콘텐츠</h3>
            <div className="slider">
                <MovieComponent />
                <MovieComponent />
                <MovieComponent />
                <MovieComponent />
                <MovieComponent />
                <MovieComponent />
                <MovieComponent />
                <MovieComponent />
            </div>
        </div>
    </div>
    )
}

export default MovieDetail;