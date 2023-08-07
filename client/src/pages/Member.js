import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import connectionSymbol from '../asset/img/connection_symbol_white300.svg';
import emptyAvatar from '../asset/img/empty_avatar.webp';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import localDb from '../config/localDb.json';
import numberToRank from '../utility/numberToRank.js';
/*
TODO:
- loading 符號
*/

function Member() {
  const [memberData, setMemberData] = useState(null);
  const [filteredMemberData, setFilteredMemberData] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [majorFilter, setMajorFilter] = useState([]);
  const [fieldFilter, setFieldFilter] = useState([]);
  const [gradeFilter, setGradeFilter] = useState('');
  const [directSearch, setDirectSearch] = useState('');
  const [popupContent, setPopupContent] = useState({
    name: '',
    number: '',
    jobTitle: '',
    tags: [],
    exp: [],
  });
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [onePageMemberCount, setOnePageMemberCount] = useState(1);
  const [memberColumnCount, setMemberColumnCount] = useState(1);
  const [fetchDataError, setFetchDataError] = useState(false);
  const headerWording = localDb.headerWording.member;

  useEffect(() => {
    let grade = [];
    let field = [];
    let major = [];
    let gradeOptionsTemp = [{ value: '0', label: '全部屆數' }];
    let fieldOptionsTemp = [];
    let majorOptionsTemp = [];
    const fetchData = async () => {
      await axios
        .get('http://localhost:5000/api/alumni/members')
        .then((res) => {
          const gridColumnCount = window
            .getComputedStyle(
              document.getElementsByClassName('member__items')[0]
            )
            .getPropertyValue('grid-template-columns')
            .split(' ').length;

          // set onePageMemberCount
          let onePageMemberCountTemp = 1;
          if (gridColumnCount === 1) {
            onePageMemberCountTemp = 10;
            setOnePageMemberCount(10);
          } else if (gridColumnCount === 2) {
            onePageMemberCountTemp = 12;
            setOnePageMemberCount(12);
          } else if (gridColumnCount === 3) {
            onePageMemberCountTemp = 18;
            setOnePageMemberCount(18);
          } else if (gridColumnCount === 4) {
            onePageMemberCountTemp = 20;
            setOnePageMemberCount(20);
          } else if (gridColumnCount === 5) {
            onePageMemberCountTemp = 20;
            setOnePageMemberCount(20);
          } else {
            onePageMemberCountTemp = gridColumnCount * 4;
            setOnePageMemberCount(gridColumnCount * 4);
          }

          // Set options
          res.data
            .sort((alumni1, alumni2) =>
              Number(alumni1.number) > Number(alumni2.number)
                ? 1
                : Number(alumni1.number) < Number(alumni2.number)
                ? -1
                : alumni1.name < alumni2.name
                ? 1
                : -1
            )
            .map((member) => {
              if (!grade.includes(member.number)) {
                grade.push(member.number);
              }
              member.tags.map((tag) => {
                if (!field.includes(tag)) {
                  field.push(tag);
                }
              });
              member.major.map((m) => {
                if (!major.includes(m)) {
                  if (m !== 'Unknown') {
                    major.push(m);
                  }
                }
              });
            });
          grade.map((item) => {
            gradeOptionsTemp.push({ value: item, label: item });
          });
          field.map((item) => {
            fieldOptionsTemp.push({ value: item, label: item });
          });
          major.map((item) => {
            majorOptionsTemp.push({
              value: item,
              label: item.replace('臺灣大學', ''),
            });
          });
          majorOptionsTemp = majorOptionsTemp.sort(
            (a, b) => a.label[0].charCodeAt(0) - b.label[0].charCodeAt(0)
          );
          fieldOptionsTemp = fieldOptionsTemp.sort(
            (a, b) => a.label[0].charCodeAt(0) - b.label[0].charCodeAt(0)
          );
          setMemberData(res.data);
          setFilteredMemberData(res.data);
          setTotalPage(Math.ceil(res.data.length / onePageMemberCountTemp));
          setFieldOptions(fieldOptionsTemp);
          setGradeOptions(gradeOptionsTemp);
          setMajorOptions(majorOptionsTemp);
        })
        .catch((error) => {
          setFetchDataError(true);
          console.log(error);
        });
    };
    fetchData();
    window.addEventListener('resize', () => {
      if (
        $('.member__popUp').css('display') === 'none' &&
        $('.member__popupLayer').css('display') === 'block'
      ) {
        $('.member__popUp').css('display', 'flex');
        $('.member__popUp').css('opacity', '1');
      }

      let column = window
        .getComputedStyle(document.getElementsByClassName('member__items')[0])
        .getPropertyValue('grid-template-columns')
        .split(' ').length;
      if (column !== memberColumnCount) {
        setMemberColumnCount(column);
      }
    });
    return;
  }, []);

  useEffect(() => {
    const gridColumnCount = window
      .getComputedStyle(document.getElementsByClassName('member__items')[0])
      .getPropertyValue('grid-template-columns')
      .split(' ').length;

    // set onePageMemberCount
    let onePageMemberCountTemp = 1;
    if (gridColumnCount === 1) {
      onePageMemberCountTemp = 10;
      setOnePageMemberCount(10);
    } else if (gridColumnCount === 2) {
      onePageMemberCountTemp = 12;
      setOnePageMemberCount(12);
    } else if (gridColumnCount === 3) {
      onePageMemberCountTemp = 18;
      setOnePageMemberCount(18);
    } else if (gridColumnCount === 4) {
      onePageMemberCountTemp = 20;
      setOnePageMemberCount(20);
    } else if (gridColumnCount === 5) {
      onePageMemberCountTemp = 20;
      setOnePageMemberCount(20);
    } else {
      onePageMemberCountTemp = gridColumnCount * 4;
      setOnePageMemberCount(gridColumnCount * 4);
    }
    if (filteredMemberData)
      setTotalPage(
        Math.ceil(filteredMemberData.length / onePageMemberCountTemp)
      );

    return;
  }, [memberColumnCount]);
  const MemberItem = (props) => {
    return (
      <div
        className="member__items--item"
        onClick={() => {
          setPopupContent(filteredMemberData[props.id]);
          setTimeout(() => {
            openPopup();
          }, 100);
        }}
      >
        <div className="item__container">
          <div className="item__container--img">
            <div className="mask">查看成員經歷</div>
            <img
              src={checkImage(props.avatar) ? props.avatar : emptyAvatar}
              alt="avatar"
              className="item__img--img"
            />
          </div>
          <div className="item__container--content">
            <p className="item__content--title">
              {numberToRank(props.number)} {props.name}
            </p>
            <p className="item__content--subTitle">{props.jobTitle}</p>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setPopupContent(memberData[props.id]);
            setTimeout(() => {
              openPopup();
            }, 100);
          }}
        >
          查看成員經歷
        </Button>
      </div>
    );
  };

  const PopUp = ({ props }) => (
    <section className="member__popUp">
      <div className="member__popUp--img">
        <img
          src={checkImage(props.avatar) ? props.avatar : emptyAvatar}
          alt="avatar"
        />
      </div>
      <div className="member__popUp--content">
        <h3>
          {numberToRank(props.number)} {props.name}
        </h3>
        <p>{props.jobTitle}</p>
        <div className="content__tags">
          {props.tags.map((tag) => (
            <div className="content__tags--tag">{tag}</div>
          ))}
        </div>
        <ul>
          {props.exp.map((exp) => (
            <li>{exp}</li>
          ))}
          <div className="gradientBox" />
        </ul>
      </div>
    </section>
  );

  const openPopup = () => {
    $('.member__popUp').css('display', 'flex');
    $('.member__popupLayer').css('display', 'block');
    $('.member__popUp').css('opacity', '1');
    $('.member__popupLayer').css('opacity', '1');
    $('body').css('overflow-y', 'hidden');
    $('#memberSection').css('z-index', '');

    let element = document.getElementsByTagName('ul')[0];
    if (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    ) {
      $('.gradientBox').css('display', 'block');
    }
  };
  const switchPage = (certainPage) => {
    setNowPage(certainPage);
    window.scrollTo(0, 240);
  };

  const startFilter = async (major, field, grade) => {
    let filteredMemberDataTemp = [];
    // field filter
    if (directSearch === '')
      filteredMemberDataTemp = await axios
        .post('http://localhost:5000/api/alumni/select', {
          number: grade,
          major: major,
          tags: field,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    else
      filteredMemberDataTemp = await axios
        .post('http://localhost:5000/api/alumni/search', {
          number: grade,
          major: major,
          tags: field,
          search: directSearch,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    setNowPage(1);

    setTotalPage(Math.ceil(filteredMemberDataTemp.length / onePageMemberCount));
    setFilteredMemberData(filteredMemberDataTemp);

    // Set pagination to page 1
    $('.page-link').map((id, el) => {
      if (el.getAttribute('aria-label') === 'Page 1') {
        el.click();
      }
    });
  };

  const startSearch = async (searchData) => {
    let filteredMemberDataTemp = [];
    filteredMemberDataTemp = await axios
      .post('http://localhost:5000/api/alumni/search', {
        number: gradeFilter,
        major: majorFilter,
        tags: fieldFilter,
        search: searchData,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    setNowPage(1);
    setTotalPage(Math.ceil(filteredMemberDataTemp.length / onePageMemberCount));
    setFilteredMemberData(filteredMemberDataTemp);

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

  return (
    <React.Fragment>
      <NavBar />
      <Header title={headerWording.title} content={headerWording.content} />
      <section className="member" id="memberSection">
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
        <div
          className="member__popupLayer"
          onClick={() => {
            $('.member__popUp').css('display', 'none');
            $('.member__popupLayer').css('display', 'none');
            $('body').css('overflow-y', 'scroll');
          }}
        />
        <div className="member__searchSection" id="member__searchSection">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              for (const pair of formData.entries()) {
                setDirectSearch(pair[1]);
                startSearch(pair[1]);
              }
            }}
          >
            <div className="member__searchSection--filter">
              <label className="filter__field--tag">條件篩選：</label>
              <div className="filterContainer">
                <div className="filter__major">
                  <Select
                    classNamePrefix="filter__field--selector"
                    placeholder="選擇科系（限臺大）"
                    isMulti
                    options={majorOptions}
                    onChange={(choice) => {
                      let tempArray = [];
                      choice.map((option) => {
                        tempArray.push(`${option.value}`);
                      });
                      setMajorFilter(tempArray);
                      startFilter(tempArray, fieldFilter, gradeFilter);
                    }}
                    maxMenuHeight={220}
                  />
                </div>
                <div className="filter__field">
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
                      startFilter(majorFilter, tempArray, gradeFilter);
                    }}
                    maxMenuHeight={220}
                  />
                </div>
                <div className="filter__grade">
                  <Select
                    classNamePrefix="filter__grade--selector"
                    placeholder="選擇屆數"
                    options={gradeOptions}
                    onChange={(choice) => {
                      setGradeFilter(choice.value);
                      startFilter(majorFilter, fieldFilter, choice.value);
                    }}
                    maxMenuHeight={220}
                  />
                </div>
              </div>
            </div>
            <div className="member__searchSection--search">
              <label className="search--directSearchLabel">直接搜尋：</label>
              <div className="searchContainer">
                <input
                  type="text"
                  name="search"
                  placeholder="直接搜尋"
                  defaultValue={directSearch}
                  className="search--directSearchInput"
                  onChange={(e) => {
                    setDirectSearch(e.target.value);
                  }}
                />
                <Button variant="primary" type="submit">
                  搜尋
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="member__items">
          {fetchDataError ? (
            <h4 className="member__items--warning">
              資料載入錯誤：請確認網際網路連線狀態，或連繫網站管理員
            </h4>
          ) : filteredMemberData.length !== 0 ? (
            filteredMemberData.map((member, i) => {
              if (
                (nowPage - 1) * onePageMemberCount <= i &&
                i < nowPage * onePageMemberCount
              )
                return (
                  <MemberItem
                    name={`${member.name}`}
                    number={`${member.number}`}
                    jobTitle={`${member.jobTitle}`}
                    exp={`${member.exp}`}
                    tags={`${member.tags}`}
                    avatar={`${member.avatar}`}
                    key={i}
                    id={i}
                  />
                );
              else return;
            })
          ) : (
            <h4 className="member__items--warning">無搜尋結果</h4>
          )}
        </div>
        <ReactPaginate
          nextLabel="›"
          onPageChange={(e) => {
            switchPage(e.selected + 1);
          }}
          pageRangeDisplayed={3}
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

export default Member;
