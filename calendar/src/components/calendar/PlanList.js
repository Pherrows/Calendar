import React from "react";
import styled from "styled-components";
import { getSelectedPlan } from "../../features/calendarSlice";
import { useDispatch } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";

const PlanListWrapper = styled.div`
  width: 300px;
  position: absolute;
  top: 50px;
  right: 250px;
  /* height: 300px; */
  /* background-color: orange; */
  /* display: flex; */
  /* margin-left: 50px; */
`;

const ScheduleList = styled.div`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 100px;
`;

const StyledPlanList = styled.div`
  width: 150%;
  height: 40px;
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
  width: 65%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
  font-weight: 600;
  font-size: 15px;
  padding-top: 3px;
`;

const SelectedDate = styled.div`
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
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
  // const selectedTitle = useSelector(selectTitle);

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
              <GoDotFill
                color="#5CE1E6"
                size={15}
                style={{ marginLeft: "5px" }}
              />
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
