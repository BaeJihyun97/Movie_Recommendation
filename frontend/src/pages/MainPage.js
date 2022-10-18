import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Nav from '../component/Nav';
import Page from '../component/Page';
import Content from '../component/Content';
import "../sass/index.scss";

const { _, REACT_APP_BASE_BACKEND_URL } = process.env;

const MainPage = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ movieTitle: ''});
    // const [graphData, setGraphData] = useState([]);
    // const [imageData, setImageData] = useState([]);
    const [temp, setTemp] = useState({graphData: [], imageData: []});

    const {movieTitle} = data;
    const url = REACT_APP_BASE_BACKEND_URL + '/recommendation/recommend/' ;

    const onChange = e => {
        const {name, value} = e.target;
        setData({
            ...data, [name]: value
        });
    };

    const sendTitle = async () => {
        navigate("/recommend", { state: data });
        // console.log(data)

        // fetch(url,
        // {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json; charset=utf8",
        //     },
        //     body: JSON.stringify(data),
        // }).then(response => response.json())
        // .then((response) => {
        //     //const res = JSON.parse(response.data)
        //     if(response.data)
        //     {   
        //         console.log(response.data.graph);
        //         // setGraphData(response.data.graph);
        //         // setImageData(response.data.image);
        //         setTemp({...temp, graphData: response.data.graph, imageData: response.data.image});
        //         console.log("temp", temp);
        //         navigate("/search", { state: data });
        //         setLoading(true);
        //     }
        // }).catch((error)=> {
        //     setLoading(false);
        // })
    }
    

    return (
        <div>
            <Nav onChange={onChange} sendTitle={sendTitle} />
            <Page />
            <Content />
        </div>
    )
}

export default MainPage;