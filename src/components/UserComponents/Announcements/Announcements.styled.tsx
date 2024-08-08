import styled from "styled-components";

// breakpoints
import { breakpoint } from "@/breakpoints";

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;d
  width: 100%;
  padding: 0px 8px 0px 8px;
  margin-bottom: 20px;
  ${breakpoint.md} {
    justify-content: left;
  }
`;
export const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 992px) {
    font-size: 16px;
    text-align: center;
  }
`;

export const Counter = styled.div`
  text-align: center;
  color: #f00000;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 8px;
`;

export const ctaButton = styled.div`
  border: none;
  color: #f00000;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: gray; /* Darker Green */
  }
`;

export const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px 0px;
`;

export const LoadMoreButton = styled.button`
  border: none;
  color: white;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  background-color: #f00000;
`;

export const NoMoreData = styled.div`
  border: none;
  color: #f00000;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 8px;
  background-color: white;
`;
