import UserThumbnail from "../components/UserThumbnail";
import dummyUser from "../assets/dummyUser.json";
import "./Profile.css";

function Profile() {
  return (
    <>
      <div className="profile_layout">
        <div className="profile_section1">
          <div className="thumbnail_container">
            <UserThumbnail src={dummyUser.thumbnail} size="large" />
          </div>
          <div>{dummyUser.name}</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
