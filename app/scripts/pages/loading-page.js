import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import Loader from '../components/loader';
import { loadJSON } from '../actions/async';

const LoadingPage = () => (
  <Fragment>
    <Loader />
  </Fragment>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadJSON
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
    shouldComponentUpdate(nextProps) {
      return this.props !== nextProps;
    }
  })(LoadingPage)
);
