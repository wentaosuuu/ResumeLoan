import React, { Component } from 'react';
import './style/globalStyle.css';
import './style/style.css';
import { Form } from 'antd';
import Header from './header/header';
import Floor1 from './floor1/floor1';
import Floor2Left from './floor2/floor2Left';
import Floor2Right from './floor2/floor2Right';
import Floor3 from './floor3/floor3';


class App extends Component {
  state = {};

  render() {
    return (
      <div className="globalStyle">
        <div className="container">
          <div className="head">
            <Header/>
          </div>
          <div className="content">
            <div className="wrap">
              <Floor1/>
              <div className="floor floor2">
                <div className="headIcons">
                  <span></span>
                  <span></span>
                  <i></i>
                </div>
                <div className="title">融资需求</div>
                <div className="wrap">
                  <Floor2Left/>
                  <div className="line"/>
                  <div className="right">
                    <Floor2Right/>
                  </div>
                </div>
              </div>
              <div className="floor floor3">
                <Floor3/>
              </div>
              <div className="footer">
                <p className="line1">— 万众一心 众志成城 科技助力 抗击疫情 —</p>
                <p className="line2">
                  <img src={require('./images/footerImg/logo_zx.png')} alt=""/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(App);
