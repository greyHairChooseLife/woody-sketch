import "./Product.css";

function Product() {
  const productList = {
    인테리어: ["티슈케이스", "책꽂이", "자동차", "열쇠 걸이", "휴대폰 거치대"],
    학용품: ["테이프 커터기", "볼펜", "책갈피", "연필 꽂이"],
    주방용품: ["도마", "컵 받침", "냅비 받침", "나무 트레이"],
  };
  return (
    <>
      <div className="product_page_img_box_container">
        {Object.entries(productList).map(([title, list]) => (
          <ProductBox key={title} title={title} list={list} />
        ))}
      </div>
    </>
  );
}

type ProductBoxProps = {
  title: string;
  list: string[];
};

const ProductBox = ({ title, list }: ProductBoxProps) => {
  return (
    <div>
      <div className="product_page_box_title">{title}</div>
      <div className="product_page_box">
        {list.map((item) => (
          <div className="product_page_box_item" key={title + item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
