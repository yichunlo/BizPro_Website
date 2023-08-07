import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import icon_edit from '../asset/img/icon/icon_edit.svg';
import icon_upload from '../asset/img/icon/icon_upload.svg';
import icon_x from '../asset/img/icon/icon_x.svg';
import icon_x_circle from '../asset/img/icon/icon_x_circle.svg';
import numberToRank from '../utility/numberToRank';
import useToken from '../utility/useToken';
function BackstageArticleTable() {
  const [articleData, setArticleData] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [toastContent, setToastContent] = useState('');
  const [modalTitle, setModalTitle] = useState('資料刪除警告');
  const [modalContent, setModalContent] = useState('');
  const [targetArticle, setTargetArticle] = useState({
    id: '',
    name: '',
    number: '',
    title: '',
    content: '',
    avatar: '',
  });
  const { token, setToken } = useToken();
  const fetchData = async () => {
    await axios
      .get('http://localhost:5000/api/article/member_talk')
      .then((res) => {
        setArticleData(
          res.data.sort((article1, article2) =>
            Number(article1.alumni.number) < Number(article2.alumni.number)
              ? 1
              : Number(article1.alumni.number) > Number(article2.alumni.number)
              ? -1
              : article1.alumni.name > article2.alumni.name
              ? 1
              : -1
          )
        );
        setTotalPage(Math.ceil(res.data.length / 10));
      })
      .catch((error) => console.log(error));
  };
  const isOverflown = (element) => {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  };
  const stickColumn = () => {
    console.log('change');
    if (isOverflown(document.getElementsByClassName('tableContainer')[0])) {
      let left =
        document
          .getElementsByClassName('toBeFreezeCol2')[0]
          .getBoundingClientRect().left -
        document
          .getElementsByClassName('toBeFreezeCol1')[0]
          .getBoundingClientRect().left;

      $('.toBeFreezeCol1').map((id, cell) => {
        cell.classList.add('freeze');
      });
      $('.toBeFreezeCol2').map((id, cell) => {
        cell.classList.add('freeze');
        cell.style.left = `${left}px`;
      });
      $('.tableContainer').css('overflow-x', 'scroll');
    } else {
      $('.tableContainer').css('overflow-x', 'hidden');
    }
  };
  // Load Data
  useEffect(() => {
    fetchData();
    window.addEventListener('resize', () => {
      stickColumn();
    });
    return;
  }, []);
  $(document).ready(() => {
    stickColumn();
  });
  // Components

  const WarningToast = () => (
    <div className="toastComponent warning">
      <p>{toastContent ? toastContent : '無提示訊息'}</p>
    </div>
  );
  const SuccessToast = () => (
    <div className="toastComponent success">
      <p>{toastContent ? toastContent : '無提示訊息'}</p>
      {/* <img src={cross} alt="" className="toastClose" /> */}
    </div>
  );
  const WarningModal = () => (
    <div className="modal show warningModal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <strong>{modalTitle ? modalTitle : '標題載入錯誤'}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent ? modalContent : '內文載入錯誤'}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              $('.warningModal').css('display', 'none');
            }}
          >
            取消
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteArticle(targetArticle);
              $('.warningModal').css('display', 'none');
            }}
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
  const PictureUploadModal = () => (
    <div className="modal show pictureModal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <strong>請輸入圖片位址</strong>
          </Modal.Title>
        </Modal.Header>
        <form
          id="addAvatarForm"
          onSubmit={(e) => {
            e.preventDefault();
            updateAvatar(e);
          }}
        >
          <Modal.Body>
            <input
              type="url"
              name="updateAvatar"
              placeholder="https://example.com/avatar.jpg"
              className="pictureUrlInput"
              defaultValue={`${
                targetArticle.avatar ? targetArticle.avatar : ''
              }`}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                $('.modal').css('display', 'none');
              }}
            >
              取消
            </Button>
            <Button type="submit" variant="success">
              確定
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Dialog>
    </div>
  );
  const AddArticleModal = () => {
    return (
      <div className="modal show dataModal addArticleModal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              <strong>新增心得</strong>
            </Modal.Title>
          </Modal.Header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addArticle(e);
            }}
          >
            <Modal.Body>
              <div className="container container__row1">
                <label>
                  姓名<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="姓名"
                  className="nameInput"
                  defaultValue={`${
                    targetArticle.name ? targetArticle.name : ''
                  }`}
                  required
                />
                <label>
                  屆數<span className="requiredDot">*</span>
                </label>
                <input
                  type="number"
                  name="number"
                  placeholder="屆數"
                  className="numberInput"
                  defaultValue={`${
                    targetArticle.number ? targetArticle.number : ''
                  }`}
                  required
                />
              </div>
              <div className="container container__row2">
                <label>照片</label>
                <input
                  type="url"
                  pattern="^(http(s)?://)([^/]+)(/[^/]+)+\.(jpeg|jpg|gif|png|bmp|webp)$"
                  name="articleAvatar"
                  placeholder="照片"
                  className="articleAvatarInput"
                  defaultValue={`${
                    targetArticle.avatar ? targetArticle.avatar : ''
                  }`}
                  style={{ marginLeft: '8px' }}
                />
              </div>
              <div className="container container__row3">
                <label>
                  標題<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="articleTitle"
                  placeholder="心得文標題"
                  className="articleTitleInput"
                  defaultValue={`${
                    targetArticle.title ? targetArticle.title : ''
                  }`}
                  required
                />
              </div>
              <div className="container container__row4">
                <label>
                  內文<span className="requiredDot">*</span>
                </label>
                <textarea
                  className="contentInput"
                  name="articleContent"
                  cols="30"
                  rows="10"
                  defaultValue={targetArticle.content}
                  placeholder="心得文內文"
                  required
                ></textarea>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  $('.modal').css('display', 'none');
                }}
              >
                取消
              </Button>
              <Button type="submit" variant="success">
                新增
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Dialog>
      </div>
    );
  };
  const UpdateArticleModal = () => {
    return (
      <div className="modal show dataModal updateArticleModal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              <strong>編輯心得</strong>
            </Modal.Title>
          </Modal.Header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateArticle(e);
            }}
          >
            <Modal.Body>
              <div className="container container__row1">
                <label>
                  姓名<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="姓名"
                  className="nameInput"
                  defaultValue={`${
                    targetArticle.name ? targetArticle.name : ''
                  }`}
                  required
                />
                <label>
                  屆數<span className="requiredDot">*</span>
                </label>
                <input
                  type="number"
                  name="number"
                  placeholder="屆數"
                  className="numberInput"
                  defaultValue={`${
                    targetArticle.number ? targetArticle.number : ''
                  }`}
                  required
                />
              </div>
              <div className="container container__row2">
                <label>照片</label>
                <input
                  type="url"
                  pattern="^(http(s)?://)([^/]+)(/[^/]+)+\.(jpeg|jpg|gif|png|bmp|webp)$"
                  name="articleAvatar"
                  placeholder="照片"
                  className="articleAvatarInput"
                  defaultValue={`${
                    targetArticle.avatar ? targetArticle.avatar : ''
                  }`}
                  style={{ marginLeft: '8px' }}
                />
              </div>
              <div className="container container__row3">
                <label>
                  標題<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="articleTitle"
                  placeholder="心得文標題"
                  className="articleTitleInput"
                  defaultValue={`${
                    targetArticle.title ? targetArticle.title : ''
                  }`}
                  required
                />
              </div>
              <div className="container container__row4">
                <label>
                  內文<span className="requiredDot">*</span>
                </label>
                <textarea
                  className="contentInput"
                  name="articleContent"
                  cols="30"
                  rows="10"
                  defaultValue={targetArticle.content}
                  placeholder="心得文內文"
                  required
                ></textarea>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  $('.modal').css('display', 'none');
                }}
              >
                取消
              </Button>
              <Button type="submit" variant="success">
                更新
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Dialog>
      </div>
    );
  };
  const ArticleRow = ({ articleId, name, number, title, avatar, content }) => (
    <tr
      data-name={name}
      data-number={number}
      data-avatar={avatar}
      data-id={articleId}
      // data-content={content}
    >
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="nameContent data toBeFreezeCol1"
      >
        {name ? name : <span className="noData">查無資料</span>}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="numberContent data toBeFreezeCol2"
      >
        {number ? number : <span className="noData">查無資料</span>}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="titleContent data"
      >
        {title ? title : <span className="noData">查無資料</span>}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="contentContent data"
      >
        {content ? content : <span className="noData">查無資料</span>}
      </td>
      <td>
        {avatar ? (
          <>
            <Button
              variant="primary"
              className="btn-reupload"
              onClick={(e) => {
                getTargetArticle(e.target);
                setTimeout(() => {
                  $('.pictureModal').css('display', 'block');
                }, 100);
              }}
            >
              重新上傳
            </Button>
            <a href={avatar} className="avatarContent" target="_blanck">
              檢視
            </a>
          </>
        ) : (
          <Button
            variant="success"
            className="btn-upload"
            onClick={(e) => {
              getTargetArticle(e.target);
              setTimeout(() => {
                $('.pictureModal').css('display', 'block');
              }, 0);
            }}
          >
            上傳
          </Button>
        )}
      </td>
      <td className="buttonGroup">
        <Button
          variant="primary"
          className="btn-edit"
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') {
              getTargetArticle(e.target);
            } else {
              getTargetArticle(e.target.parentNode);
            }
            setTimeout(() => {
              $('.updateArticleModal').css('display', 'block');
            }, 0);
          }}
        >
          <img src={icon_edit} alt="icon_edit" />
        </Button>
        <Button
          variant="danger"
          className="btn-delete"
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') {
              triggerWarningModal(e.target);
              getTargetArticle(e.target);
            } else {
              triggerWarningModal(e.target.parentNode);
              getTargetArticle(e.target.parentNode);
            }
          }}
        >
          <img src={icon_x} alt="icon_x" />
        </Button>
        <Button variant="success" className="btn-update">
          <img src={icon_upload} alt="icon_upload" />
        </Button>
        <Button
          variant="danger"
          className="btn-cancel"
          onClick={(e) => {
            endEdit(e);
          }}
        >
          <img src={icon_x_circle} alt="icon_x_circle" />
        </Button>
      </td>
    </tr>
  );
  // Utilities
  const getTargetArticle = (e) => {
    let content,
      title = null;
    let targetArticleData = e.parentNode.parentNode.dataset;
    e.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[0] === 'titleContent') {
        title = child.innerText;
      }
      if (child.classList[0] === 'contentContent') {
        content = child.textContent;
      }
    });

    setTargetArticle({
      name: targetArticleData.name,
      number: targetArticleData.number,
      title: title,
      content: content,
      avatar: targetArticleData.avatar,
      id: targetArticleData.id,
    });
  };
  const clearTargetArticle = () => {
    setTargetArticle({
      name: '',
      number: '',
      jobTitle: '',
      title: '',
      content: '',
      avatar: '',
    });
  };
  const endEdit = (e) => {
    e.target.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[1] === 'data') {
        child.classList.remove('editable');
        child.setAttribute('contentEditable', false);
      }
      if (child.classList[0] === 'buttonGroup') {
        child.childNodes.forEach((btn) => {
          if (
            btn.classList[0] === 'btn-edit' ||
            btn.classList[0] === 'btn-delete'
          ) {
            btn.style.display = 'inline';
          } else {
            btn.style.display = 'none';
          }
        });
      }
    });
    //setIsSthEditing(false);
  };
  const triggerWarningModal = (e) => {
    let name = '';
    let number = '';
    e.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[0] === 'nameContent') name = child.innerText;
      if (child.classList[0] === 'numberContent') number = child.innerText;
    });
    setModalContent(`你確定要刪除 ${numberToRank(number)} ${name} 的資料？`);
    setTimeout(() => {
      $('.warningModal').css('display', 'block');
    }, 20);
  };
  const triggerToast = (type) => {
    if (type == 'success') {
      $('.toastComponent.success').addClass('toastTrigger');
      setTimeout(() => {
        $('.toastComponent').removeClass('toastTrigger');
      }, 1500);
    }
    if (type == 'warning')
      $('.toastComponent.warning').addClass('toastTrigger');
    setTimeout(() => {
      $('.toastComponent').removeClass('toastTrigger');
    }, 1500);
  };
  const updateAvatar = async (e) => {
    await axios
      .put(
        'http://localhost:5000/api/admin/update_article',
        {
          _id: targetArticle.id,
          name: targetArticle.name,
          number: targetArticle.number,
          avatar: e.target.updateAvatar.value,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .then((res) => {
        setToastContent(
          `成功更新 ${numberToRank(targetArticle.number)} ${
            targetArticle.name
          } 的照片`
        );
        setTimeout(() => {
          fetchData();
          setTimeout(() => {
            triggerToast('success');
          }, 500);
        }, 0);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setToastContent(`更新照片失敗，請重新操作`);
        setTimeout(() => {
          triggerToast('warning');
          $('.pictureModal').css('display', 'block');
        }, 0);
      });
  };
  // TODO: delete and update api call to be add
  const deleteArticle = async () => {
    await axios
      .delete('http://localhost:5000/api/admin/delete_article', {
        data: {
          _id: targetArticle.id,
        },
        headers: {
          'x-auth-token': token,
        },
      })
      .then((res) => {
        setToastContent(`成功刪除資料`);
        setTimeout(() => {
          fetchData();
          setTimeout(() => {
            triggerToast('success');
          }, 500);
        }, 0);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        if (
          err.response.data.msg === 'Token is not valid' ||
          err.response.data.msg === 'No token, authorization denied'
        )
          setToastContent(`請先登入再進行操作`);
        else setToastContent(`刪除資料失敗，請重新操作`);
        setTimeout(() => {
          triggerToast('warning');
        }, 0);
      });
  };
  const updateArticle = async (e) => {
    await axios
      .put(
        'http://localhost:5000/api/admin/update_article',
        {
          _id: targetArticle.id,
          name: e.target.name.value,
          number: e.target.number.value,
          title: e.target.articleTitle.value,
          content: e.target.articleContent.value,
          avatar: e.target.articleAvatar.value
            ? e.target.articleAvatar.value
            : '',
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .then((res) => {
        setToastContent(
          `成功更新 ${numberToRank(e.target.number.value)} ${
            e.target.name.value
          } 的資料`
        );
        setTimeout(() => {
          fetchData();
          setTimeout(() => {
            triggerToast('success');
            $('.updateArticleModal').css('display', 'none');
          }, 500);
        }, 0);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        if (
          err.response.data.msg === 'Token is not valid' ||
          err.response.data.msg === 'No token, authorization denied'
        ) {
          setToastContent(`請先登入再進行操作`);
          window.location.href = '/login';
        } else if (err.response.data.msg === 'alumni already exists')
          setToastContent('已存在相同屆數與姓名的 Alumni');
        else if (err.response.data.msg === 'Cannot find alumni')
          setToastContent('不存在此 Alumni，請確認名稱與屆數是否正確');
        else setToastContent('新增資料失敗，請重新操作');
        setTimeout(() => {
          triggerToast('warning');
          $('.updateArticleModal').css('display', 'block');
        }, 0);
      });
  };
  const addArticle = async (e) => {
    await axios
      .post(
        'http://localhost:5000/api/admin/add_article',
        {
          name: e.target.name.value,
          number: e.target.number.value,
          title: e.target.articleTitle.value,
          content: e.target.articleContent.value,
          avatar: e.target.articleAvatar.value
            ? e.target.articleAvatar.value
            : '',
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .then((res) => {
        setToastContent(
          `成功新增 ${numberToRank(e.target.number.value)} ${
            e.target.name.value
          } 的心得文`
        );
        setTimeout(() => {
          fetchData();
          setTimeout(() => {
            triggerToast('success');
            $('.addArticleModal').css('display', 'none');
          }, 500);
        }, 0);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        if (err.response.data.msg === 'Cannot find alumni')
          setToastContent(`找不到對應的 Alumni，請重新操作`);
        else if (
          err.response.data.msg === 'One existed article belongs to this alumni'
        )
          setToastContent(
            `該 Alumni 已上傳過心得文，請重新操作或使用「編輯」功能來修改`
          );
        else setToastContent(`新增心得文失敗，請重新操作`);
        setTimeout(() => {
          triggerToast('warning');
          $('.addArticleModal').css('display', 'block');
        }, 0);
      });
  };
  const switchPage = (certainPage) => {
    document.getElementById('settingPageSection').scrollIntoView();
    setNowPage(certainPage);
  };

  return (
    <React.Fragment>
      <SuccessToast />
      <WarningToast />
      <WarningModal />
      <PictureUploadModal />
      <UpdateArticleModal />
      <AddArticleModal />
      <div className="titleSection">
        <h2 className="title">歷屆心得文資料庫</h2>
        <Button
          variant="primary"
          onClick={() => {
            clearTargetArticle();
            setTimeout(() => {
              $('.addArticleModal').css('display', 'block');
            }, 0);
          }}
        >
          新增心得文
        </Button>
      </div>
      <div className="tableContainer">
        <Table bordered>
          <thead>
            <tr>
              <th className="toBeFreezeCol1">姓名</th>
              <th className="toBeFreezeCol2">屆數</th>
              <th>心得標題</th>
              <th>心得內容</th>
              <th>照片</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {articleData?.map((article, i) => {
              if ((nowPage - 1) * 10 <= i && i < nowPage * 10) {
                return (
                  <ArticleRow
                    key={i}
                    name={article.alumni.name}
                    number={article.alumni.number}
                    // jobTitle={article.jobTitle}
                    title={article.title}
                    content={article.content.replace(/(\r\n|\n|\r)/g, `\r\n`)}
                    avatar={article.avatar}
                    articleId={article._id}
                  />
                );
              } else {
                return;
              }
            })}
          </tbody>
        </Table>
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
    </React.Fragment>
  );
}

export default BackstageArticleTable;
