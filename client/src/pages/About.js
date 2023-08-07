import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Marquee from 'react-fast-marquee';
import Circle4_symbol_white300 from '../asset/img/4Circle_symbol_white300.svg';
import briefIntro_course from '../asset/img/briefIntro_course.webp';
import briefIntro_people from '../asset/img/briefIntro_people.webp';
import vision_bg from '../asset/img/circle_symbol_beige.webp';
import circle_symbol_gradient from '../asset/img/circle_symbol_gradient.svg';
import connection_symbol_red from '../asset/img/connection_symbol_recommandRed.svg';
import connection_symbol from '../asset/img/connection_symbol_white300.svg';
import double_circle from '../asset/img/doubleCircle_symbol_white300_2.svg';
import icon_courage from '../asset/img/icon/icon_courage.svg';
import icon_creativity from '../asset/img/icon/icon_creativity.svg';
import icon_entrepreneurship from '../asset/img/icon/icon_entrepreneurship.svg';
import icon_integrity from '../asset/img/icon/icon_integrity.svg';
import icon_pointDown from '../asset/img/icon/icon_pointDown.svg';
import icon_share from '../asset/img/icon/icon_share.svg';
import icon_trust from '../asset/img/icon/icon_trust.svg';
import logo from '../asset/img/logo_red.svg';
import people_symbol from '../asset/img/people_symbol.svg';
import title_symbol_left_lg from '../asset/img/title_symbol_left_lg.svg';
import title_symbol_left_md from '../asset/img/title_symbol_left_md.svg';
import title_symbol_right_lg from '../asset/img/title_symbol_right_lg.svg';
import title_symbol_right_md from '../asset/img/title_symbol_right_md.svg';
import Footer from '../components/Footer';
import MarqueeLogo from '../components/MarqueeLogo';
import NavBar from '../components/NavBar';
/*
TODO:
- 進入動畫
*/

