import React, { useEffect, useState } from "react";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  parseISO,
} from "date-fns";
import styled from "styled-components";
import CalendarPlanModal from "./CalendarPlanModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addCalendarTitle,
  deleteCalendarTitle,
  selectTitle,
} from "../../features/calendarSlice";
// import { format } from 'date-fns/esm';
import { BsDot, GoDotFill } from "react-icons/go";

const CalendarContainer = styled.div`
  .body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 5px;
    width: 70%;
    /* margin-left: 200px; */
  }

  .col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 200px;
    height: 120px;
    padding-left: 1%;
    background: rgb(239, 239, 239);
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    padding: 2px;
    color: #333;
    margin-right: 10px;
  }

  .col.cell {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #f5cc8d;
    }

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    &.selected {
      /* background: #f5cc8d; */
      /* color: #fff; */
    }

    &.not-valid {
      color: gray;
    }
    span {
      margin-left: 3px;
      margin-top: 2px;
      font-size: 16px;
    }
  }
`;
// 확인용
const SellInTitle = styled.div`
  width: 100px;
  /* background-color: #f5cc8d; */
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 3px;
  font-weight: 500;

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 2px;
    font-size: 14px;
    width: 80px;
    padding: 2px;
    font-weight: 400;
  }
`;

function CalendarSells({
  currentMonth,
  selectedDate,
  onDateClick,
  clickModal,
  filteredSelectedTitle,
}) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const selectedTitle = useSelector(selectTitle);
  const dispatch = useDispatch();
  const [deletedItems, setDeletedItems] = useState([]);

  const { title = "" } =
    selectedTitle.find((item) => item.date === selectedDate) || {};

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  const handleDateClick = (clickedDate) => {
    onDateClick(clickedDate);
    clickModal();
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = format(day, `yyyy-MM-dd`);
      const parsedDate = parseISO(cloneDay);

      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => handleDateClick(parsedDate)}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate.toString()}
          </span>

          {filteredSelectedTitle
            .filter((item) => {
              const date =
                item.date instanceof Date
                  ? format(item.date, "yyyy-MM-dd")
                  : item.date;

              return date === cloneDay;
            })
            .map((item, index) => (
              <SellInTitle key={index}>
                <GoDotFill color="#5ce1e6" size={11}></GoDotFill>
                <div className="title">{item.title}</div>
              </SellInTitle>
            ))}
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );

    days = [];
  }

  return <CalendarContainer>{rows}</CalendarContainer>;
}

export default CalendarSells;
