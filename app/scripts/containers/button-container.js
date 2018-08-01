import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../components/button';
import { onNext, onPrev } from '../actions/button';

const ButtonContainer = props => {
  const { currentIndex, jsonData } = props;
  const isPrev = !!(currentIndex === 0);
  const isNext = !!(currentIndex === jsonData.length - 1);
  return (
    <div>
      <Button label="prev" onClick={props.onPrev} isEnabled={isPrev} />
      <Button label="next" onClick={props.onNext} isEnabled={isNext} />
    </div>
  );
};

const mapStateToProps = state => ({
  isShowButton: state.button.isShowButton,
  currentIndex: state.button.currentIndex,
  jsonData: state.json.data
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ onNext, onPrev }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonContainer);
