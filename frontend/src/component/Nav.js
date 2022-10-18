import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../sass/Nav.scss';

function Nav() {

    const navigate = useNavigate();

    const sendTitle = async () => {
        let title = document.getElementById("title");
        console.log(title.value);

    //     await axios.get("", {
    //         params: {title: title}
    //     });
    //    navigate("" + title);
        navigate("/search");
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
                        <input id="title" name="title" placeholder="영화 제목을 입력하세요." />
                    </div>
                    <i className="bi bi-person-fill"></i>
                </div>
            </nav>
        </header>
    );
  }
  
  export default Nav;
  