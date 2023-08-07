import React from 'react';
import icon_email from '../asset/img/icon/icon_email.svg';
import icon_facebook from '../asset/img/icon/icon_facebook.svg';
import icon_instagram from '../asset/img/icon/icon_instagram.svg';
import '../css/style.css';

function Footer() {
  return (
    <div className="footer">
      <p className="footer__hashtag">#BeAGameChanger</p>
      <div className="linkList">
        <a
          className="linkList__item"
          href="https://www.facebook.com/bizproXchange"
          target="_blank"
        >
          <img
            src={icon_facebook}
            alt="BizPro facebook"
            className="linkList__icon icon--facebook"
          />
          <p className="linkList__word">BizPro 台大商學研究社</p>
        </a>
        <a
          className="linkList__item"
          target="_blank"
          href="https://www.instagram.com/ntu_bizpro/"
        >
          <img
            src={icon_instagram}
            alt="BizPro instagram"
            className="linkList__icon icon--Instagram"
          />
          <p className="linkList__word">ntu_bizpro</p>
        </a>
        <a
          className="linkList__item"
          href="mailto:bizpro.taipei@gmail.com"
          target="_blank"
        >
          <img
            src={icon_email}
            alt="BizPro email"
            className="linkList__icon icon--email"
          />
          <p className="linkList__word">bizpro.taipei@gmail.com</p>
        </a>
      </div>
      <div className="caption">
        <p className="notation__word">
          © 2022 BizPro 台大商學研究社. All rights Reserved. Site by BizPro 21st
          & 22nd
        </p>
      </div>
    </div>
  );
}

export default Footer;
