import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { pure } from 'recompose';
import { Transition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import LoadingPage from '../pages/loading-page';
import SectionPage from '../pages/section-page';

const Container = styled(TransitionGroup)`
  position: relative;
  box-sizing: border-box;
`;

const components = [
  <Route path="/" exact component={LoadingPage} key="loader" />
];

const Routes = props => {
  const { location, data } = props;
  console.log(
    '%cLocation',
    'color:#ff00ff;background:#3f3f3f;font-size:20px;padding:.24em;'
  );
  console.log(props);
  console.log(location);
  if (data) {
    data.forEach((d, i) => {
      components.push(
        <Route
          path={`/section/:${i + 1}`}
          exact
          component={SectionPage}
          key={`section0${i + 1}`}
        />
      );
    });
  }

  return (
    <Container>
      <Transition
        key={location.pathname}
        timeout={{
          enter: 1200,
          exit: 1200
        }}
        mountOnEnter
        unmountOnExit
        onEnter={element => {
          console.log(
            '%cEnter ------->',
            'color:#00aeef;background:#3f3f3f;padding:.25em;font-size:20px;font-weight:bold;'
          );
          console.log(element);
        }}
        onExit={element => {
          console.log(
            '%cExit ------->',
            'color:#e5004f;background:#3f3f3f;padding:.25em;font-size:20px;font-weight:bold;'
          );
          console.log(element);
        }}
      >
        <Switch key={location.key} location={location}>
          {components}
        </Switch>
      </Transition>
    </Container>
  );
};

const mapStateToProps = state => ({
  data: state.json.data
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(pure(Routes));
