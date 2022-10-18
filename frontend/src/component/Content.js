import '../sass/Content.scss';
import MovieComponent from "./MovieComponent";
import MovieCard from './MovieCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { _, REACT_APP_BASE_BACKEND_URL } = process.env;

function Content(props) {

    const url = REACT_APP_BASE_BACKEND_URL + '/recommendation/recommend/' ;

    let graph = [];
    let image = [];
    const {state} = useLocation();
    console.log("state", state);
    const [data, setData] = useState(state);
    const [loading, setLoading] = useState(false);
    const [graphData, setGraphData] = useState([]);
    // const [imageData, setImageData] = useState([]);
    // const [temp, setTemp] = useState({graphData: [], imageData: []});

    
    
    useEffect(() => {
        fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf8",
                },
                body: JSON.stringify(data),
            }).then(response => response.json())
            .then((response) => {
                //const res = JSON.parse(response.data)
                if(response.data)
                {   
                    console.log(response.data.graph);
                    setGraphData(response.data.graph);
                    graph.push(response.data.graph);
                    image.push(response.data.image);
                    // setImageData(response.data.image);
                    // setTemp({...temp, graphData: response.data.graph, imageData: response.data.image});
                    console.log("graph", graph);
                    console.log("image", image);
                    setLoading(true);
                }
            }).catch((error)=> {
                setLoading(false);
            })
    }, [])

    return (
        <div className="contents">
            <div className="list" style={{color: "white"}}>
            <p>ddddd</p>
            {image.length}
            {image.map((resDataE) => {
                return (<>
                    <p>ddddd</p>
                    
                    {resDataE.movieTitle}
                    <MovieCard key={resDataE.movie_content_seq} movieTitle={resDataE.movieTitle} movieNum={resDataE.movie_content_id}></MovieCard>
                </>)
            })}
                {/* <h3>내가 찜한 콘텐츠</h3>
                <div className="slider">
                    <MovieComponent />
                    <MovieComponent />
                    <MovieComponent />
                    <MovieComponent />
                    <MovieComponent />
                    <MovieComponent />
                    <MovieComponent />
                    <MovieComponent />
                </div> */}
            </div>
        </div>
    )
}

export default Content;