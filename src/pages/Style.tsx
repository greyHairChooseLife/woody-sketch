import "./Style.css";

function Style() {
  const imgListUp = [
    {
      src: "/woody-sketch/pallet-oke.jpg",
      name: "오크",
    },
    {
      src: "/woody-sketch/pallet-adel.jpg",
      name: "아델",
    },
    {
      src: "/woody-sketch/pallet-adel.jpg",
      name: "까사",
    },
    {
      src: "/woody-sketch/pallet-heri.jpg",
      name: "헤리티지월넛",
    },
    {
      src: "/woody-sketch/pallet-pb.jpg",
      name: "편백",
    },
    {
      src: "/woody-sketch/pallet-ash.jpg",
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

const ImgBox = ({ src, name }: ImgBoxProps) => {
  return (
    <div className="style_page_img_box">
      <img src={src} />
      <span>{name}</span>
    </div>
  );
};

export default Style;
