import React from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';
import { lifecycle } from 'recompose';

const Container = styled.section`
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

const Section = props => {
  const { data } = props;
  const inner = data.map(d => style => (
    <SectionInner style={style} key={d.elements[0].text}>
      {d.elements[0].text}
    </SectionInner>
  ));
  return (
    <Container bgColor={props.data[props.currentIndex].style.background}>
      <Transition
        native
        key={data[props.currentIndex].elements[0].text}
        from={{ opacity: 0, transform: 'scale3d(0.6, 0.6, 1) rotate(0deg)' }}
        enter={{ opacity: 1, transform: 'scale3d(1.0, 1.0, 1) rotate(720deg)' }}
        leave={{ opacity: 0, transform: 'scale3d(0, 0, 1)' }}
        config={{ tension: 10, velocity: 10 }}
      >
        {inner[props.currentIndex]}
      </Transition>
    </Container>
  );
};

export default lifecycle({
  componentDidMount() {
    console.log(
      '%cSection.js ComponentDidMount!',
      'color:#00ff00;background:#3f3f3f;padding:.25em;font-size:20px;'
    );
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.data && nextProps.currentIndex !== this.props.currentIndex;
  }
})(Section);
