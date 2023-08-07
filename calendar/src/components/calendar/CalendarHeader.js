import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { format } from "date-fns";
import styled from "styled-components";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid gray; */
  margin-top: 100px;
  width: 80%;
  margin-bottom: 10px;
`;

const StyledDiv = styled.div`
  .heder-start {
  }
  .heder-end {
  }

  svg {
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
`;

const StyledSpan = styled.span`
  .month {
    font-size: 30px;
    margin-left: 7px;
    margin-right: 7px;
    font-weight: bold;
  }
`;

function CalendarHeader({ currentMonth, prevMonth, nextMonth }) {
  return (
    <Header className="heder">
      <StyledDiv className="heder-start">
        <StyledSpan className="year">
          <StyledSpan className="month">
            {format(currentMonth, "M")}월
          </StyledSpan>
          {format(currentMonth, "yyyy")}
        </StyledSpan>
      </StyledDiv>

      <StyledDiv className="heder-end">
        <BsFillArrowLeftCircleFill
          className="left"
          size={27}
          color="#f5cc8d"
          onClick={prevMonth}
        />
        <BsFillArrowRightCircleFill
          className="right"
          size={27}
          color="#f5cc8d"
          onClick={nextMonth}
        />
      </StyledDiv>
    </Header>
  );
}

export default CalendarHeader;
