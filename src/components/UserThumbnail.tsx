import "./UserThumbnail.css";

type PageMode = "home" | "work" | "chat" | "profile";

type UserThumbnailProps = {
  src: string;
  setPageMode?: (page: PageMode) => void;
  size: "small" | "large";
};
const UserThumbnail = ({ src, setPageMode, size }: UserThumbnailProps) => {
  return (
    <div
      className={`${size}_thumbnail user_thumbnail`}
      onClick={() => {
        setPageMode && setPageMode("profile");
      }}
    >
      <img src={src} />
    </div>
  );
};

export default UserThumbnail;
