import produce from 'immer';
import { LOADER } from '../constants/page-type';
import { HIDE_LOADER } from '../actions/section';

const initialState = {
  isShow: false,
  pageType: LOADER
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HIDE_LOADER:
        draft.isShow = action.payload.isShow;
        draft.pageType = action.payload.pageType;
        break;
    }
  });
