import React, { useEffect, useState } from "react";

import { addMonths, subMonths } from "date-fns";
import CalendarDay from "../components/calendar/CalendarDay";
import CalendarSells from "../components/calendar/CalendarSells";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarPlanModal from "../components/calendar/CalendarPlanModal";
import PlanList from "../components/calendar/PlanList";
import { deleteCalendarTitle, selectTitle } from "../features/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import CalendarEditModal from "../components/calendar/CalendarEditModal";
import styled from "styled-components";

/* 스타일 예시 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  /* background-color: #fff; */
  /* padding: 20px; */
  /* border-radius: 5px; */
  width: 100%;
  height: 100%;
`;

function Calendar(props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);
  const selectedTitle = useSelector(selectTitle);
  const dispatch = useDispatch();

  function handleDelete(id) {
    setDeletedItems([...deletedItems, id]);
    dispatch(deleteCalendarTitle(id));
  }

  useEffect(() => {
    const savedDeletedItems = JSON.parse(localStorage.getItem("deletedItems"));
    if (savedDeletedItems) {
      setDeletedItems(savedDeletedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("deletedItems", JSON.stringify(deletedItems));
  }, [deletedItems]);

  const filteredSelectedTitle = selectedTitle.filter(
    (item) => !deletedItems.includes(item.id)
  );

  const clickEditModal = () => {
    setEditModal(true);
  };

  const clickModal = () => {
    setModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const closeModal = () => {
    setModal(false);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="show-content">
      <div className="calendar" style={{ marginLeft: "50px" }}>
        <CalendarHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <CalendarDay />
        <CalendarSells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          clickModal={clickModal}
          onDateClick={onDateClick}
          filteredSelectedTitle={filteredSelectedTitle}
        />
        <PlanList
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          editModal={editModal}
          onDateClick={onDateClick}
          filteredSelectedTitle={filteredSelectedTitle}
          handleDelete={handleDelete}
          clickEditModal={clickEditModal}
        />
        {modal && (
          <ModalOverlay className="modal-overlay">
            <ModalContainer className="modal-container">
              <CalendarPlanModal
                closeModal={closeModal}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
              />
            </ModalContainer>
          </ModalOverlay>
        )}
        {editModal && (
          <ModalOverlay className="modal-overlay">
            <ModalContainer className="modal-container">
              <CalendarEditModal
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                clickEditModal={clickEditModal}
                onDateClick={onDateClick}
                closeEditModal={closeEditModal}
              />
            </ModalContainer>
          </ModalOverlay>
        )}
      </div>
    </div>
  );
}
export default Calendar;
