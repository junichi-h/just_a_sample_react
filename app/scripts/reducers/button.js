import produce from 'immer';

export const SHOW_BUTTON = '@@button/SHOW_BUTTON';
export const CLICK_NEXT = '@@button/CLICK_NEXT';
export const CLICK_PREV = '@@button/CLICK_PREV';

const initialState = {
  currentIndex: 0,
  isShowButton: false
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_BUTTON:
        draft.isShowButton = action.payload.isShowButton;
        break;
      case CLICK_NEXT:
      case CLICK_PREV:
        draft.currentIndex = action.payload.currentIndex;
        break;
    }
  });

export const showButton = () => {
  return dispatch => {
    dispatch({
      type: SHOW_BUTTON,
      payload: {
        isShowButton: true
      }
    });
  };
};

/**
 * 次へが押された
 * @returns {Function}
 */
export const onNext = () => {
  return (dispatch, getState) => {
    const jsonData = getState().sample.data;
    const prevIndex = getState().button.currentIndex;
    dispatch({
      type: CLICK_NEXT,
      payload: {
        currentIndex: Math.min(prevIndex + 1, jsonData.length - 1)
      }
    });
  };
};

/**
 * 戻るが押された
 * @returns {Function}
 */
export const onPrev = () => {
  return (dispatch, getState) => {
    const jsonData = getState().sample.data;
    const prevIndex = getState().button.currentIndex;
    dispatch({
      type: CLICK_PREV,
      payload: {
        currentIndex: Math.min(prevIndex - 1, jsonData.length - 1)
      }
    });
  };
};
