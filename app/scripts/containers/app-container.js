import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import styled from 'styled-components';
import { Transition, TransitionGroup } from 'react-transition-group';

import Loader from '../components/loader';
import Section from '../components/section';
import ButtonContainer from './button-container';
// import PageContainer from './page-container';
import { loadJSON } from '../reducers/sample';
import { showButton } from '../reducers/button';
import { onEnter, onExit } from '../reducers/animate';

const Container = styled(TransitionGroup)`
  position: relative;
  box-sizing: border-box;
`;

const AppContainer = props => {
  const { pageType, data, currentIndex, isShowButton } = props;
  const section = data ? (
    <Section data={data} currentIndex={currentIndex} />
  ) : null;
  const contents = data ? section : <Loader />;
  const button = isShowButton ? <ButtonContainer /> : null;
  return (
    <Fragment>
      <Container>
        <Transition
          key={pageType}
          timeout={{
            enter: 1000,
            exit: 1000
          }}
          mountOnEnter
          unmountOnExit
          onEnter={element => {
            console.log(
              '%cEnter ------->',
              'color:#00aeef;background:#3f3f3f;padding:.25em;font-size:20px;font-weight:bold;'
            );
            console.log(element);
            props.onEnter(element, pageType);
          }}
          onExit={element => {
            console.log(
              '%cExit ------->',
              'color:#00aeef;background:#3f3f3f;padding:.25em;font-size:20px;font-weight:bold;'
            );
            if (element) {
              props.onExit(element, pageType);
            }
          }}
        >
          <div>{contents}</div>
        </Transition>
      </Container>
      {button}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  data: state.sample.data,
  pageType: state.sample.pageType,
  currentIndex: state.button.currentIndex,
  isShowButton: state.button.isShowButton
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadJSON, showButton, onEnter, onExit }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  lifecycle({
    componentDidMount() {
      this.props.loadJSON('assets/data/section.json');
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps !== this.props) {
        if (nextProps.data) {
          window.setTimeout(() => {
            this.props.showButton();
          }, 1000);
        }
      }
    }
  })(AppContainer)
);
