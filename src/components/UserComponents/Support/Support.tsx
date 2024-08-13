import LightBg from "@/assets/support/bg-2.svg";
import DarkBg from "@/assets/support/bg-3.svg";

// antd
import type { SearchProps } from "antd/es/input/Search";
import {
  FileProtectOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

// styles
import * as Styled from "./Support.styled";
import { useSelector } from "react-redux";
import { selectSetting } from "@/app/selectors";

const Support = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const settings = useSelector(selectSetting);

  return (
    <div>
      <Styled.BgTop>
        <Styled.ImageBg src={ settings.themeMode === 'light' ? LightBg : DarkBg} />
        <div className="w-full absolute">
        <Styled.StyledH1>How can we help?</Styled.StyledH1>
        <Styled.StyledSearch
          placeholder="Input search text"
          allowClear
          onSearch={onSearch}
          size="middle"
        />
        </div>
      </Styled.BgTop>
      <Styled.TopicWrapper>
        <Styled.StyledH2>
          Choose a topic to help us route your request quickly.
        </Styled.StyledH2>
        <Styled.StyledRow justify="center" style={{ gap: 10 }}>
          <Styled.StyledCol span={24} lg={7}>
            <Styled.StyledLink to="/support/ticket">
              <Styled.IconWrapper>
                <FileProtectOutlined />
              </Styled.IconWrapper>
              <Styled.ItemTitleWrapper>
                Ticket Submission
              </Styled.ItemTitleWrapper>
            </Styled.StyledLink>
          </Styled.StyledCol>
          <Styled.StyledCol span={24} lg={7}>
            <Styled.StyledLink to="/support/feedback">
              <Styled.IconWrapper>
                <QuestionCircleOutlined />
              </Styled.IconWrapper>
              <Styled.ItemTitleWrapper>Feedback</Styled.ItemTitleWrapper>
            </Styled.StyledLink>
          </Styled.StyledCol>
        </Styled.StyledRow>
      </Styled.TopicWrapper>
    </div>
  );
};

export default Support;
