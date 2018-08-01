import produce from 'immer';

export const UPDATE_ANIMATION_STATE = '@@/animation/UPDATE_ANIMATION_STATE';

const initialState = {
  isAnimation: false
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_ANIMATION_STATE:
        draft.isAnimation = action.payload.isAnimation;
        break;
    }
  });
