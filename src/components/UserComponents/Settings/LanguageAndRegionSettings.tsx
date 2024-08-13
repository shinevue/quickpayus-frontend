import rightArrow from "@/assets/images/red-right-arrow.svg";
import * as Styled from "./settings.styled.js"; 

const LanguageAndRegionSettings = () => {
   return (
      <Styled.SettingsBox>
         <Styled.SettingsBoxH2>
            Language & Region
         </Styled.SettingsBoxH2>
         <div>
            <Styled.CustomSettingBox>
               <Styled.SettingsBoxP>
                  Choose Language
               </Styled.SettingsBoxP>
               <img src={rightArrow} alt="." />
            </Styled.CustomSettingBox>
            <Styled.CustomSettingBox>
               <Styled.SettingsBoxP>
                  Choose Region
               </Styled.SettingsBoxP>
               <img src={rightArrow} alt="." />
            </Styled.CustomSettingBox>
         </div>
      </Styled.SettingsBox>
   );
};

export default LanguageAndRegionSettings;
