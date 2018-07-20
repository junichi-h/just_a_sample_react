import React, { Component, Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LOADER, SECTION } from '../constants/page-type';

class PageContainer extends Component {
  static Loader = ({ pageType, children }) =>
    pageType === LOADER ? children : null;

  static Section = ({ pageType, children }) =>
    pageType === SECTION ? children : null;

  render() {
    const { children, pageType } = this.props;
    return Children.map(children, child =>
      React.cloneElement(child, {
        pageType
      })
    );
  }
}

const mapStateToProps = state => ({
  pageType: state.sample.pageType
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);
