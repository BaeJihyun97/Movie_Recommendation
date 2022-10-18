import '../sass/Page.scss';

const style = { backgroundImage: "url('./img/main.jpeg')" }

function Page() {
    return (
        <div className="page">
            <div className="bg" style={style}>
                <div>
                    <h1>탑건: 매버릭</h1>
                    <p>최고의 파일럿이자 전설적인 인물 매버릭(톰 크루즈)은 자신이 졸업한 훈련학교 교관으로 발탁된다. 그의 명성을 모르던 팀원들은 매버릭의 지시를 무시하지만 실전을 방불케 하는 상공 훈련에서 눈으로 봐도 믿기 힘든 전설적인 조종 실력에 모두가 압도된다. 매버릭의 지휘아래 견고한 팀워크를 쌓아가던 팀원들에게 국경을 뛰어넘는 위험한 임무가 주어지자 매버릭은 자신이 가르친 동료들과 함께 마지막이 될 지 모를 하늘 위 비행에 나서는데…</p>
                </div>
            </div>
        </div>
    );
}

export default Page;