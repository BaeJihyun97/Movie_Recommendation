import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../component';

import Nav from '../component/Nav';
import Page from '../component/Page';
import Content from '../component/Content';
import "../sass/index.scss";

const MainPage = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({ movieTitle: ''});


    const onChange = e => {
        const {name, value} = e.target;
        setData({
            ...data, [name]: value
        });
    };



    const sendTitle = async () => {
        navigate("/recommend", { state: data });
    }

    

    return (
        <div>
            <Nav onChange={onChange} sendTitle={sendTitle} />
            <Page />
            {/* <Content /> */}
        </div>
    )
}

export default MainPage;