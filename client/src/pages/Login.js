import axios from 'axios';
import $ from 'jquery';
import React from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../asset/img/backstage_logo_black.svg';

function Login({ setToken }) {
  const onSubmit = async (e) => {
    let token = await axios
      .post('http://localhost:5000/api/auth', {
        name: `${e.target.name.value}`,
        password: `${e.target.psw.value}`,
      })
      .then((res) => {
        window.location.replace('/backstage');
        $('.navBar').css('display', 'none');
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        $('.errorText').css('display', 'block');
      });
    console.log(token);
    setToken(token);
  };

  return (
    <section className="loginContainer">
      <form
        className="formContainer"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <img src={logo} alt="logo" />
        <p className="errorText">名稱或密碼錯誤</p>
        <input type="text" placeholder="名稱" name="name" required />
        <input type="password" placeholder="密碼" name="psw" required />
        <div className="buttonGroup">
          <a href="/">
            <p>返回官網</p>
          </a>
          <Button variant="primary" type="submit">
            登入
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Login;
