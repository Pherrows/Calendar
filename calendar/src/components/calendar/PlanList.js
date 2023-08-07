import React, { useState } from "react";
import styled from "styled-components";
import {
  addCalendarTitle,
  selectTitle,
  getSelectedPlan,
  deleteCalendarTitle,
} from "../../features/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";

const PlanListWrapper = styled.div`
  /* background-color: orange; */
  width: 220px;
  /* height: 300px; */
  position: absolute;
  top: 150px;
  right: 350px;
`;

const ScheduleList = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPlanList = styled.div`
  width: 150%;
  /* height: 20px; */
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 6px;
  font-size: 15px;
  display: flex;
  align-items: center;
  border: 0.4px solid #f5cc8d;
  padding: 3px 0;

  cursor: pointer;
  &:hover {
    background-color: #f5cc8d;
  }
`;

const StyledTitle = styled.div`
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 5px;
  font-weight: 600;
  font-size: 11px;
  padding-top: 3px;
`;

const SelectedDate = styled.div`
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 10px;
`;

function PlanList({
  currentMonth,
  selectedDate,
  onDateClick,
  clickModal,
  filteredSelectedTitle,
  handleDelete,
  clickEditModal,
}) {
  const selectedTitle = useSelector(selectTitle);
  const [deletedItems, setDeletedItems] = useState([]);
  const dispatch = useDispatch();
  const sortedSelectedTitle = filteredSelectedTitle
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleClickPlan = (id) => {
    // clickModal();
    dispatch(getSelectedPlan(id));
    clickEditModal();
  };

  return (
    <PlanListWrapper>
      <ScheduleList>Schedule List</ScheduleList>
      <>
        {sortedSelectedTitle.map((item, index) => {
          return (
            <StyledPlanList
              onClick={() => handleClickPlan(item.id)}
              key={index}
            >
              <GoDotFill color="#5CE1E6" size={15} />
              <StyledTitle>{item.title}</StyledTitle>
              <SelectedDate>{item.date}</SelectedDate>
              <MdDeleteForever
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                size={25}
                style={{ marginLeft: "20px" }}
              ></MdDeleteForever>
            </StyledPlanList>
          );
        })}
      </>
    </PlanListWrapper>
  );
}

export default PlanList;
