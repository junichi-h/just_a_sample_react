import produce from 'immer';

import { CLICK_NEXT, CLICK_PREV, SHOW_BUTTON } from '../actions/button';

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
