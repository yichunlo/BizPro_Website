import $ from 'jquery';
import React from 'react';
import logo from '../asset/img/logo_red.svg';

function LogoLoading() {
  return (
    <div className="logoLoading">
      <div
        className="logoContainer"
        onClick={() => {
          $('.logoContainer').css('animation-iteration-count', '1');
          setTimeout(() => {
            $('.logoContainer').css('width', '200px');
            setTimeout(() => {
              $('.logoLoading').fadeOut();
            }, 1000);
          }, 500);
        }}
      >
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default LogoLoading;
