import $ from 'jquery';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import circle4 from '../asset/img/4Circle_symbol_white300.svg';
import briefIntro_people from '../asset/img/briefIntro_people.webp';
import connectionSymbol from '../asset/img/connection_symbol_white300.svg';
import dot_symbol from '../asset/img/dot_symbol_white100.svg';
import dot_symbol_grey from '../asset/img/dot_symbol_white300.svg';
import dubbleCircle from '../asset/img/doubleCircle_symbol_white300_2.svg';
import hbsCase from '../asset/img/hbsCase.webp';
import icon_advancedHypo from '../asset/img/icon/icon_advancedHypo.svg';
import icon_basicHypo from '../asset/img/icon/icon_basicHypo.svg';
import icon_communication from '../asset/img/icon/icon_communication.svg';
import icon_down from '../asset/img/icon/icon_down.svg';
import icon_interview from '../asset/img/icon/icon_interview.svg';
import icon_mece from '../asset/img/icon/icon_mece.svg';
import icon_powerpoint from '../asset/img/icon/icon_powerpoint.svg';
import icon_pyramid from '../asset/img/icon/icon_pyramid.svg';
import icon_qualitative from '../asset/img/icon/icon_qualitative.svg';
import icon_quantitative from '../asset/img/icon/icon_quantitative.svg';
import icon_questionnaire from '../asset/img/icon/icon_questionnaire.svg';
import icon_speach from '../asset/img/icon/icon_speach.svg';
import juniorProject from '../asset/img/juniorProject.webp';
import junior_courseStructure from '../asset/img/junior_courseStructure.webp';
import leanCase from '../asset/img/leanCase.webp';
import lifeCase from '../asset/img/lifeCase.webp';
import seniorCourseImg from '../asset/img/seniorCourseImg.webp';
import seniorProjectImg from '../asset/img/seniorProjectImg.webp';
import title_symbol_left_lg from '../asset/img/title_symbol_left_lg.svg';
import title_symbol_left_md from '../asset/img/title_symbol_left_md.svg';
import title_symbol_right_lg from '../asset/img/title_symbol_right_lg.svg';
import title_symbol_right_md from '../asset/img/title_symbol_right_md.svg';
import toggle_symbol from '../asset/img/toggle_symbol.svg';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import localDb from '../config/localDb.json';
function Journey() {
  const headerWordingJunior = localDb.headerWording.journey.junior;
  const headerWordingSenior = localDb.headerWording.journey.senior;
  const headerWordingAlumni = localDb.headerWording.journey.alumni;

  const [tab, setTab] = useState('junior');

  const JuniorIconItem = ({ icon, title }) => (
    <div className="iconSet__items">
      <img src={icon} alt="icon_basicHypo" className="iconSet__items--icon" />
      <h4 className="iconSet__items--title">{title}</h4>
    </div>
  );
  const Junior = () => (
    <section className="junior">
      <article className="courseStructure">
        <img src={circle4} alt="circle4" className="circle4" />
        <img src={dubbleCircle} alt="dubbleCircle" className="dubbleCircle" />
        <div className="courseStructure__intro">
          <div className="courseStructure__intro--content">
            <div className="content--title sectionTitle sectionTitle--md">
              <img
                src={title_symbol_left_md}
                alt="title__symbol_left"
                className="title--symbolLeft"
              />
              <h2 className="title--word">課程架構</h2>
              <img
                src={title_symbol_right_md}
                alt="title__symbol_right"
                className="title--symbolRight"
              />
            </div>
            <div className="content--title sectionTitle sectionTitle--lg">
              <img
                src={title_symbol_left_lg}
                alt="title__symbol_left"
                className="title--symbolLeft"
              />
              <h2 className="title--word">課程架構</h2>
              <img
                src={title_symbol_right_lg}
                alt="title__symbol_right"
                className="title--symbolRight"
              />
            </div>
            <p className="content--paragraph" style={{ marginBottom: '16px' }}>
              Senior 將邀請具相關領域或專長的 Alumni
              作為講師，讓課程不限縮於教科書式的內容，更能融入業界實務的觀點來活用各式技能；整體課程設計以假說思考作為主軸，重視實際練習的過程，讓不同背景與經驗的成員都能跟著課程步調一步步學習。
            </p>
            <p className="content--paragraph">
              為了因應每屆社員不同的組成，Senior 會根據每屆 Junior
              的學習需求，與 Alumni
              討論並調整課程內容，或進行整體課程的刪減與添加。
            </p>
          </div>
          <div className="courseStructure__intro--img">
            <img
              src={junior_courseStructure}
              alt="courseStructureImg"
              className="courseStructureImg"
            />
          </div>
        </div>
        <div className="courseStructure__infos">
          <div className="courseStructure__infos--container containerMR">
            <h3 className="container__title">Info-In 階段</h3>
            <div className="container__content">
              <p className="container__content--words">
                在資料搜集階段，假說思考強調先建立假設，再針對如何驗證假設找資料。透過20%的資料，能夠省去
                80%
                原本大海撈針要花費的時間。而針對專案問題建立議題樹，更能協助釐清目前問題的著力點，以更高效率的方式拆解問題。
              </p>
              <div className="container__content--iconSet">
                <JuniorIconItem icon={icon_basicHypo} title="初階假說思考" />
                <JuniorIconItem icon={icon_interview} title="群體/個人訪談" />
                <JuniorIconItem icon={icon_qualitative} title="質化訪綱設計" />
                <JuniorIconItem
                  icon={icon_questionnaire}
                  title="量化問卷設計"
                />
              </div>
            </div>
          </div>
          <img
            src={icon_down}
            alt="icon_down"
            className="nextIcon containerMR"
          />
          <div className="courseStructure__infos--container containerMR">
            <h3 className="container__title">Info-Process 階段</h3>
            <div className="container__content">
              <p className="container__content--words">
                在資料分析階段，一個清晰的提案強調故事線邏輯，透過層層論證後的問題拆解，產出對應專案問題嚴謹的解方。我們安排社員學習建構故事邏輯，將所得資料進行分析與研究後，產出最具說服力的提案。
              </p>
              <div className="container__content--iconSet">
                <JuniorIconItem icon={icon_advancedHypo} title="進階假說思考" />
                <JuniorIconItem icon={icon_mece} title="MECE 原則" />
                <JuniorIconItem icon={icon_pyramid} title="金字塔原理" />
                <JuniorIconItem icon={icon_quantitative} title="量化分析模型" />
              </div>
            </div>
          </div>
          <img
            src={icon_down}
            alt="icon_down"
            className="nextIcon containerMR"
          />
          <div className="courseStructure__infos--container">
            <h3 className="container__title">Info-Out 階段</h3>
            <div className="container__content">
              <p className="container__content--words">
                在資料呈現階段，商業簡報強調在視覺上快速讓讀者理解提案，透過簡報設計，將故事線邏輯可視化。此外，在簡報設計、口頭報告皆強調以結論先行的方式，最高效率讓聽者抓到提案重點。
              </p>
              <div className="container__content--iconSet">
                <JuniorIconItem icon={icon_advancedHypo} title="進階假說思考" />
                <JuniorIconItem icon={icon_powerpoint} title="提案簡報設計" />
                <JuniorIconItem icon={icon_speach} title="提案報告技巧" />
                <JuniorIconItem icon={icon_communication} title="溝通與表達" />
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="caseStudy">
        <img src={dot_symbol} alt="dot_symbol" className="dotSymbolImg" />
        <div className="content--title sectionTitle sectionTitle--lg">
          <img
            src={title_symbol_left_lg}
            alt="title__symbol_left"
            className="title--symbolLeft"
          />
          <h2 className="title--word">個案分析</h2>
          <img
            src={title_symbol_right_lg}
            alt="title__symbol_right"
            className="title--symbolRight"
          />
        </div>
        <div className="content--title sectionTitle sectionTitle--md">
          <img
            src={title_symbol_left_md}
            alt="title__symbol_left"
            className="title--symbolLeft"
          />
          <h2 className="title--word">個案分析</h2>
          <img
            src={title_symbol_right_md}
            alt="title__symbol_right"
            className="title--symbolRight"
          />
        </div>
        <div className="caseStudy__hbs">
          <div className="caseStudy__hbs--img">
            <img src={hbsCase} alt="hbsCase" className="hbsCaseImg" />
          </div>
          <div className="caseStudy__hbs--content">
            <h2 className="content--title">HBS Case</h2>
            <p className="content--paragraph" style={{ marginBottom: '16px' }}>
              BizPro 學期間包含 2 - 3 次哈佛商業個案（Harvard Business School
              Case ，簡稱 HBS case）訓練課程，Junior
              根據個案內容設定自身角色，獨自拆解個案，並以
              Info-In、Info-Process、Info-out 之完整專案規格製作簡報，並向
              Alumni 進行口頭提案。
            </p>
            <p className="content--paragraph">
              以企業經典案例作為個案題材，Junior
              們將練習在短時間內處理質量化資料、鍛鍊假說思考，並完成顧問式提案的能力。此外，也將藉由
              Alumni 的回饋進行問題定義、研究方向、簡報製作等各面向的修正。
            </p>
          </div>
        </div>
        <div className="caseStudy__lean">
          <div className="caseStudy__lean--content">
            <h2 className="content--title">Lean Case</h2>
            <p className="content--paragraph" style={{ marginBottom: '16px' }}>
              BizPro 學期間包含一次 Lean Case 課程。 Junior
              將在課前研究預先提供的個案資料，再以團體形式於課堂中向 Alumni
              評審提案；收穫回饋後進行現場修正，共進行 2 - 3 次的提案 - 回饋 -
              修正循環。
            </p>
            <p className="content--paragraph">
              以團體形式規劃故事線，練習統合不同的意見成為共識，並將之轉化為具有洞見的提案。此外，
              Junior 也可藉由 Lean Case 培養快速消化回饋、修正提案的能力。
            </p>
          </div>
          <div className="caseStudy__lean--img">
            <img src={leanCase} alt="leanCase" className="hbsCaseImg" />
          </div>
        </div>
      </article>
      <article className="project">
        <img
          src={connectionSymbol}
          alt="connectionSymbol"
          className="connectionSymbol-1"
        />
        <img
          src={connectionSymbol}
          alt="connectionSymbol"
          className="connectionSymbol-2"
        />
        <div className="content--title sectionTitle sectionTitle--lg">
          <img
            src={title_symbol_left_lg}
            alt="title__symbol_left"
            className="title--symbolLeft"
          />
          <h2 className="title--word">專案實作</h2>
          <img
            src={title_symbol_right_lg}
            alt="title__symbol_right"
            className="title--symbolRight"
          />
        </div>
        <div className="content--title sectionTitle sectionTitle--md">
          <img
            src={title_symbol_left_md}
            alt="title__symbol_left"
            className="title--symbolLeft"
          />
          <h2 className="title--word">專案實作</h2>
          <img
            src={title_symbol_right_md}
            alt="title__symbol_right"
            className="title--symbolRight"
          />
        </div>
        <div className="project__jp" style={{ marginBottom: '80px' }}>
          <div className="project__jp--title">
            <h2 className="jp__title--title">Junior Project</h2>
            <p className="jp__title--content">
              BizPro Junior 學期間的重大任務為其個人學期專案，Junior
              們將根據個人感興趣的領域，自行設定題目並在為期一學期的時間，針對該題目進行研究與提案。分別於學期初、中、末向
              Alumni 及業界評審進行提案報告。
            </p>
          </div>
          <div className="project__jp--content">
            <div className="content--img">
              <img src={juniorProject} alt="juniorProject" />
            </div>
            <div className="content--feature">
              <div className="feature__item">
                <h4 className="feature__item--title">個人專案管理</h4>
                <p className="feature__item--content">
                  面對為期一學期的個人大型專案， Junior
                  將學習如何進行個人專案管理，以超過一般大學課程的標準，訓練專案規劃、執行、掌控進度的能力。
                </p>
              </div>
              <div className="feature__item">
                <h4 className="feature__item--title">職涯領域研究</h4>
                <p className="feature__item--content">
                  Junior
                  們在選擇個人學期專案題目時，可根據個人偏好之產業進行研究，深入探索與未來職涯相關的領域。此外，也可透過專家訪談或與相關領域
                  Alumni 互動，瞭解該產業之利害關係人、實務經驗、商業模式。
                </p>
              </div>
              <div className="feature__item" style={{ margin: '0px' }}>
                <h4 className="feature__item--title">假說思考訓練</h4>
                <p className="feature__item--content">
                  Junior 們將實際應用假說思考於 Info-In、Info-Process、Info-Out
                  三大課程主軸；透過學期初、中、末三次的報告，與 Alumni
                  和業界評審交流並持續修正成長。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="project__lc">
          <div className="project__lc--title">
            <h2 className="jp__title--title">Life Case</h2>
            <p className="jp__title--content">
              BizPro Junior 將於學期間配合實際企業業主，進行為期 5
              週的團體實務專案，解決真實世界（Real
              Life）問題。透過每週例會溝通，針對企業問題進行研究並提案，並於最終向企業、Alumni
              進行結案報告。
            </p>
          </div>
          <div className="project__lc--content">
            <div className="content--img">
              <img src={lifeCase} alt="lifeCase" />
            </div>
            <div className="content--feature">
              <div className="feature__item">
                <h4 className="feature__item--title">實務經驗累積</h4>
                <p className="feature__item--content">
                  透過業主提供之真實問題，Junior 進行 Life Case
                  時將能與企業深度交流，並權衡提案需求、企業文化、業主期待等多重面向，調整提案內容，最終產出具備執行價值的提案。
                </p>
              </div>
              <div className="feature__item">
                <h4 className="feature__item--title">業主期待管理</h4>
                <p className="feature__item--content">
                  在多次與業主交流的過程中，Junior
                  將從中練習對焦業主期待、向上管理技巧，以有效產出讓業主滿意的成果。
                </p>
              </div>
              <div className="feature__item" style={{ margin: '0px' }}>
                <h4 className="feature__item--title">團體專案研究</h4>
                <p className="feature__item--content">
                  Life Case 是 Junior
                  們第一次以團體形式提案，練習在討論過程中將不同的意見彙整為共識。來自多元背景的
                  Junior 們更能夠在相互交流中各取所長、互相學習。
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bottomNavGroup">
          <div className="prevButton">
            <h4>{'<'} 查看 Junior</h4>
          </div>
          <div className="nextButton">
            <h4>查看 Senior {'>'} </h4>
          </div>
        </div> */}
      </article>
    </section>
  );
  const Senior = () => (
    <section className="senior">
      <img src={dot_symbol_grey} alt="dot_symbol_grey" className="dot_symbol" />
      <img src={dubbleCircle} alt="dubbleCircle" className="dubbleCircle" />
      <article className="senior__course">
        <div className="senior__course--img">
          <img src={seniorCourseImg} alt="seniorCourseImg" />
        </div>
        <div className="senior__course--content">
          <h2 className="content--title">Senior Course</h2>
          <div className="contentContainer">
            <p className="content--paragraph">
              經歷 Junior 時期的系統化培訓後，具備基礎商業能力的 Senior
              可以更自由地依照自身需求或興趣規劃相應增能課程。從職場實用技巧、產業所需技能到多元職涯分享，Senior
              可彈性運用 BizPro 資源客製化個人學習旅程。
            </p>
            <div className="content--toggleList">
              <div
                className="toggleItem toggleItem--1"
                onClick={() => {
                  const height = $('.toggleItem--1').css('height');
                  if (height === '38px') {
                    $('.toggleItem--3').css('height', '38px');
                    $('.toggleItem--2').css('height', '38px');
                    $('.toggleItem--1').css('height', '116px');
                    $('.toggle_symbol--1').css('transform', 'rotate(90deg)');
                  } else {
                    $('.toggleItem--1').css('height', '38px');
                    $('.toggle_symbol--1').css('transform', 'rotate(0deg)');
                  }
                }}
              >
                <div className="toggleItem--title">
                  <img
                    src={toggle_symbol}
                    alt="toggle_symbol"
                    className="toggle_symbol toggle_symbol--1"
                  />
                  <p>職涯分享</p>
                </div>
                <div className="toggleItem--content">
                  <li>Career Sharing: BCG</li>
                  <li>Career Sharing: Google</li>
                  <li>Career Sharing: Tencent</li>
                </div>
              </div>
              <div
                className="toggleItem toggleItem--2"
                onClick={() => {
                  const height = $('.toggleItem--2').css('height');
                  if (height === '38px') {
                    $('.toggleItem--1').css('height', '38px');
                    $('.toggleItem--3').css('height', '38px');
                    $('.toggleItem--2').css('height', '164px');
                    $('.toggle_symbol--2').css('transform', 'rotate(90deg)');
                  } else {
                    $('.toggleItem--2').css('height', '38px');
                    $('.toggle_symbol--2').css('transform', 'rotate(0deg)');
                  }
                }}
              >
                <div className="toggleItem--title">
                  <img
                    src={toggle_symbol}
                    alt="toggle_symbol"
                    className="toggle_symbol toggle_symbol--2"
                  />
                  <p>產業技能</p>
                </div>
                <div className="toggleItem--content">
                  <li>Case Interview</li>
                  <li>Valuation and Due Dilligence</li>
                  <li>Financial Statements Analysis</li>
                  <li>Digital Marketing</li>
                  <li>UX Research in Business Context</li>
                </div>
              </div>
              <div
                className="toggleItem toggleItem--3"
                onClick={() => {
                  const height = $('.toggleItem--3').css('height');
                  if (height === '38px') {
                    $('.toggleItem--1').css('height', '38px');
                    $('.toggleItem--2').css('height', '38px');
                    $('.toggleItem--3').css('height', '116px');
                    $('.toggle_symbol--3').css('transform', 'rotate(90deg)');
                  } else {
                    $('.toggleItem--3').css('height', '38px');
                    $('.toggle_symbol--3').css('transform', 'rotate(0deg)');
                  }
                }}
              >
                <div className="toggleItem--title">
                  <img
                    src={toggle_symbol}
                    alt="toggle_symbol"
                    className="toggle_symbol toggle_symbol--3"
                  />
                  <p>職場技巧</p>
                </div>
                <div className="toggleItem--content">
                  <li>Project Management</li>
                  <li>Upward Management</li>
                  <li>Professionalism</li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="senior__project">
        <div className="senior__project--content">
          <h2 className="content--title">Senior Project</h2>
          <p className="content--paragraph" style={{ marginBottom: '16px' }}>
            在 Senior 時期，Senior 們將與外部企業或組織合作，進行為期 3-4
            個月的團體專案，並配有 1-2 位 BizPro Alumni 作為專案 Mentor。
          </p>
          <p className="content--paragraph" style={{ marginBottom: '24px' }}>
            不同於 Junior 時期的 Life Case，在 Senior Project 裡 Senior
            們將接受更高強度的訓練，研究更複雜的專案命題並產出更完整詳盡的解決方案。不論是硬性的資料搜集與分析、質化
            /
            量化研究、簡報製作與表達能力，抑或軟性的專案管理、團隊合作、業主向上管理能力，Senior
            都將在專案執行過程中不斷砥礪並精進，為合作企業或組織創造價值。
          </p>
        </div>
        <div className="senior__project--img">
          <img src={seniorProjectImg} alt="seniorProjectImg" />
        </div>
      </article>
    </section>
  );
  const Alumni = () => (
    <section className="alumni">
      <img src={dubbleCircle} alt="dubbleCircle" className="dubbleCircle" />
      <div
        className="alumni__img"
        style={{ backgroundImage: `url(${briefIntro_people})` }}
      ></div>
      <div className="alumni__content">
        <div className="alumni__content--item">
          <h3 className="item__title">擔任講師或專案 Mentor</h3>
          <p className="item__paragraph">
            在以 Junior 和 Senior 身份完成一年扎實訓練後，成為 Alumni 的 BizPro
            成員可以透過擔任課程講師、評審和後輩們分享自身所長或產業經驗，或擔任
            Junior、Senior 專案 Mentor 指導學弟妹執行專案，藉此回饋 BizPro
            社群並創造正向循環。
          </p>
        </div>
        <div className="alumni__content--item">
          <h3 className="item__title">參與交流活動</h3>
          <p className="item__paragraph">
            Alumni 亦可參與 BizPro 的各式交流活動，包含所有的 Junior 與 Senior
            課程、職涯分享、學院聚等，與跨屆 BizPro 成員維持緊密友好關係。
          </p>
        </div>
        <div className="alumni__content--item">
          <h3 className="item__title">成為多元領域的業界領袖人才</h3>
          <p className="item__paragraph">
            進入社會的 Alumni 將帶著 BizPro
            的訓練、成長，成為各行各業的業界領袖人才，為社會帶來正向改變。
          </p>
        </div>
        <Button variant="primary" href="/members">
          查看歷屆成員
        </Button>
      </div>
    </section>
  );

  const clearClass = () => {
    document
      .getElementsByClassName('tab__item--junior')[0]
      .classList.remove('tab__item--default', 'tab__item--active');
    document
      .getElementsByClassName('tab__item--senior')[0]
      .classList.remove('tab__item--default', 'tab__item--active');
    document
      .getElementsByClassName('tab__item--alumni')[0]
      .classList.remove('tab__item--default', 'tab__item--active');
  };
  const changeToJunior = () => {
    clearClass();

    document
      .getElementsByClassName('tab__item--junior')[0]
      .classList.add('tab__item--active');
    document
      .getElementsByClassName('tab__item--senior')[0]
      .classList.add('tab__item--default');
  };
  const changeToSenior = () => {
    clearClass();
    document
      .getElementsByClassName('tab__item--junior')[0]
      .classList.add('tab__item--default');
    document
      .getElementsByClassName('tab__item--senior')[0]
      .classList.add('tab__item--active');
  };
  const changeToAlumni = () => {
    clearClass();
    document
      .getElementsByClassName('tab__item--junior')[0]
      .classList.add('tab__item--default');
    document
      .getElementsByClassName('tab__item--senior')[0]
      .classList.add('tab__item--default');
    document
      .getElementsByClassName('tab__item--alumni')[0]
      .classList.add('tab__item--active');
  };

  return (
    <React.Fragment>
      <NavBar />
      <Header
        title={
          tab === 'junior'
            ? headerWordingJunior.title
            : tab === 'senior'
            ? headerWordingSenior.title
            : headerWordingAlumni.title
        }
        content={
          tab === 'junior'
            ? headerWordingJunior.content
            : tab === 'senior'
            ? headerWordingSenior.content
            : headerWordingAlumni.content
        }
      />
      <section className="tab">
        <div
          className="tab__item tab__item--junior tab__item--active"
          onClick={() => {
            changeToJunior();
            setTab('junior');
            window.scrollTo(0, 0);
          }}
        >
          <p className="lg">Junior 新進社員</p>
          <p className="sm">Junior</p>
        </div>
        <div
          className="tab__item tab__item--senior tab__item--default"
          onClick={() => {
            changeToSenior();
            setTab('senior');
            window.scrollTo(0, 0);
          }}
        >
          <p className="lg">Senior 社團幹部</p>
          <p className="sm">Senior</p>
        </div>
        <div
          className="tab__item tab__item--alumni tab__item--default"
          onClick={() => {
            changeToAlumni();
            setTab('alumni');
            window.scrollTo(0, 0);
          }}
        >
          <p className="lg">Alumni 歷屆成員</p>
          <p className="sm">Alumni</p>
        </div>
      </section>
      {tab === 'junior' ? (
        <Junior />
      ) : tab === 'senior' ? (
        <Senior />
      ) : (
        <Alumni />
      )}
      <Footer />
    </React.Fragment>
  );
}

export default Journey;
