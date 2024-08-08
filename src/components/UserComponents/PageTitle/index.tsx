// styled components
import * as Styled from "./styled";

interface PageTitleProps {
  title?: string;
  description?: string;
  level?: number;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description, level }) => {
  return (
    <Styled.PageTitle level={level || 0}>
      <Styled.Title hasMarginBottom={!!description} level={level || 0}>
        {title}
      </Styled.Title>
      <Styled.Description level={level || 0}>{description}</Styled.Description>
    </Styled.PageTitle>
  );
};

export default PageTitle;
