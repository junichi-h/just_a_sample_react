/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #333;
  position: absolute;
  top: 0;
  left: 0;
`;

const spin = keyframes`
  to {
    border-top-color: #ec407a;
    transform: rotate(360deg);
  }
`;

const Inner = styled.div`
  border: 3px solid #ddd;
  border-top: 3px solid #42a5f5;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -35px 0 0 -35px;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => (
  <Container>
    <Inner />
  </Container>
);
export default Loader;
