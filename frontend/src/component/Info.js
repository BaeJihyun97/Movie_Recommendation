import "../sass/Info.scss";

const Info = () => {
    return(
        <div className="info">
            <p>다음과 관련된 콘텐츠:</p>
            <ul className="ul-none d-flex">
                <li>행복</li>
                <span>|</span>
                <li>슬픔</li>
                <span>|</span>
                <li>이병헌</li>
            </ul>
        </div>
    )
}

export default Info;