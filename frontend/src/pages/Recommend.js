import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/movieCard.css';
import '../sass/Recommend.scss';

import { MovieCard } from '../component';
import { Pagination } from '../component';


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

    const { movieTitle } = data;

    const onChange = e => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    };

    const [graphData, setGraphData] = useState([]);
    const [imageData, setImageData] = useState([]);

    const url = REACT_APP_BASE_BACKEND_URL + '/recommendation/recommend/' ;


  const onClick = async () => {
//    try{
//      const reqData = JSON.stringify(data);
//      const response = await axios.post(url, reqData,{
//        headers: {
//          // Overwrite Axios's automatically set Content-Type
//          'Content-Type': 'application/json'
//        }
//      });
//      setResdata(response.data);
//      setLoading(true);
//    } catch (e) {
//      console.log(e);
//      console.log(url);
//    }

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
        {   setGraphData(response.data.graph);
            setImageData(response.data.image);
            console.log(response.data.graph)
            setLoading(true);
        }
    }).catch((error)=> {
        //console.error(error);
        setLoading(false);
    })
  };

  useEffect(() => {
    onClick();
  }, [])

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
                        <li><a href="#">시리즈</a></li>
                        <li><a href="#">영화</a></li>
                        <li><a href="#">NEW! 요즘 대세 콘텐츠</a></li>
                        <li><a href="#">내가 찜한 콘텐츠</a></li>
                        <li><a href="#">언어별로 찾아보기</a></li>
                    </ul>
                </div>
                <div className="right-menu">
                    <div className="search-box">
                        <i className="bi bi-search" onClick={onClick}></i>
                        <input name="movieTitle" type="text" placeholder="영화 제목을 입력하세요." value={movieTitle} onChange={onChange} />
                    </div>
                    <i className="bi bi-person-fill"></i>
                </div>
            </nav>
        </header>

        {/* <h1>영화 탐색</h1>
        <p>비슷한 영화를 보고 싶은 제목을 입력하세요</p>
        <form>
            <input name="movieTitle" type="text" placeholder="영화 제목을 입력하세요." value={movieTitle} onChange={onChange} />
            <button type="button" onClick={onClick}>탐색!</button>
        </form> */}

        {data && <li>{data.name}</li>}
        <h3 className="graph-title">그래프</h3>
        <div className='movieTable' id="movieTable1">
            {graphData.slice(offset1, offset1 + limit).map((resDataE) => <MovieCard key={resDataE.movie_content_seq} movieTitle={resDataE.movieTitle} movieNum={resDataE.movie_content_id}></MovieCard>)}
        </div>

        <Pagination
                total={loading?graphData.length:0}
                limit={limit}
                page={page1}
                setPage={setPage1}
        />

        <h3>이미지</h3>
        <div className='movieTable' id="movieTable2">
            {imageData.slice(offset2, offset2 + limit).map((resDataE) => <MovieCard key={resDataE.movie_content_seq} movieTitle={resDataE.movieTitle} movieNum={resDataE.movie_content_id}></MovieCard>)}
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
