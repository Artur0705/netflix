import React from "react";
import "./ProfileScreen.css";
import Nav from "../../components/nav/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/counter/userSlice";
import { auth } from "../../firebase";
import PlanScreen from "../../components/planns/PlanScreen";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  return (
    <div className="profile-screen">
      <Nav />
      <div className="profile-screen-body">
        <h1>Edit Profile</h1>
        <div className="profile-screen-info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="profileImg"
          />

          <div className="profile-screen-details">
            <h2>{user.email}</h2>
            <div className="profile-screen-plans">
              <h3>Plans</h3>
              <PlanScreen />
              <button
                onClick={() => auth.signOut()}
                className="profile-screen-signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
