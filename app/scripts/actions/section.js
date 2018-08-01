import { SECTION } from '../constants/page-type';

export const HIDE_LOADER = '@@section/HIDE_LOADER';

export const hideLoader = () => {
  return dispatch => {
    dispatch({
      type: HIDE_LOADER,
      payload: {
        isShow: true,
        pageType: SECTION
      }
    });
  };
};
