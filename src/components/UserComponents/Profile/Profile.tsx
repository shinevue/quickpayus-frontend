import React, { useState } from "react";
import { Skeleton } from "antd";
import KYCVerification from "./KYCVerification";
import ProfileAbout from "./ProfileAbout";
import ProfileHero from "./ProfileHero";
import * as Styled from "./Profile.styled";

const Profile = () => {
  return (
    <>
      <Styled.ProfileWrapper>
        <ProfileAbout />
        <KYCVerification />
      </Styled.ProfileWrapper>
    </>
  );
};

export default Profile;
