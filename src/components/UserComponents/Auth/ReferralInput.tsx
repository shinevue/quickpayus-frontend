import React, { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";
// antd
import { AutoComplete, Avatar } from "antd";
//styles
import * as Styled from './ReferralInput.style';

const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
  height: 40px;
`;


// const collaborators = [
//   { label: "hamada", value: "hamada", avatar: "http://localhost/1.png" },
//   { label: "kono", value: "kono", avatar: "http://localhost/1.png" },
//   // Add more collaborators as needed
// ];

interface ReferralInputProps {
  field: any;
  onChange: (value: string) => void;
}

export const ReferralInput: React.FC<ReferralInputProps> = ({
  field,
  onChange,
}) => {
  const [refers, setRefers] = useState<any>([]);

  const handleChange = useCallback((value: any) => {
    callReferrals(value);
    onChange(value);
  }, []);

  const callReferrals = async (value: any) => {
    const result: any = await axios.get('/api/v1/user/all/' + value);
    setRefers(result.data.users);
  }

  return (
    <StyledAutoComplete
      value={field.value}
      onBlur={field.onBlur}
      onChange={handleChange}
      options={refers.map((refer:any) => ({
        value: refer?.username,
        label: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Styled.StyledProfileAvatar style={{ background: refer?.avatarBg }}>
              {refer?.firstName[0]?.toUpperCase()}
            </Styled.StyledProfileAvatar>
            {refer?.username}
          </div>
        ),
      }))}
      placeholder="Select a referral"
    />
  );
};
