import $ from 'jquery';
import React, { useEffect } from 'react';
import icon_hamburger from '../asset/img/icon/icon_hamburger.svg';
import logo_red from '../asset/img/logo_red.svg';
import '../css/style.css';

function NavBar() {
  // const [dropDownOpen, setdropDownOpen] = useState(false);
  useEffect(() => {
    let href = window.location.href.split('/');
    if (
      href[href.length - 1] === 'backstage' ||
      href[href.length - 1] === 'login'
    ) {
      $('#fb-root').css('display', 'none');
      $('.navBar').css('display', 'none');
      $('.footer').css('display', 'none');
    }
  }, []);
  useEffect(() => {
    if (document.location.href[document.location.href.length - 1] === '/') {
      $('.navBar').addClass('navHamburgerWhite');

      $('.navBar').addClass('navBarPOF');
      $('.navBar').addClass('navBarTransparent');
      $('.navBar').addClass('navHamburgerWhite');
      $('.navBar__word').css('color', 'white');

      $(document).on('scroll', function () {
        if (window.pageYOffset > 20) {
          $('.navBar').removeClass('navBarTransparent');
          $('.navBar').removeClass('navHamburgerWhite');
          $('.navBar__word').css('color', '#1e1e1e');
        } else {
          $('.navBar').addClass('navBarTransparent');
          $('.navBar').addClass('navHamburgerWhite');
          $('.navBar__word').css('color', 'white');
        }
      });
    }

    return;
  }, []);

  const NavBarL = () => (
    <div className="navBar navBarL">
      <a href="/">
        <img src={logo_red} alt="bizPro Logo" className="navBar__logo" />
      </a>

      <div className="navBar__list">
        <div className="navBar__item navBar__word">
          <a href="/"> 關於 BizPro</a>
        </div>
        <div className="navBar__item navBar__word">
          <a href="/journey">學習旅程</a>
        </div>
        <div className="navBar__item navBar__word">
          <a href="/members">歷屆成員</a>
        </div>
        {/* <div className="navBar__item navBar__word">
          <a href="/activity">社群活動</a>
        </div> */}
        <div className="navBar__item navBar__word">
          <a href="/member_talk">成員心得</a>
        </div>
      </div>
    </div>
  );
  const NavBarS = () => (
    <div className="navBar navBarS">
      <a href="/">
        <img src={logo_red} alt="bizPro Logo" className="navBar__logo" />
      </a>
      <div className="navBar__list">
        <img
          className="navBar__item navBar__hamburger"
          src={icon_hamburger}
          alt="123"
          onClick={() => {
            if ($('.navBar__dropdown').css('display') === 'none') {
              $('.navBar__dropdown').css('display', 'flex');
            } else {
              $('.navBar__dropdown').css('display', 'none');
            }
          }}
        />
      </div>
      <div className="navBar__dropdown">
        <div className="dropdown__item">
          <a href="/">關於 BizPro</a>
        </div>
        <div className="dropdown__item">
          <a href="/journey">學習旅程</a>
        </div>
        <div className="dropdown__item">
          <a href="/members">歷屆成員</a>
        </div>
        {/* <div className="dropdown__item">
          <a href="/activity">社群活動</a>
        </div> */}
        <div className="dropdown__item">
          <a href="/member_talk">成員心得</a>
        </div>
      </div>
    </div>
  );
  return (
    <React.Fragment>
      <NavBarS />
      <NavBarL />
    </React.Fragment>
  );
}

export default NavBar;
