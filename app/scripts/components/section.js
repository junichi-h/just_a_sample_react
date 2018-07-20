import React from 'react';
import styled from 'styled-components';

const SectionInner = styled.div`
  font-size: 40px;
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  // transition: opacity 1s 1s cubic-bezier(0.23, 1, 0.32, 1);
`;

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: ${props => props.bgColor};
  transition: background-color 1s cubic-bezier(0.19, 1, 0.22, 1);
`;

const Section = props => (
  <Container bgColor={props.background}>
    <SectionInner className="inner">{props.text}</SectionInner>
  </Container>
);

export default Section;
