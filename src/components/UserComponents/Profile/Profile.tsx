import KYCVerification from "./KYCVerification";
import ProfileAbout from "./ProfileAbout";
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
