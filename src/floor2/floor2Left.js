import React, {Component} from 'react';
import '../style/globalStyle.css';
import '../style/style.css';

export default class Floor2Left extends Component {
  render() {
    return (
      <div>
        <div className="left">
          <h5></h5>
          <div className="tab">
            <div className="thead col">
              <div className="td1">三大法宝</div>
              <div className="td2">产品特点</div>
              <div className="td3">基本要求</div>
            </div>
            <div className="tbody">
              <div className="col">
                <div className="td td1">
                  小微信用融资
                  <p>民微首贷神器</p>
                </div>
                <div className="td td2">
                  <ul>
                    <li>最高500万元，最长1年</li>
                    <li>用于短期生产经营周转</li>
                    <li>免抵押纯信用</li>
                  </ul>
                </div>
                <div className="td td3"> 企业成立年限满2年，按时足额纳税，无不良信用记录</div>
              </div>
              <div className="col">
                <div className="td td1">
                  应收账款融资
                  <p>贷款回笼神器</p>
                </div>
                <div className="td td2">
                  <ul>
                    <li>最高2000万元，最长1年</li>
                    <li>帮助企业快速回笼货款</li>
                    <li>免抵押免担保</li>
                  </ul>
                </div>
                <div className="td td3"> 无不良信用记录，与大型企事业单位有真实订单往来</div>
              </div>
              <div className="col">
                <div className="td td1">
                  政府性担保融资
                  <p>低成本增信神器</p>
                </div>
                <div className="td td2">
                  <ul>
                    <li>最高2000万元，最长3年</li>
                    <li>推广期间<span>减免担保费</span></li>
                    <li>政府性担保机构增信</li>
                  </ul>
                </div>
                <div className="td td3"> 无不良信用记录，重点支持疫情防控重点保障企业及受疫情影响严重的复工复产小微企业</div>
              </div>
            </div>
          </div>
          <div className="footer">*具体产品服务要求以金融机构官网为准</div>
        </div>
      </div>
    );
  }
}
