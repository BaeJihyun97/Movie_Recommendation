import '../sass/Page.scss';

const style = { backgroundImage: "url('./img/main.jpeg')" }

function Page() {
    return (
        <div className="page">
            <div className="bg">
                <h1>영화 검색 서비스</h1>
                <p>"넷플릭스 증후군 - 너무 많은 선택권으로 인해 작품을 결정하는 데 어려움을 겪는 것" <br /> 재미있게 보신 영화를 입력해보세요. 다양한 알고리즘을 통해 비슷한 영화를 추천해드립니다.</p>
            </div>
            {/* <img src="/img/image.png" /> */}
        </div>
    );
}

export default Page;