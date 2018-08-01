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

const mapStateToProps = state => ({
  router: state.router
});
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
      console.log('check -------->');
      console.log(this.props.router);
    },
    shouldComponentUpdate(nextProps) {
      return this.props !== nextProps;
    }
  })(LoadingPage)
);
