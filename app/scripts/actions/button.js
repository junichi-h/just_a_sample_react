import { max, min } from '../utils/math';

export const SHOW_BUTTON = '@@button/SHOW_BUTTON';
export const CLICK_NEXT = '@@button/CLICK_NEXT';
export const CLICK_PREV = '@@button/CLICK_PREV';

/**
 * ボタンを表示させる
 * @returns {Function}
 */
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
    const jsonData = getState().json.data;
    const prevIndex = getState().button.currentIndex;
    dispatch({
      type: CLICK_NEXT,
      payload: {
        currentIndex: min(prevIndex + 1, jsonData.length - 1)
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
    const jsonData = getState().json.data;
    const prevIndex = getState().button.currentIndex;
    dispatch({
      type: CLICK_PREV,
      payload: {
        currentIndex: max(min(prevIndex - 1, jsonData.length - 1), 0)
      }
    });
  };
};
