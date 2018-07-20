import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import styled from 'styled-components';
import { Transition, TransitionGroup } from 'react-transition-group';

import Loader from '../components/loader';
import Section from '../components/section';
import ButtonContainer from './button-container';
import PageContainer from './page-container';
import { loadJSON } from '../reducers/sample';
import { showButton } from '../reducers/button';
import { onEnter, onExit } from '../reducers/animate';

const Container = styled(TransitionGroup)`
  position: relative;
  box-sizing: border-box;
`;

const AppContainer = props => {
  const { pageType, data, currentIndex } = props;
  const sections = data
    ? data.map(d => (
        <Section
          key={d.videoUrl}
          background={d.style.background}
          text={d.elements[0].text}
        />
      ))
    : null;
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
            console.log(element);
            if (element) {
              props.onExit(element, pageType);
            }
          }}
        >
          <PageContainer>
            <PageContainer.Loader>
              <Loader />
            </PageContainer.Loader>
            <PageContainer.Section>
              {sections && sections.length ? sections[currentIndex] : null}
            </PageContainer.Section>
          </PageContainer>
        </Transition>
      </Container>
      <ButtonContainer />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  data: state.sample.data,
  pageType: state.sample.pageType,
  currentIndex: state.button.currentIndex
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
