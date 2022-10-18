import Nav from '../component/Nav';
import Content from '../component/Content';
import Info from '../component/Info';
import "../sass/index.scss";

const MainPage = () => {
    return (
        <div>
            <Nav />
            <Info />
            <Content />
        </div>
    )
}

export default MainPage;