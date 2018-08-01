import produce from 'immer';

import { LOAD_FAIL, LOAD_SUCCESS } from '../actions/async';

const initialState = {
  data: null
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SUCCESS:
      case LOAD_FAIL:
        draft.data = action.payload.data;
        break;
    }
  });
