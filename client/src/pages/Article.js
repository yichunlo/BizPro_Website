import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import connectionSymbol from '../asset/img/connection_symbol_white300.svg';
import doubleCircleSymbol from '../asset/img/doubleCircle_symbol_white300.svg';
import emptyAvatar from '../asset/img/empty_avatar.webp';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import localDb from '../config/localDb.json';
import numberToRank from '../utility/numberToRank';

function Article() {
  const [articleData, setArticleData] = useState(null);
  const [filteredArticleData, setFilteredArticleData] = useState([]);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [majorFilter, setMajorFilter] = useState([]);
  const [fieldFilter, setFieldFilter] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const headerWording = localDb.headerWording.article;
  const [fetchDataError, setFetchDataError] = useState(false);

  const [popupContent, setPopupContent] = useState({
    alumni: { name: '', number: '', jobTitle: '' },
    title: '',
    content: '',
    avatar: '',
  });
  useEffect(() => {
    let field = [];
    let major = [];
    let fieldOptionsTemp = [];
    let majorOptionsTemp = [];
    const fetchData = async () => {
      await axios
        .get('http://localhost:5000/api/article/member_talk')
        .then((res) => {
          res.data.map((article) => {
            article.alumni.tags.map((tag) => {
              if (!field.includes(tag)) {
                field.push(tag);
              }
            });
            article.alumni.major.map((m) => {
              if (!major.includes(m)) {
                if (m !== 'Unknown') {
                  major.push(m);
                }
              }
            });
          });
          // Set options
          field.map((item) => {
            fieldOptionsTemp.push({ value: item, label: item });
          });
          major.map((item) => {
            majorOptionsTemp.push({
              value: item,
              label: item.replace('臺灣大學', ''),
            });
          });
          setArticleData(res.data);
          setTotalPage(Math.ceil(res.data.length / 6));
          setFilteredArticleData(res.data);
          setFieldOptions(fieldOptionsTemp);
          setMajorOptions(majorOptionsTemp);
        })
        .catch((error) => {
          setFetchDataError(true);
          console.log(error);
        });
    };
    fetchData();
  }, []);
  const switchPage = (certainPage) => {
    document.getElementById('articleSection').scrollIntoView();
    setNowPage(certainPage);
  };
  const startFilter = async (major, field) => {
    let filteredArticleDataTemp = await axios
      .post('http://localhost:5000/api/article/select', {
        major: major,
        tags: field,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
    setNowPage(1);
    setTotalPage(Math.ceil(filteredArticleDataTemp.length / 6));
    setFilteredArticleData(filteredArticleDataTemp);
    // Set pagination to page 1
    $('.page-link').map((id, el) => {
      if (el.getAttribute('aria-label') === 'Page 1') {
        el.click();
      }
    });
  };
  const checkImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };
  const Item = (props) => {
    return (
      <div
        className="article__item"
        onClick={() => {
          setPopupContent(articleData[props.id]);
          setTimeout(() => {
            $('.article__detail').css('display', 'flex');
            $('.article__popupLayer').css('display', 'block');
            $('body').css('overflow-y', 'hidden');
          }, 0);
        }}
      >
        <div className="article__item--img">
          <img
            src={checkImage(props.avatar) ? props.avatar : emptyAvatar}
            alt="avatar"
          />
        </div>
        <div className="article__item--content">
          <p className="name">{`${props.number} ${props.name}${'：'}${
            props.jobTitle
          }`}</p>
          <h3 className="title">{`${props.title}`}</h3>
          <p className="content">{props.content.replace(/\\+n/g, '<br/>')}</p>
          <div className="tags">
            {props.tags?.map((tag, i) => {
              return (
                <div className="tag" key={i}>
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const PopUp = ({ props }) => (
    <section className="article__detail">
      <img
        src={doubleCircleSymbol}
        alt="doubleCircleSymbol"
        className="doubleCircleSymbol"
      />
      <div className="article__detail--titleGroup">
        <div className="titleGroup__img">
          <p className="titleGroup__img--subTitle">
            {`${numberToRank(props.alumni.number)} ${props.alumni.name}${'：'}`}
            {`${props.alumni.jobTitle}`}
          </p>
        </div>
        <div className="titleGroup__word">
          <h3 className="titleGroup__word--title">{`${props.title}`}</h3>
        </div>
      </div>
      <p className="article__detail--content">
        {props.content.replace(/\\+n/g, '<br/>')}
        <div className="gradientBox" />
      </p>
    </section>
  );
  return (
    <React.Fragment>
      <NavBar />
      <Header title={headerWording.title} content={headerWording.content} />
      <section className="article" id="articleSection">
        <img
          src={connectionSymbol}
          alt="connectionSymbol"
          className="connectionSymbolTop connectionSymbol"
        />
        <img
          src={connectionSymbol}
          alt="connectionSymbol"
          className="connectionSymbolBottom connectionSymbol"
        />
        <PopUp props={popupContent} />
        <div className="article__searchSection">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
            }}
          >
            <div className="article__searchSection--filter ">
              <label className="filter__major--tag">條件篩選：</label>
              <Select
                classNamePrefix="filter__major--selector"
                placeholder="選擇科系"
                isMulti
                options={majorOptions}
                onChange={(choice) => {
                  let tempArray = [];
                  choice.map((option) => {
                    tempArray.push(`${option.value}`);
                  });
                  setMajorFilter(tempArray);
                  startFilter(tempArray, fieldFilter);
                }}
                maxMenuHeight={220}
              />
              <Select
                classNamePrefix="filter__field--selector"
                placeholder="選擇領域（含所有經歷）"
                isMulti
                options={fieldOptions}
                onChange={(choice) => {
                  let tempArray = [];
                  choice.map((option) => {
                    tempArray.push(`${option.value}`);
                  });
                  setFieldFilter(tempArray);
                  startFilter(majorFilter, tempArray);
                }}
                maxMenuHeight={220}
              />
            </div>
          </form>
        </div>
        <div
          className="article__popupLayer"
          onClick={() => {
            $('.article__detail').css('display', 'none');
            $('.article__popupLayer').css('display', 'none');
            $('body').css('overflow-y', 'scroll');
          }}
        />
        {fetchDataError ? (
          <h4 className="article__items--warning">
            資料載入錯誤：請確認網際網路連線狀態，或連繫網站管理員
          </h4>
        ) : filteredArticleData.length !== 0 ? (
          filteredArticleData.map((data, i) => {
            if ((nowPage - 1) * 6 <= i && i < nowPage * 6) {
              return (
                <Item
                  number={`${numberToRank(data.alumni.number)}`}
                  name={`${data.alumni.name}`}
                  jobTitle={`${data.alumni.jobTitle}`}
                  title={`${data.title}`}
                  content={`${data.content}`}
                  tags={data.alumni.tags}
                  avatar={data.avatar}
                  id={i}
                />
              );
            } else {
              return;
            }
          })
        ) : (
          <h4 className="article__items--warning">無搜尋結果</h4>
        )}
        <ReactPaginate
          nextLabel="›"
          onPageChange={(e) => {
            switchPage(e.selected + 1);
          }}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalPage}
          previousLabel="‹"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default Article;
