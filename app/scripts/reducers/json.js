import produce from 'immer';

import BulkLoader from '../loader/bulk-loader';

export const LOAD_SUCCESS = '@@json/LOAD_SUCCESS';
export const LOAD_FAIL = '@@json/LOAD_FAIL';

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

export const loadJSON = url => {
  return dispatch => {
    BulkLoader.loadJSON(url)
      .then(response => {
        return window.setTimeout(() => {
          dispatch({
            type: LOAD_SUCCESS,
            payload: {
              data: response
            }
          });
        }, 2000);
      })
      .catch(() => {
        dispatch({
          type: LOAD_FAIL,
          payload: {
            data: null
          }
        });
      });
  };
};
