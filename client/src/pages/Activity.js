import React from 'react';
import connectionSymbol from '../asset/img/connection_symbol_white300.svg';
import doubleCircleSymbol from '../asset/img/doubleCircle_symbol_white300.svg';
import sampleImg from '../asset/img/sampleImg.jpg';
import Footer from '../components/Footer';
import Header from '../components/Header';
import localDb from '../config/localDb.json';

function Activity() {
  const headerWording = localDb.headerWording.activity;

  return (
    <React.Fragment>
      <Header title={headerWording.title} content={headerWording.content} />
      <section className="activity">
        <img
          src={connectionSymbol}
          alt="connectionSymbol"
          className="bgImg bgImg--1"
        />
        <img
          src={doubleCircleSymbol}
          alt="doubleCircleSymbol"
          className="bgImg bgImg--2"
        />
        <article className="activity__content">
          <div className="activity__content--word pr">
            <h2 className="content__title">職涯分享</h2>
            <p className="content__paragraph">
              透過社團 Alumni
              分享個人職涯發展心路歷程，與學員進行深度對談交流，發現更多職涯可能性。
            </p>
          </div>
          <div className="activity__content--img pl">
            <img src={sampleImg} alt="sampleImg" />
          </div>
        </article>
        <article className="activity__content activity__content--reverse">
          <div className="activity__content--img pr">
            <img src={sampleImg} alt="sampleImg" />
          </div>
          <div className="activity__content--word pl">
            <h2 className="content__title">成年禮</h2>
            <p className="content__paragraph">
              在兩天的旅行中 Junior 們將重新審視個人學習，Alumni與 Senior
              也將針對每一位 Junior 個人做出全方位的討論交流，讓 Junior
              能為自己的下一步做好準備，同時也準備接下 BizPro 社團，成為
              Senior。
            </p>
          </div>
        </article>
        <article className="activity__content">
          <div className="activity__content--word pr">
            <h2 className="content__title">社團聚會</h2>
            <p className="content__paragraph">
              透過不定期的聚會，Junior 會與 Senior 及 Alumni 聚餐，讓 Junior
              有機會進一步與同儕及各界前輩近一步交流或詢問職涯問題，同時也有助於
              BizProer 們增進感情。
            </p>
          </div>
          <div className="activity__content--img pl">
            <img src={sampleImg} alt="sampleImg" />
          </div>
        </article>
      </section>
      <Footer/>
    </React.Fragment>
  );
}

export default Activity;
