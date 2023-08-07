import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Route, Routes } from "react-router-dom";

import Calendar from "./pages/Calendar";

const GlobalStyled = createGlobalStyle`
  ${reset}
  
  body {
    /* margin-top: 100px; */
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /* background-color: #e9ecef; */
  }
  
  * {
    font-size: 14px;
    /* user-select: none; */
  }

  .show-content {
    /* padding: 20px; */
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin-right: 50px;

    /* 스크롤 커스텀 */
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #ccc;
      cursor: pointer;
    }
  }

  .cursor-point {
    cursor: pointer;
  }

  .inner {
    width: 900px;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <>
      <GlobalStyled />
      <Container>
        <Routes>
          <Route path="/" element={<Calendar />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
