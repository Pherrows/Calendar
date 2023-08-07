import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  font-size: 20px;
  margin-top: 20px;
  font-weight: 600;
  width: 80%;
  margin-bottom: 28px;
`;

const StyledCol = styled.div`
  margin-right: 33px;
  border-radius: 3px;
  margin-left: 3px;
  width: 160px;
  padding: 2px;
  margin-right: 30px;
  color: ${(props) =>
    props.isSunday ? "#f5cc8d" : props.isSaturday ? "#5CE1E6" : "black"};
`;

function CalendarDay(props) {
  const days = [];
  const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const isSunday = i === 0; // 0: Sunday
    const isSaturday = i === 6; // 6: Saturday
    days.push(
      <StyledCol key={i} isSunday={isSunday} isSaturday={isSaturday}>
        {date[i]}
      </StyledCol>
    );
  }

  return <StyledDiv>{days}</StyledDiv>;
}

export default CalendarDay;
