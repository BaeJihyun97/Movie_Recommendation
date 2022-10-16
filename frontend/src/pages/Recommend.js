import React, {useState} from 'react';
import axios from 'axios';
import '../css/movieCard.css';

import { MovieCard } from '../component';
import { Pagination } from '../component';


const { _, REACT_APP_BASE_BACKEND_URL } = process.env;

const Recommend = () => {


  const [limit, setLimit] = useState(5);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const offset1 = (page1 - 1) * limit;
  const offset2 = (page2 - 1) * limit;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    movieTitle: '',
  });

  const {movieTitle} = data;

  const onChange = e => {
    const {name, value} = e.target;
    setData({
    ...data,
    [name]: value
    });
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


  return(
    <div>
      <h1>영화 탐색</h1>
      <p>비슷한 영화를 보고 싶은 제목을 입력하세요</p>
        <form>
          제목 : <input name="movieTitle" type="text" placeholder="제목을 입력하세요" value={movieTitle} onChange={onChange} /><br />
          <button type="button" onClick={onClick}>탐색!</button>
        </form>
      <br /><br />
      {data && <li>{data.name}</li>}

      <div className='movieTable' id="movieTable1">
        {graphData.slice(offset1, offset1 + limit).map((resDataE) => <MovieCard key={resDataE.movie_content_seq} movieTitle={resDataE.movieTitle} movieNum={resDataE.movie_content_id}></MovieCard>)}
      </div>

      <Pagination
            total={loading?graphData.length:0}
            limit={limit}
            page={page1}
            setPage={setPage1}
      />

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
