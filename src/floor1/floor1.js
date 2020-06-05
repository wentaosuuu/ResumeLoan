import React, { Component } from 'react';
import '../style/globalStyle.css';
import '../style/style.css';

export default class Floor1 extends Component{
  render() {
    return (
      <div>
        <div className="floor floor1">
          <div className="headIcons">
            <span/>
            <span/>
            <i src={require('../images/contentImg/2.png')}/>
          </div>
          <div className="title">三重“防护”</div>
          <ul className="wrap">
            <li>
              <img src={require('../images/contentImg/boy.png')} alt=""/>
              <div className="text">
                <div className="name">数据增信 减免担保</div>
                <div className="info">整合贸易流、资金流、信息流和物流等产业链大数据，出具企业征信报告赋能小微企业融资，帮助更多企业获得“无抵押、免担保”贷款
                </div>
              </div>
            </li>
            <li>
              <img src={require('../images/contentImg/money.png')} alt=""/>
              <div className="text">
                <div className="name">融资顾问 精准匹配</div>
                <div className="info">为小微企业提供智能融资顾问服务，基于企业真实经营情况和合理资金需求精准匹配金融机构和金融产品，推动企业融资需求高效转化</div>
              </div>
            </li>
            <li>
              <img src={require('../images/contentImg/store.png')} alt=""/>
              <div className="text">
                <div className="name">在线服务 安全防疫</div>
                <div className="info">搭建云客服体系提供网页、APP、微信、微博和邮件等全渠道在线服务，实现线上融资对接避免人员集聚，保障复工复产和疫情防控两不误</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
