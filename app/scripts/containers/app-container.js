import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import styled from 'styled-components';
import { Transition, TransitionGroup } from 'react-transition-group';

import Loader from '../components/loader';
import Section from '../components/section';
import ButtonContainer from './button-container';
import { loadJSON } from '../actions/async';
import { showButton } from '../actions/button';
import { hideLoader } from '../actions/section';
import { onEnter, onExit } from '../actions/animation';
import { LOADER, SECTION } from '../constants/page-type';

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
          timeout={1200}
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
              'color:#e5004f;background:#3f3f3f;padding:.25em;font-size:20px;font-weight:bold;'
            );
            console.log(element);
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
  data: state.json.data,
  pageType: state.section.pageType,
  currentIndex: state.button.currentIndex,
  isShowButton: state.button.isShowButton
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadJSON,
      showButton,
      onEnter,
      onExit,
      hideLoader
    },
    dispatch
  );
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
          if (nextProps.pageType === LOADER) {
            nextProps.hideLoader();
          }
          if (nextProps.pageType === SECTION && !nextProps.isShowButton) {
            nextProps.showButton();
          }
          /* window.setTimeout(() => {
            this.props.showButton();
          }, 1000); */
        }
      }
    },
    shouldComponentUpdate(nextProps) {
      return this.props !== nextProps;
    }
  })(AppContainer)
);
