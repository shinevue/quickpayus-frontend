import { Switch } from "antd";
import * as Styled from "./settings.styled.js"; 

const NotificationSettings = () => {
   return (
      <Styled.SettingsBox>
         <Styled.SettingsBoxH2>
            Notification Settings
         </Styled.SettingsBoxH2>
         <div>
            <Styled.CustomSettingBox>
               <Styled.SettingsBoxP>
                  Alert notifications
               </Styled.SettingsBoxP>
               <Switch defaultChecked />
            </Styled.CustomSettingBox>
            <Styled.CustomSettingBox>
               <Styled.SettingsBoxP>
                  Allow notifications of important events on E-mail provided
               </Styled.SettingsBoxP>
               <Switch />
            </Styled.CustomSettingBox>
         </div>
      </Styled.SettingsBox>
   );
};

export default NotificationSettings;
