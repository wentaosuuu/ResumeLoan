import React, { Component } from 'react';
import '../style/globalStyle.css';
import '../style/style.css';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="logoBox">
          <i className="logo dx"/>
        </div>
        <div className="tip-header"/>
        <img className="tip-header-img" src={require('../images/headerImg/tips.png')} alt=""/>
        <div className="tip-body-wrap">
          <div className="tip-body">
            <div className="text">
              <div className="title">战疫情，众志成城&nbsp;&nbsp;稳经济，群策群力</div>
              <p>"2月29日，自治区政府举行广西金融支持疫情防控和复工复产工作新闻发布会，人民银行南宁中心支行党委书记、行长宋军对《深入推进“复工贷”促进广西经济平稳发展十条措施》进行解读。中国东信积极响应号召，上线中小企业融资信用服务平台，发挥科技优势，联合金融机构共同推广复工贷。"</p>
              <div className="footer">
                “复工贷”推广期间广西联合征信有限公司
                <strong>免费</strong>
                提供技术支持服务
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
