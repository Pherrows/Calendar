import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillChatFill } from "react-icons/bs";
import { FaRegUserCircle, LiaUserCircleSolid } from 'react-icons/lia'
import { IoLogOutOutline, IoTicketOutline } from "react-icons/io5";
import { PiTicketBold } from "react-icons/pi";

import logo from "../images/logo.png";

import Chat from '../pages/Chat';
import Button from './ui/Button';
import { LogInUser, isUserLogin, logOutUser } from '../features/loginSlice';
import { getUserData } from '../api/userDataAPI';
import { addUserData } from '../features/userDataSlice';


const LayoutStyled = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* background-color: #f0f8ff; */
  position: relative;
  /* border: 1px solid; */
`;

const Navbar = styled.nav`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #f5cc8d;
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: #fff;
  /* margin: 0 auto; */
  z-index: 9;

  svg {
    font-size: 25px;
  }

  ul {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }
`;

const Category = styled(NavLink)`
  color: #acacac;
  text-decoration: none;

  &:hover {
    color: #f5cc8d;
  }

  &.active {
    color: #edaa45;
  }
`;


const ShowItem = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ProfileArea = styled.div`
  width: 25%;
  position: relative;
  /* display: flex;
  align-items: center; */
  box-sizing: border-box;
  margin-right: 30px;

  img {
    /* padding: 20px; */
    width: 100%;
  }
`;

const ProfileCard = styled.div`
  width: 100%;
  /* height: 400px; */
  padding: 10px;
  border-radius: 15px;
  /* background-color: #efefef; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  /* position: fixed; */
  margin: 0 auto;
  top: 180px;
  left: 0;
  right: 0;
  
  
  img {
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .name-logout {
    margin: 20px 0;
    display:flex;
    justify-content: space-between;
    align-items: end;
  }

  svg {
    font-size: 25px;
    padding-right: 5px;

    &:hover {
      color: #edaa45;
    }
  }

  .name {
    font-size: 20px;
    font-weight: 600;
  }

  .birth {
    font-size: 15px;
  }
`;

const ChatButton = styled.div`
  position: fixed;
  bottom: 40px;
  right: 70px;

  svg {
    font-size: 40px;

    color: #f5cc8d;
    &:hover {
      color: red;
    }
  }
`;


function Layout({selectedImage}) {
  const [showChatModal, setShowChatModal] = useState(false);

  const logInUSerInfo = useSelector(LogInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChatModal = () => {
    setShowChatModal(true);
  };

  

  return (
    <LayoutStyled >
      <Navbar>
        {/* 모바일 버전 메뉴 */}
        {/* <ul className='m-nav'>
          <li className='cursor-point' onClick={() => navigate('/')}><FaHome /></li>
          <li className='cursor-point' onClick={() => navigate('/chat')}><BsFillChatFill /></li>
          <li className='cursor-point' onClick={() => navigate('/calendar')}><AiFillCalendar /></li>
          <li className='cursor-point' onClick={() => navigate('/photo')}><HiPhoto /></li>
        </ul> */}

        <ul className='inner'>
          <li><Category to="/">Home</Category></li>
          <li><Category to="/members">Members</Category></li>
          <li><Category to="/calendar">Calendar</Category></li>
          <li><Category to="/photo">Photo</Category></li>
          <li><Category to="/pass"><IoTicketOutline /></Category></li>
          <li><Category to="/mypage"><LiaUserCircleSolid  size={28}/></Category></li>
          <li>
            <Button title="Logout" onClick={() => {
              dispatch(logOutUser());
              localStorage.removeItem('loginUser');
              navigate('login');
            }} />
          </li>
        </ul>
        {/* 버튼 */}
      </Navbar>
      
      <ShowItem  >
        {/* 유저 정보 */}
        <ProfileArea>
          <img src={logo} />
          <ProfileCard>
          <img src={selectedImage || logInUSerInfo.imagePath} alt="Profile" />
            <div className='name-logout'>
              <p className='name'>{logInUSerInfo.name} 님</p>
            </div>
            <p className='birth'>{logInUSerInfo.birth}</p>          
          </ProfileCard>
        </ProfileArea>

        {/* 페이지 영역 */}
        <Outlet />
      </ShowItem>
      
      {/* 채팅 버튼 */}
      <ChatButton>
        <BsFillChatFill className='cursor-point' onClick={handleChatModal} />
      </ChatButton>
      
      {/* 채팅 모달 */}
        {/* <Chat showChatModal = {showChatModal} setShowChatModal={setShowChatModal} /> */}
        { showChatModal && <Chat setShowChatModal={setShowChatModal} /> }
    </LayoutStyled>
  );  
}

export default Layout;