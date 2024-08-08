import { Link } from "react-router-dom";

// antd
import type { SearchProps } from "antd/es/input/Search";
import { FileProtectOutlined, QuestionCircleTwoTone } from "@ant-design/icons";

// styles
import * as Styled from "./Support.styled";


const Support = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div>
      <Styled.BgTop>
        <Styled.StyledH1>How can we help?</Styled.StyledH1>
        <Styled.StyledSearch
          placeholder="Input search text"
          allowClear
          onSearch={onSearch}
          size="middle"
        />
      </Styled.BgTop>
      <Styled.TopicWrapper>
        <Styled.StyledH2>
          Choose a topic to help us route your request quickly.
        </Styled.StyledH2>
        <Styled.StyledRow justify="center" style={{ gap: 10 }}>
          <Styled.StyledCol span={24} lg={7}>
            <Link to="/support/ticket">
              <Styled.IconWrapper>
                <FileProtectOutlined />
              </Styled.IconWrapper>
              <Styled.ItemTitleWrapper>
                Ticket Submission
              </Styled.ItemTitleWrapper>
            </Link>
          </Styled.StyledCol>
          <Styled.StyledCol span={24} lg={7}>
            <Link to="/support/feedback">
              <Styled.IconWrapper>
                <QuestionCircleTwoTone />
              </Styled.IconWrapper>
              <Styled.ItemTitleWrapper>Feedback</Styled.ItemTitleWrapper>
            </Link>
          </Styled.StyledCol>
        </Styled.StyledRow>
      </Styled.TopicWrapper>
    </div>
  );
};

export default Support;
