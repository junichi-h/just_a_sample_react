import BulkLoader from '../loader/bulk-loader';

export const LOAD_SUCCESS = '@@json/LOAD_SUCCESS';
export const LOAD_FAIL = '@@json/LOAD_FAIL';

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
