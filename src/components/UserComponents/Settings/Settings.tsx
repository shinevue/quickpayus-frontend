import AccountDeactivation from "./AccountDeactivation";
import GeneralSettings from "./GeneralSettings";

import * as Styled from "./settings.styled.js";

const Settings = () => {
  return (
    <>
      <Styled.SettingsH1>Settings</Styled.SettingsH1>
      <GeneralSettings />
      <AccountDeactivation />
    </>
  );
};

export default Settings;
