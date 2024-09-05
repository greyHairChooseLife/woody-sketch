import { RiTruckLine } from "react-icons/ri";
import "./Order.css";

function Order() {
  return (
    <>
      <div className="order_page">
        <div>
          <div className="title">주문하신 상품이 도착했어요</div>
          <div className="progress-bar">
            <div className="step">
              <div className="circle"></div>
              <div className="description">발송</div>
            </div>
            <div className="step">
              <div className="circle"></div>
              <div className="description">집하</div>
            </div>
            <div className="step">
              <RiTruckLine className="progress-icon" />
              <div className="circle"></div>
              <div className="description description_green">배송중</div>
            </div>
            <div className="step">
              <div className="circle"></div>
              <div className="description">도착</div>
            </div>
          </div>
          <div className="order-info">
            <div className="item">
              <img src="/woody-sketch/down/TalkMedia_i_85c08de5fe3a.jpg.jpg" />
            </div>
            <div className="order-details">
              <div>컵 받침(주문 제작)</div>
              <div className="order-details-appendix">주문제작 | 해당없음</div>
            </div>
          </div>
        </div>
        <div className="logistics">
          <div className="log-entry">
            <div>배송기록</div>
            <div>2024-08-08</div>
            <div>배송 출발</div>
          </div>
          <div className="log-entry">
            <div>2024-08-08</div>
            <div>배송 진행중</div>
          </div>
          <div className="log-entry">
            <div>2024-08-07</div>
            <div>배송 진행중</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