function About() {
  useEffect(() => {
    let pressTimer;
    $('#aboutHeaderLogo')
      .mouseup(function () {
        clearTimeout(pressTimer);
        // Clear timeout
        return false;
      })
      .mousedown(function () {
        // Set timeout
        pressTimer = window.setTimeout(function () {
          window.location.href = '/backstage';
        }, 3000);
        return false;
      });
  }, []);

  window.addEventListener('scroll', () => {
    if (
      document.getElementById('briefIntro__course').getBoundingClientRect().y -
        window.innerHeight <
      -100
    ) {
      $('.briefIntro__course--img').removeClass('hideToRight');
      $('.briefIntro__course--word').removeClass('hideToLeft');
    }
    if (
      document.getElementById('briefIntro__people').getBoundingClientRect().y -
        window.innerHeight <
      -100
    ) {
      $('.briefIntro__people--img').removeClass('hideToLeft');
      $('.briefIntro__people--word').removeClass('hideToRight');
    }

    if (
      document.getElementById('about__vision--iconList').getBoundingClientRect()
        .y -
        window.innerHeight <
      -240
    ) {
      let timeDelta = 100;
      $('.content--title').removeClass('hideVision');

      $('.content--word').removeClass('hideVision');
      $('.iconList__item--1').removeClass('hideIcon');
      setTimeout(() => {
        $('.iconList__item--2').removeClass('hideIcon');
      }, timeDelta);
      setTimeout(() => {
        $('.iconList__item--3').removeClass('hideIcon');
      }, timeDelta * 2);
      setTimeout(() => {
        $('.iconList__item--4').removeClass('hideIcon');
      }, timeDelta * 3);
      setTimeout(() => {
        $('.iconList__item--5').removeClass('hideIcon');
      }, timeDelta * 4);
      setTimeout(() => {
        $('.iconList__item--6').removeClass('hideIcon');
      }, timeDelta * 5);
    }
    if (
      document
        .getElementById('about__achieve--numberList')
        .getBoundingClientRect().y -
        window.innerHeight <
      -140
    ) {
      $('.achieveRank1').each(function () {
        $(this)
          .prop('Counter', 0)
          .animate(
            {
              Counter: 500,
            },
            {
              duration: 1500,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
      $('.achieveRank2').each(function () {
        $(this)
          .prop('Counter', 0)
          .animate(
            {
              Counter: 100,
            },
            {
              duration: 1000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
      $('.achieveRank3').each(function () {
        $(this)
          .prop('Counter', 0)
          .animate(
            {
              Counter: 150,
            },
            {
              duration: 1200,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
      $('.people_symbol').fadeIn(800);
    }
    if (
      document
        .getElementById('about__achieve--numberList')
        .getBoundingClientRect().y -
        window.innerHeight <
      -200
    ) {
      $('.marquee__item').map((i, logo) => {
        logo.style.transform = 'translate(0px,0px)';
        logo.style.opacity = '1';
      });
    }
  });

  return (
    <React.Fragment>
      <NavBar />
      <section className="about">
        <div className="mouseDot" />
        <article className="about__header">
          <img
            src={connection_symbol}
            alt="connection_symbol"
            className="connection__left"
          />
          <div className="headerImg"></div>
          <img
            src={connection_symbol}
            alt="connection_symbol"
            className="connection__right"
          />
          <img
            src={Circle4_symbol_white300}
            alt="circle_symbol"
            className="circle4"
          />
          <img
            src={logo}
            alt="logo"
            className="about__header--logo"
            id="aboutHeaderLogo"
          />
          <h1 className="about__header--title">BizPro 台大商學研究社</h1>
          <h3 className="about__header--subTitle">
            紮實課程 X 社群連結 X 量身打造
          </h3>
          <div
            className="about__header--readMore"
            onClick={() => {
              document.getElementById('about__intro').scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            <h4 className="readMore--word">下滑瀏覽</h4>
            <img
              src={icon_pointDown}
              alt="icon_pointDown"
              className="readMore--icon"
            />
          </div>
        </article>
        <article className="about__intro" id="about__intro">
          <img
            src={connection_symbol_red}
            alt="connection_symbol"
            className="connection__left"
          />
          <img
            src={connection_symbol_red}
            alt="connection_symbol"
            className="connection__right"
          />
          <div className="about__intro--title sectionTitle sectionTitle--lg">
            <img
              src={title_symbol_left_lg}
              alt="title__symbol_left"
              className="title--symbolLeft"
            />
            <h2 className="title--word">社團起源</h2>
            <img
              src={title_symbol_right_lg}
              alt="title__symbol_right"
              className="title--symbolRight"
            />
          </div>
          <div className="about__intro--title sectionTitle sectionTitle--md">
            <img
              src={title_symbol_left_md}
              alt="title__symbol_left"
              className="title--symbolLeft"
            />
            <h2 className="title--word">社團起源</h2>
            <img
              src={title_symbol_right_md}
              alt="title__symbol_right"
              className="title--symbolRight"
            />
          </div>
          <div className="about__intro--content">
            <div className="content__word">
              <p className="content__word--paragraph">
                BizPro 成立於 2011年，培養「商業專業力」是 BizPro
                重要的核心發展能力之一，在 BizPro
                我們與團隊夥伴一起努力培養商業邏輯思考與創新能力，並探索自己的潛力與長才。我們認為學習這項能力，能培養全面性的問題解決力、對未知的洞察力，使未來在任何領域都能得心應手。
              </p>
              <h4 className="content__word--quote">
                「世界是一個有趣的遊樂場，在 BizPro
                讓自己成為一個有能力的人，去解鎖遊樂場中的遊樂設施」
              </h4>
            </div>
            <div className="content__video">
              <div className="content__video--wrap">
                <img
                  src={circle_symbol_gradient}
                  alt="circle_symbol_gradient"
                  className="content__video--circle1"
                />
                <img
                  src={circle_symbol_gradient}
                  alt="circle_symbol_gradient"
                  className="content__video--circle2"
                />
                <iframe
                  src="https://www.youtube.com/embed/IdNSw0eSkdc?rel=0"
                  title="【BizPro】創辦人專訪｜林竹芸Maggie Lin"
                  frameborder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </article>
        <article className="about__vision">
          <div id="about__vision--content" className="about__vision--content">
            <img
              src={vision_bg}
              alt="circle_symbol_beige"
              className="bgCircle"
            />
            <div className="content--title sectionTitle sectionTitle--lg hideVision">
              <img
                src={title_symbol_left_md}
                alt="title__symbol_left"
                className="title--symbolLeft"
              />
              <h2 className="title--word">社團願景</h2>
              <img
                src={title_symbol_right_md}
                alt="title__symbol_right"
                className="title--symbolRight"
              />
            </div>
            <p className="content--word hideVision">
              BizPro
              的願景為培養充滿能量，且富有創造性的業界領袖人才。我們期許成員在
              BizPro
              團隊中能持續地自我突破，將不可能化為可能，並在進入社會後，能有一顆富足且快樂的心，在各行各業貢獻與分享我們的能力與所學，回饋社會。
              <br /> <br />
              BizPro
              期望能建立同儕、學界、業界三方的橋樑，讓優秀的學生與前輩透過頻繁的互動，創造新的價值，成為各行各業的領袖人才。
            </p>
          </div>
          <div className="about__vision--iconList" id="about__vision--iconList">
            <div className="iconList__item iconList__item--1 hideIcon ">
              <img
                src={icon_courage}
                alt="icon_courage"
                className="iconList__item--icon"
              />
              <div className="iconList__item--content">
                <h4 className="content--title">積極和勇敢 Courage</h4>
                <p className="content--word">
                  積極爭取機會，努力達到目標，並勇於突破自我；一旦認定行動的價值，即使突破常規，仍勇於與眾不同。
                </p>
              </div>
            </div>
            <div className="iconList__item iconList__item--2 hideIcon">
              <img
                src={icon_creativity}
                alt="icon_creativity"
                className="iconList__item--icon"
              />
              <div className="iconList__item--content">
                <h4 className="content--title">創造力 Creativity</h4>
                <p className="content--word">
                  理解創新的意義，珍視靈感的影響，想要跳脫框架思考，不斷激發自己的創造力。
                </p>
              </div>
            </div>
            <div className="iconList__item iconList__item--3 hideIcon">
              <img
                src={icon_trust}
                alt="icon_trust"
                className="iconList__item--icon"
              />
              <div className="iconList__item--content">
                <h4 className="content--title">值得信賴 Trustworthiness</h4>
                <p className="content--word">
                  一旦承諾，無論大小，都用最大的努力去實現。
                </p>
              </div>
            </div>
            <div className="iconList__item iconList__item--4 hideIcon">
              <img
                src={icon_integrity}
                alt="icon_integrity"
                className="iconList__item--icon"
              />
              <div className="iconList__item--content">
                <h4 className="content--title">正直 Integrity</h4>
                <p className="content--word">
                  推動人類進步，為世界帶來正面的影響。
                </p>
              </div>
            </div>
            <div className="iconList__item iconList__item--5 hideIcon">
              <img
                src={icon_share}
                alt="icon_share"
                className="iconList__item--icon"
              />
              <div className="iconList__item--content">
                <h4 className="content--title">
                  分享和貢獻 Sharing ＆ Contribution
                </h4>
                <p className="content--word">
                  理解分享、貢獻的價值，並且身體力行。
                </p>
              </div>
            </div>
            <div
              className="iconList__item iconList__item--6 hideIcon"
              style={{ marginBottom: '0px' }}
            >
              <img
                src={icon_entrepreneurship}
                alt="icon_entrepreneurship"
                className="iconList__item--icon"
              />
              <div className="iconList__item--content">
                <h4 className="content--title">企業家精神 Entrepreneurship</h4>
                <p className="content--word">
                  樂於探索未知，理解堅持的價值，並願意不遺餘力地實現心中的藍圖。
                </p>
              </div>
            </div>
          </div>
        </article>
        <article className="about__achieve">
          <img
            src={people_symbol}
            alt="people_symbol"
            className="people_symbol"
          />
          <div
            className="about__achieve--title sectionTitle sectionTitle--lg"
            style={{ marginBottom: '40px' }}
          >
            <img
              src={title_symbol_left_lg}
              alt="title__symbol_left"
              className="title--symbolLeft"
            />
            <h2 className="title--word whiteWord">社群影響力</h2>
            <img
              src={title_symbol_right_lg}
              alt="title__symbol_right"
              className="title--symbolRight"
            />
          </div>

          <div className="about__achieve--title sectionTitle sectionTitle--md">
            <img
              src={title_symbol_left_md}
              alt="title__symbol_left"
              className="title--symbolLeft"
            />
            <h2 className="title--word whiteWord">社群影響力</h2>
            <img
              src={title_symbol_right_md}
              alt="title__symbol_right"
              className="title--symbolRight"
            />
          </div>

          <p className="about__achieve--content">
            BizPro
            齊聚正向、積極、創新的夥伴，我們期許夥伴在經歷社團培訓後能為世界上各個領域帶來正向影響。
          </p>
          <div
            id="about__achieve--numberList"
            className="about__achieve--numberList"
          >
            <div className="numberList__item">
              <h1 className="numberList__item--title">
                <span className="achieveRank1">0</span> +
              </h1>
              <h4 className="numberList__item--content">
                小時商業專業能力訓練
              </h4>
            </div>
            <div className="numberList__item">
              <h1 className="numberList__item--title">
                <span className="achieveRank2">0</span> +
              </h1>
              <h4 className="numberList__item--content">位社團 Alumni 成員</h4>
            </div>
            <div className="numberList__item" style={{ margin: '0px' }}>
              <h1 className="numberList__item--title">
                <span className="achieveRank3">0</span> +
              </h1>
              <h4 className="numberList__item--content">個企業人脈連結</h4>
            </div>
          </div>
        </article>
        <Marquee className="marquee" gradientWidth={0}>
          <MarqueeLogo />
        </Marquee>
        <article className="about__briefIntro">
          <img
            src={double_circle}
            alt="double_circle"
            className="double_circle"
          />
          <img
            src={connection_symbol}
            alt="connection_symbol"
            className="connection_symbol"
          />
          <div className="briefIntro__course" id="briefIntro__course">
            <div className="briefIntro__course--word hideToLeft">
              <h2 className="word--title">BizPro 的商業專業能力訓練</h2>
              <p className="word--content">
                BizPro
                透過系列課程、個案分析，以及專案實作提供社員完整的商業專業能力訓練。透過來自業界的
                Alumni
                教學系列課程，讓社員從基礎培養解決商業問題的能力，並透過個案分析與專業實作，更貼近實務，全方位提升社員的專業能力。
              </p>
              <Button variant="primary" href="/journey">
                了解專業訓練內容
              </Button>
            </div>
            <div
              className="briefIntro__course--img hideToRight"
              style={{ backgroundImage: `url(${briefIntro_course})` }}
            />
          </div>
          <div className="briefIntro__people" id="briefIntro__people">
            <div
              className="briefIntro__people--img hideToLeft"
              style={{ backgroundImage: `url(${briefIntro_people})` }}
            />
            <div className="briefIntro__people--word hideToRight">
              <h2 className="word--title">BizPro 社員人脈連結</h2>
              <p className="word--content">
                BizPro 創立至今已累積超過 100
                位社員，社員來自國立台灣大學各個校系，多元分布於各個產業與公司，並與
                BizPro 保持密切的連結。BizPro
                緊密的社群，能夠提供社員交流與共同學習、成長的養分。
              </p>
              <Button variant="primary" href="/members">
                了解歷屆社員
              </Button>
            </div>
          </div>
        </article>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default About;
