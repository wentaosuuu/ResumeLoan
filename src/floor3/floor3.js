import React, {Component} from 'react';
import '../style/globalStyle.css';
import '../style/style.css';

export default class Floor3 extends Component {
  render() {
    return (
      <div>
        <div className="headIcons">
          <span></span>
          <span></span>
          <i></i>
        </div>
        <div className="title">合作金融机构</div>
        <div className="imgWrap">
          <img src={require('../images/contentImg/banks/logo_gongshang.png')} alt=""/>
          <img src={require('../images/contentImg/banks/logo_nongye.png')} alt=""/>
          <img src={require('../images/contentImg/banks/logo_zhonghang.png')} alt=""/>
          <img src={require('../images/contentImg/banks/logo_jianshe.png')} alt=""/>
          <img src={require('../images/contentImg/banks/logo_yirong.png')} alt=""/>
          <img src={require('../images/contentImg/banks/logo_youchu.png')} alt=""/>
          <img src={require('../images/contentImg/banks/logo_beibuwan.png')} alt=""/>
          <img src={require('../images/contentImg/banks/logo_guilin.png')} alt=""/>
          <img src={require('../images/contentImg/banks/logo_huaxia.png')} alt=""/>
        </div>
      </div>
    );
  }
}
