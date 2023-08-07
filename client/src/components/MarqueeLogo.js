import React from 'react';
import bcg from '../asset/img/marquee_logo_bcg.svg';
import beBit from '../asset/img/marquee_logo_bebit.svg';
import dell from '../asset/img/marquee_logo_dell.svg';
import facebook from '../asset/img/marquee_logo_facebook.svg';
import google from '../asset/img/marquee_logo_google.svg';
import ibm from '../asset/img/marquee_logo_ibm.svg';
import jp from '../asset/img/marquee_logo_jp.svg';
import microsoft from '../asset/img/marquee_logo_microsoft.svg';

function MarqueeLogo() {
  const logoList = [beBit, bcg, facebook, google, ibm, jp, microsoft, dell];
  return (
    <>
      {logoList.map((logo, i) => {
        return (
          <img
            key={i}
            src={logo}
            alt="logo"
            className="marquee__item"
            style={{
              transform: `translate(${100 - Math.random() * 800}px,${
                100 - Math.random() * 800
              }px)`,
              opacity: 0,
            }}
          />
        );
      })}
    </>
  );
}

export default MarqueeLogo;
