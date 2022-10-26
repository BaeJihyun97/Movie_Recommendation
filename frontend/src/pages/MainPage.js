import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../component/Nav';
import Page from '../component/Page';
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

    const style = {
        width: "100%",
        height: "100%",
    }

    return (
        <div style={style}>
            <Nav onChange={onChange} sendTitle={sendTitle} />
            <Page />
        </div>
    )
}

export default MainPage;