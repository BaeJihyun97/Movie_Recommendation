import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../sass/Nav.scss';
import React, {useState} from 'react';

const { _, REACT_APP_BASE_BACKEND_URL } = process.env;

function Nav() {

    const navigate = useNavigate();

    const url = REACT_APP_BASE_BACKEND_URL + '/recommendation/recommend/' ;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
      movieTitle: '',
    });

    const {movieTitle} = data;

    const [graphData, setGraphData] = useState([]);
    const [imageData, setImageData] = useState([]);

      const onChange = e => {

        const {name, value} = e.target;
        setData({
        ...data,
        [name]: value
        });
      };


    const sendTitle = async () => {
        let title = document.getElementById("movieTitle");
        console.log(data)

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
    }

    return (
        <header>
            <nav>
                <div className="menu">
                    <Link to="/mainpage">
                        <img src="./img/logo.png" />
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
                        <i className="bi bi-search" onClick={sendTitle}></i>
                        <input id="movieTitle" name="movieTitle" type="text" placeholder="영화 제목을 입력하세요." value={movieTitle} onChange={onChange} />
                    </div>
                    <i className="bi bi-person-fill"></i>
                </div>
            </nav>
        </header>
    );
  }
  
  export default Nav;


  /*
  <input id="title" name="title" placeholder="영화 제목을 입력하세요." />
  <i className="bi bi-search" onClick={sendTitle}></i>
  */