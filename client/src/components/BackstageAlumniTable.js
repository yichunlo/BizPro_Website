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
import fixMultipleInput from '../utility/fixMultipleInput';
import numberToRank from '../utility/numberToRank';
import useToken from '../utility/useToken';
function BackstageAlumniTable() {
  const [memberData, setMemberData] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [toastContent, setToastContent] = useState('');
  const [modalTitle, setModalTitle] = useState('資料刪除警告');
  const [modalContent, setModalContent] = useState('');
  const [targetAlumni, setTargetAlumni] = useState({
    id: '',
    name: '',
    number: '',
    avatar: '',
  });
  const { token, setToken } = useToken();

  const fetchData = async () => {
    await axios
      .get('http://localhost:5000/api/alumni/members')
      .then((res) => {
        setMemberData(
          res.data.sort((alumni1, alumni2) =>
            Number(alumni1.number) < Number(alumni2.number)
              ? 1
              : Number(alumni1.number) > Number(alumni2.number)
              ? -1
              : alumni1.name > alumni2.name
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
      {/* <img src={cross} alt="toastClose" className="toastClose" /> */}
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
              deleteAlumni(targetAlumni);
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
              placeholder="http://example.com/avatar.jpg"
              pattern="^(http(s)?://)([^/]+)(/[^/]+)+\.(jpeg|jpg|gif|png|bmp|webp)$"
              className="pictureUrlInput"
              defaultValue={`${targetAlumni.avatar ? targetAlumni.avatar : ''}`}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                $('.modal').css('display', 'none');
                document.getElementById('addAvatarForm').reset();
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
  const AlumniRow = ({
    alumniId,
    name,
    number,
    title,
    major,
    exp,
    tags,
    avatar,
  }) => (
    <tr
      data-name={name}
      data-number={number}
      data-avatar={avatar}
      data-id={alumniId}
    >
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="nameContent data toBeFreezeCol1"
      >
        {name ? name : <span className="noData">無資料</span>}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="numberContent data toBeFreezeCol2"
      >
        {number ? number : <span className="noData">無資料</span>}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="titleContent data"
      >
        {title ? title : <span className="noData">無資料</span>}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="majorContent data"
      >
        {major[0] === 'Unknown' ? (
          <span className="noData">無資料</span>
        ) : major.length !== 0 ? (
          major.map((data, i) => {
            if (i !== major.length - 1) {
              return data + '；';
            }
            return data;
          })
        ) : (
          <span className="noData">無資料</span>
        )}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="expContent data"
      >
        {exp ? (
          exp.map((data, i) => {
            if (i !== exp.length - 1) {
              return data + '；';
            }
            return data;
          })
        ) : (
          <span className="noData">無資料</span>
        )}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="tagsContent data"
      >
        {tags.length !== 0 ? (
          tags.map((data, i) => {
            if (i !== tags.length - 1) {
              return data + '；';
            }
            return data;
          })
        ) : (
          <span className="noData">無資料</span>
        )}
      </td>
      <td>
        {avatar ? (
          <>
            <Button
              variant="primary"
              className="btn-reupload"
              onClick={(e) => {
                getTargetAlumni(e.target);
                setTimeout(() => {
                  $('.pictureModal').css('display', 'block');
                }, 0);
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
              getTargetAlumni(e.target);
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
              startEdit(e.target);
            } else {
              startEdit(e.target.parentNode);
            }
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
              getTargetAlumni(e.target);
            } else {
              triggerWarningModal(e.target.parentNode);
              getTargetAlumni(e.target.parentNode);
            }
          }}
        >
          <img src={icon_x} alt="icon_x" onClick={(e) => {}} />
        </Button>
        <Button
          variant="success"
          className="btn-update"
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') {
              getTargetAlumni(e.target);
              setTimeout(() => {
                updateAlumni(e.target);
              }, 0);
            } else {
              getTargetAlumni(e.target.parentNode);
              setTimeout(() => {
                updateAlumni(e.target.parentNode);
              }, 0);
            }
            endEdit(e.target);
          }}
        >
          <img src={icon_upload} alt="icon_upload" />
        </Button>
        <Button
          variant="danger"
          className="btn-cancel"
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') endEdit(e.target);
            else endEdit(e.target.parentNode);
          }}
        >
          <img src={icon_x_circle} alt="icon_x_circle" />
        </Button>
      </td>
    </tr>
  );
  const AddAlumniModal = () => {
    return (
      <div className="modal show dataModal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              <strong>新增 Alumni</strong>
            </Modal.Title>
          </Modal.Header>
          <form
            id="addAlumniForm"
            onSubmit={(e) => {
              e.preventDefault();
              addAlumni(e);
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
                  required
                />
              </div>
              <div className="container container__row2">
                <label>
                  頭銜<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="頭銜"
                  className="titleInput"
                  required
                />
              </div>
              <div className="container container__row3">
                <label>
                  學歷<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="major"
                  placeholder="學歷（使用；隔開）"
                  className="majorInput"
                  required
                />
              </div>
              <div className="container container__row4">
                <label>
                  經歷<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="exp"
                  placeholder="經歷（使用；隔開）"
                  className="expInput"
                  required
                />
              </div>
              <div className="container container__row5">
                <label>領域</label>
                <input
                  type="text"
                  name="tag"
                  placeholder="領域標籤（使用；隔開）"
                  className="tagInput"
                  style={{ marginLeft: '8px' }}
                />
              </div>
              <div className="container container__row6">
                <label>照片</label>
                <input
                  type="url"
                  name="avatar"
                  placeholder="照片連結"
                  className="avatarInput"
                  pattern="^(http(s)?://)([^/]+)(/[^/]+)+\.(jpeg|jpg|gif|png|bmp|webp)$"
                  style={{ marginLeft: '8px' }}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  document.getElementById('addAlumniForm').reset();
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
  const getTargetAlumni = (e) => {
    let targetAlumniData = e.parentNode.parentNode.dataset;
    setTargetAlumni({
      id: targetAlumniData.id,
      name: targetAlumniData.name,
      number: targetAlumniData.number,
      avatar: targetAlumniData.avatar,
    });
  };
  const startEdit = (e) => {
    e.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[1] === 'data') {
        child.classList.add('editable');
        child.setAttribute('contentEditable', true);
        if (child.innerText === '無資料') child.innerText = '';
      }
      if (child.classList[0] === 'buttonGroup') {
        child.childNodes.forEach((btn) => {
          if (
            btn.classList[0] === 'btn-edit' ||
            btn.classList[0] === 'btn-delete'
          ) {
            btn.style.display = 'none';
          } else {
            btn.style.display = 'inline';
          }
        });
      }
    });
    preventMultipleEdit('startEdit');
  };
  const endEdit = (e) => {
    e.parentNode.parentNode.childNodes.forEach((child) => {
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
    fetchData();
    preventMultipleEdit('endEdit');
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
        'http://localhost:5000/api/admin/update_alumni',
        {
          _id: targetAlumni.id,
          name: targetAlumni.name,
          number: targetAlumni.number,
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
          `成功更新 ${numberToRank(targetAlumni.number)} ${
            targetAlumni.name
          } 的照片`
        );
        setTimeout(() => {
          fetchData();
          setTimeout(() => {
            triggerToast('success');
            $('.modal').css('display', 'none');
            preventMultipleEdit('endEdit');
          }, 500);
        }, 0);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setToastContent(`更新照片失敗，請重新操作`);
        setTimeout(() => {
          triggerToast('warning');
          $('.dataModal').css('display', 'block');
        }, 0);
      });
  };
  const deleteAlumni = async () => {
    await axios
      .delete('http://localhost:5000/api/admin/delete_alumni', {
        data: {
          _id: targetAlumni.id,
        },
        headers: {
          'x-auth-token': token,
        },
      })
      .then((res) => {
        setToastContent(
          `成功刪除 ${targetAlumni.number} ${targetAlumni.name} 的資料`
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
        if (
          err.response.data.msg === 'Token is not valid' ||
          err.response.data.msg === 'No token, authorization denied'
        ) {
          setToastContent(`請先登入再進行操作`);
          window.location.href = '/login';
        } else setToastContent(`刪除資料失敗，請重新操作`);
        setTimeout(() => {
          triggerToast('warning');
        }, 0);
      });
  };
  const updateAlumni = async (e) => {
    let newAlumniData = {
      name: '',
      number: '',
      jobTitle: '',
      exp: '',
      tags: '',
      major: '',
    };
    e.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[0] === 'nameContent')
        newAlumniData.name = child.innerText;
      if (child.classList[0] === 'numberContent')
        newAlumniData.number = child.innerText;
      if (child.classList[0] === 'titleContent')
        newAlumniData.jobTitle = child.innerText;
      if (child.classList[0] === 'expContent')
        newAlumniData.exp = child.innerText;
      if (child.classList[0] === 'tagsContent')
        newAlumniData.tags = child.innerText;
      if (child.classList[0] === 'majorContent')
        newAlumniData.major = child.innerText;
    });

    await axios
      .put(
        'http://localhost:5000/api/admin/update_alumni',
        {
          _id: e.parentNode.parentNode.dataset.id,
          name: newAlumniData.name,
          number: newAlumniData.number,
          jobTitle: newAlumniData.jobTitle,
          exp: fixMultipleInput(newAlumniData.exp.split('；')),
          tags:
            newAlumniData.tags === ''
              ? []
              : newAlumniData.tags === false
              ? []
              : fixMultipleInput(newAlumniData.tags.split('；')),
          major: fixMultipleInput(newAlumniData.major.split('；')),
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .then((res) => {
        setToastContent(
          `成功更新 ${numberToRank(newAlumniData.number)} ${
            newAlumniData.name
          } 的資料`
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
        if (
          err.response.data.msg === 'Token is not valid' ||
          err.response.data.msg === 'No token, authorization denied'
        ) {
          setToastContent(`請先登入再進行操作`);
          window.location.href = '/login';
        } else if (err.response.data.msg === 'alumni already exists')
          setToastContent('已存在相同屆數與姓名的 Alumni');
        else setToastContent('更新資料失敗，請重新操作');
        setTimeout(() => {
          triggerToast('warning');
        }, 0);
      });

    endEdit(e);
  };
  const addAlumni = async (e) => {
    await axios
      .post(
        'http://localhost:5000/api/admin/add_alumni',
        {
          name: e.target.name.value,
          number: e.target.number.value,
          jobTitle: e.target.title.value,
          exp: fixMultipleInput(e.target.exp.value.split('；')),
          tags:
            e.target.tag.value === ''
              ? []
              : e.target.tag.value === false
              ? []
              : fixMultipleInput(e.target.tag.value.split('；')),
          avatar: e.target.avatar.value,
          major: fixMultipleInput(e.target.major.value.split('；')),
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .then((res) => {
        setToastContent(
          `成功新增${numberToRank(e.target.number.value)} ${
            e.target.name.value
          }`
        );
        setTimeout(() => {
          fetchData();
          setTimeout(() => {
            triggerToast('success');
            $('.dataModal').css('display', 'none');
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
        else setToastContent('新增資料失敗，請重新操作');
        setTimeout(() => {
          triggerToast('warning');
          $('.dataModal').css('display', 'block');
        }, 0);
      });
  };
  const switchPage = (certainPage) => {
    document.getElementById('settingPageSection').scrollIntoView();
    setNowPage(certainPage);
  };
  const preventMultipleEdit = (type) => {
    let editBtns = document.getElementsByClassName('btn-edit');
    switch (type) {
      case 'startEdit':
        for (var i = 0; i < editBtns.length; i++) {
          editBtns[i].setAttribute('disabled', true);
        }
        break;
      case 'endEdit':
        for (var i = 0; i < editBtns.length; i++) {
          editBtns[i].setAttribute('disabled', false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <SuccessToast />
      <WarningToast />
      <WarningModal />
      <PictureUploadModal />
      <AddAlumniModal />
      <div className="titleSection">
        <h2 className="title">Alumni 資料庫</h2>
        <Button
          variant="primary"
          onClick={() => {
            $('.dataModal').css('display', 'block');
          }}
        >
          新增 Alumni
        </Button>
      </div>
      <div className="tableContainer">
        <Table bordered>
          <thead>
            <tr>
              <th className="toBeFreezeCol1">姓名</th>
              <th className="toBeFreezeCol2">屆數</th>
              <th>頭銜</th>
              <th>學歷（；）</th>
              <th>經歷（；）</th>
              <th>領域標籤（；）</th>
              <th>照片</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {memberData?.map((member, i) => {
              if ((nowPage - 1) * 10 <= i && i < nowPage * 10) {
                return (
                  <AlumniRow
                    key={i}
                    name={member.name}
                    number={member.number}
                    title={member.jobTitle}
                    major={member.major}
                    exp={member.exp}
                    tags={member.tags}
                    avatar={member.avatar}
                    alumniId={member._id}
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

export default BackstageAlumniTable;
