import React from "react";
import styled from "styled-components";

const WrapperUi = styled.div`
  max-width: 1500px;
  max-height: 1500px;
  background-color: orange;
`;

function Wrapper(props) {
  return <WrapperUi>{props.children}</WrapperUi>;
}

export default Wrapper;
