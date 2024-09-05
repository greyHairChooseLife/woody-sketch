import "./Style.css";

function Style() {
  const imgListUp = [
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      name: "오크",
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      name: "아델",
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      name: "까사",
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      name: "헤리티지월넛",
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      name: "편백",
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      name: "애쉬",
    },
  ];

  return (
    <>
      <div className="style_page_img_box_container">
        {imgListUp.map(({ src, name }) => (
          <ImgBox key={src + name} src={src} name={name} />
        ))}
      </div>
    </>
  );
}

type ImgBoxProps = {
  src: string;
  name: string;
};

const ImgBox = ({ src, name }) => {
  return (
    <div className="style_page_img_box">
      <img src={src} />
      <span>{name}</span>
    </div>
  );
};

export default Style;
