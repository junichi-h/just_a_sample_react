import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

const Container = styled(animated.section)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.bgColor};
  transition: background-color 1s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transition;
`;

const SectionInner = styled(animated.div)`
  font-size: 40px;
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform, opacity;
`;

const SectionPage = props => (
  <Container bgColor={props.background}>
    <SectionInner>{props.text}</SectionInner>
  </Container>
);

export default SectionPage;
