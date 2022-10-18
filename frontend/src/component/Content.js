import '../sass/Content.scss';
import MovieComponent from "./MovieComponent";


function Content() {
    return (
        <div className="contents">
            <div className="list">
                <h3>내가 찜한 콘텐츠</h3>
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
            <div className="list">
                <h3>지금 뜨는 콘텐츠</h3>
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
            <div className="list">
                <h3>로맨틱한 영화</h3>
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

export default Content;