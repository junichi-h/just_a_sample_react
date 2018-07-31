import produce from 'immer';
import { LOADER, SECTION } from '../constants/page-type';
import BulkLoader from '../loader/bulk-loader';

// export const LOAD_JSON = '@@sample/LOAD_JSON';
export const LOAD_SUCCESS = '@@sample/LOAD_SUCCESS';
export const LOAD_FAIL = '@@sample/LOAD_FAIL';
// export const SECTION = '@@sample/SECTION';

const initialState = {
  pageType: LOADER,
  data: null
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SUCCESS:
        draft.data = action.payload.data;
        draft.pageType = action.payload.pageType;
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
              data: response,
              pageType: SECTION
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