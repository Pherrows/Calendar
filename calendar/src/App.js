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
    font-family: 'GmarketSansMedium';
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

const Wrapper = styled.div`
  width: 900px;
  /* height: 850px; */
`;
// ddddd
// const Footer = styled.div`
//   border-top: 2px solid #f5cc8d;
//   color: #acacac;
//   width: 100%;
//   height: 120px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   .innerFooter {
//     width: 900px;
//     .footerContent {
//       margin-left: 1%;
//       .menu {
//         display: flex;
//         margin-bottom: 7px;
//         li {
//           margin-right: 10px;
//           a {
//             color: inherit;
//             text-decoration: none;
//           }
//         }
//       }
//       .info {
//         margin-bottom: 5px;
//         font-weight: 300;
//         font-size: 12px;
//       }
//       .copyright {
//         font-size: 12px;
//       }
//     }
//   }
// `;

function App() {
  return (
    <>
      <GlobalStyled />
      <Container>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Calendar />} />
          </Routes>
        </Wrapper>
      </Container>
    </>
  );
}

export default App;
