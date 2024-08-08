import React, { useState } from "react";
import { Collapse, Button } from "antd";

const { Panel } = Collapse;

interface ExpandableTextProps {
  text: string;
  maxLength: number;
}
const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <p>
        {expanded
          ? text
          : text.length < maxLength
          ? text
          : `${text.slice(0, maxLength)}...`}
        {text.length > maxLength && (
          <Button type="link" onClick={handleExpandClick}>
            {expanded ? "Show Less" : "Show More"}
          </Button>
        )}
      </p>
    </div>
  );
};

export default ExpandableText;
