import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/movieCard.css';
import '../sass/Recommend.scss';
import { post } from '../utils/sdk';

import { MovieCard, Pagination } from '../component';


const { _, REACT_APP_BASE_BACKEND_URL } = process.env;

const Recommend = () => {

    const {state} = useLocation();
    const [data, setData] = useState(state);

    const [limit, setLimit] = useState(5);
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const offset1 = (page1 - 1) * limit;
    const offset2 = (page2 - 1) * limit;

    const [loading, setLoading] = useState(false);

    const { movieTitle } = data?data:"";

    const [graphData, setGraphData] = useState([]);
    const [imageData, setImageData] = useState([]);


    const onChange = e => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
        localStorage.setItem('title', value);
    };


    const fetchF = async (url, method, data) => {
        return fetch(url,
        {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf8",
            },
            body: JSON.stringify(data),
        }).then(response=>response.json())
        .then(function(response) {
            return response
        }).catch((error)=> {
            console.log(error)
            setLoading(false);
        });
    }

  const onClick = async () => {
    let url = REACT_APP_BASE_BACKEND_URL + '/recommendation/recommend/' ;
    // better way???
    let temp = data? data:{"movieTitle": localStorage.getItem("title")};
    console.log(sessionStorage.getItem("UID"));
    const response = await fetchF(url, "POST", {"data":temp, "uid":sessionStorage.getItem("UID")});


    if(response && response.data)
        {
            setGraphData(response.data.graph);
            setImageData(response.data.image);
            setLoading(true);
        }
  };

  useEffect(() => {
    onClick();
  }, [])



  const updateLiked = (data) => {
    let headers = {
       "Content-Type": "application/json; charset=utf8",
    };
    if (data.liked == 0){

        let url = REACT_APP_BASE_BACKEND_URL + "/service/insertLiked/";
        const response = fetchF(url, "POST", data);
        console.log('response fetchF', response)

        if(response)
            onClick();
        }
    else {
        let url = REACT_APP_BASE_BACKEND_URL + "/service/deleteLiked/";
        const response = fetchF(url, "POST", data);
        console.log('response fetchF', response)

        if(response)
            onClick();
    }
    onClick();
    console.log(graphData);

  }

  return(
    <div className="recommend">
        <header>
            <nav>
                <div className="menu">
                    <Link to="/mainpage">
                        <img src="./img/l_movie.png" />
                    </Link>
                    <ul className="ul-none d-flex">
                        <li><a href="#">홈</a></li>
                        <Link to="/like"><li>내가 찜한 콘텐츠</li></Link>
                    </ul>
                </div>
                <div className="right-menu">
                    <div className="search-box">
                        <i className="bi bi-search" onClick={onClick} ></i>
                        <input name="movieTitle" type="text" placeholder="영화 제목을 입력하세요." value={movieTitle || ''} onChange={onChange} />
                    </div>
                    <i className="bi bi-person-fill"></i>
                </div>
            </nav>
        </header>

        {data && <li>{data.name}</li>}
        <h3 className="graph-title">그래프</h3>
        <div className='movieTable' id="movieTable1">
            {graphData.slice(offset1, offset1 + limit).map((resDataE) => <MovieCard propFunction={updateLiked} key={resDataE.movie_content_seq} liked={resDataE.liked} movieTitle={resDataE.movieTitle} movieNum={resDataE.movie_content_id}></MovieCard>)}
        </div>

        <Pagination
                total={loading?graphData.length:0}
                limit={limit}
                page={page1}
                setPage={setPage1}
        />

        <h3>이미지</h3>
        <div className='movieTable' id="movieTable2">
            {imageData.slice(offset2, offset2 + limit).map((resDataE) => <MovieCard propFunction={updateLiked} key={resDataE.movie_content_seq} liked={resDataE.liked} movieTitle={resDataE.movieTitle} movieNum={resDataE.movie_content_id}></MovieCard>)}
        </div>

        <Pagination
                total={loading?imageData.length:0}
                limit={limit}
                page={page2}
                setPage={setPage2}
        />

    </div>
  );
};

export default Recommend;
