import produce from 'immer';

export const SAMPLE01 = '@@sample/sample01';

const initialState = { isSample: false };

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAMPLE01:
        draft.isSample = action.payload.isSample;
        break;
    }
  });

export const sample = () => {
  return dispatch => {
    dispatch({
      type: SAMPLE01,
      payload: {
        isSample: true
      }
    });
  };
};
