import produce from 'immer';

export const HIDE_SECTION = '@@section/HIDE_SECTION';
export const SHOW_SECTION = '@@section/SHOW_SECTION';

const initialState = {
  isShow: false
};

let timer = -1;

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HIDE_SECTION:
      case SHOW_SECTION:
        draft.isShow = action.payload.isShow;
        break;
    }
  });

export const changeSection = (hasTimer = true) => {
  return dispatch => {
    window.clearTimeout(timer);
    dispatch({
      type: HIDE_SECTION,
      payload: {
        isShow: false
      }
    });
    if (hasTimer) {
      timer = window.setTimeout(() => {
        dispatch({
          type: SHOW_SECTION,
          payload: {
            isShow: true
          }
        });
      }, 1000);
    } else {
      dispatch({
        type: SHOW_SECTION,
        payload: {
          isShow: true
        }
      });
    }
  };
};
