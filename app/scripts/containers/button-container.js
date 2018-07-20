import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../components/button';
import { onNext, onPrev } from '../reducers/button';

const ButtonContainer = props => (
  <div>
    <Button label="prev" onClick={props.onPrev} />
    <Button label="next" onClick={props.onNext} />
  </div>
);

const mapStateToProps = state => ({
  isShowButton: state.button.isShowButton
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ onNext, onPrev }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonContainer);
