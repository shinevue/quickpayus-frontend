import profilePic from "@/assets/images/profile-pic.png";
import editIcon from "@/assets/images/edit-icon.svg";
import locationIcon from "@/assets/images/location-icon.svg";

import * as Styled from "./Profile.styled.js"; 

const ProfileHero = () => {
   return (
      <>
         <Styled.ProfileHeroHeader/>

         <Styled.ProfileHeroContent>
            <Styled.ProfileHeroImageWrapper>
               <Styled.ProfileHeroImage src={profilePic} alt="user"/>
               <div>
                  <Styled.ProfileHeroName>
                     Christine Joseph
                     <img
                        src={editIcon}
                        alt="e"
                     />
                  </Styled.ProfileHeroName>
                  <Styled.ProfileHeroLocation>
                     <img src={locationIcon} alt="e" />
                     Paris, France.
                  </Styled.ProfileHeroLocation>
               </div>
            </Styled.ProfileHeroImageWrapper>
            <div>
               <Styled.ProfileHeroLevel>
                  Lvl. 2
               </Styled.ProfileHeroLevel>
            </div>
         </Styled.ProfileHeroContent>
      </>
   );
};

export default ProfileHero;
