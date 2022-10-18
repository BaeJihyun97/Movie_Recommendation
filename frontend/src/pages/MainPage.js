import Nav from '../component/Nav';
import Page from '../component/Page';
import Content from '../component/Content';
import "../sass/index.scss";

const MainPage = () => {
    return (
        <div>
            <Nav />
            <Page />
            <Content />
        </div>
    )
}

export default MainPage;