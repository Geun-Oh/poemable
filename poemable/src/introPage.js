import React from 'react';
import { Link } from 'react-router-dom';
import styles from './poemIt.module.scss';
import img from './Group.png';

function IntroPage() {
    return (
        <div className={`${styles.introPage}`}>
            <section className={`${styles.section1}`}>
                <div>
                    <p style={{ textAlign: "left" }}>"</p>
                    <p style={{ textAlign: "center" }}>누구나</p>
                    <p style={{ textAlign: "right" }}>"</p>
                </div>
                <p>쓸 수 있습니다.</p>
            </section>
            <section className={`${styles.section2}`}>
                <div>
                    <p style={{ fontSize: "30px" }}>
                        시는 자신의 마음을 표현할 가장 유용한 도구입니다.
                    </p>
                    <p>
                        짧기 때문에 가벼운 마음으로 쓸 수 있습니다.
                    </p>
                    <br />
                    <br />
                    <p style={{ fontSize: "30px" }}>
                        기존의 방식을 따라갈 이유는 없습니다.
                    </p>
                    <p>
                        운율이나 단어 선택에 얽메이지 않고 자신만의 방식으로 자연스럽게 써내려가면 됩니다.
                    </p>
                </div>
            </section>
            <section className={`${styles.section3}`}>
                <span style={{ textAilgn: "center" }}>우리는 모두가 시에 대한 거부감을 없애고</span>
                <span style={{ textAilgn: "center" }}>자신만의 이야기를 담은 시들을 곁에 두기 원했고</span>
                <span style={{ textAilgn: "center" }}>그렇게 Poemable이 시작되었습니다.</span>
            </section>
            <section className={`${styles.section4}`}>
                <p>POEMABLE | 시를 쓸 수 있는</p>
                <br />
                <br />
                <br />
                <br />
                <p style={{ fontSize: "20px" }}>누구나 마음만 먹으면 쉽게 접할 수 있고 쓸 수 있다는 의미를 담고 있습니다.</p>
            </section>
            <section className={`${styles.section5}`}>
                <div className={`${styles.div}`} style={{ top: "0" }}>
                    <p>제목</p>
                    <br />
                    <span style={{ textAilgn: "center" }}>제목이 꼭 필요하지는 않습니다.</span>
                    <span style={{ textAilgn: "center" }}>때로는 무제가 가장 좋은 제목이 될지도 모르죠.</span>
                </div>
                <div style={{ width: "100vw", height: "1080px", background: "none" }}></div>
                <div className={`${styles.div}`} style={{ top: "30vh" }}>
                <p>내용</p>
                    <br />
                    <span style={{ textAilgn: "center" }}>어떤 말을 쓸지 모르겠다면</span>
                    <span style={{ textAilgn: "center" }}>원하는 단어를 나열해도 좋습니다.</span>
                    <span style={{ textAilgn: "center" }}>말이 되어야만 한다는 법은 없으니까요.</span>
                </div>
                <div style={{ width: "100vw", height: "1080px", background: "none" }}></div>
                <div className={`${styles.div}`} style={{ top: "60vh" }}>
                <p>방식</p>
                    <br />
                    <span>여운이나 운율을 신경 쓸 겨를이 없다면</span>
                    <span>과감히 버려도 괜찮습니다.</span>
                    <span>당신만의 방식을 보여주세요.</span>
                </div>
                <div style={{ width: "100vw", height: "1080px", background: "none" }}></div>
            </section>
            <section className={`${styles.section6}`}>
                <div>
                    <p>지금, 당신의 이야기를 시작해주세요.</p>
                    <p>Your So Poemable!</p>
                    <Link to="/landing"><img src={img} alt="Let's Poem!" /></Link>
                </div>
            </section>
        </div>
    )
}

export default IntroPage;