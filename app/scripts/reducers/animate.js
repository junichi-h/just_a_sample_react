import produce from 'immer';
import { Expo, Sine, TweenLite } from 'gsap';

import { LOADER, SECTION } from '../constants/page-type';

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

const enter = (element, pageType, dispatch) => {
  let inner = null;
  switch (pageType) {
    case LOADER:
      TweenLite.fromTo(
        element,
        0.6,
        {
          alpha: 0
        },
        {
          alpha: 1,
          delay: 0.3,
          ease: Sine.easeOut,
          onComplete: () => {
            dispatch({
              type: UPDATE_ANIMATION_STATE,
              payload: {
                isAnimation: false
              }
            });
            window.setTimeout(() => {
              TweenLite.set(element, {
                clearProps: 'alpha'
              });
            }, 20);
          }
        }
      );
      break;
    case SECTION:
      inner = element.querySelector('.inner');
      TweenLite.set(inner, { alpha: 0 });
      TweenLite.fromTo(
        element,
        0.6,
        {
          alpha: 0
        },
        {
          alpha: 1,
          delay: 0.3,
          ease: Sine.easeOut,
          onComplete: () => {
            window.setTimeout(() => {
              TweenLite.set(element, {
                clearProps: 'alpha'
              });
            }, 20);
          }
        }
      );
      window.setTimeout(() => {
        TweenLite.to(inner, 1, {
          alpha: 1,
          ease: Sine.easeOut
        });
        TweenLite.to(inner, 2, {
          rotation: 720,
          delay: 0.4,
          ease: Expo.easeOut,
          onComplete: () => {
            dispatch({
              type: UPDATE_ANIMATION_STATE,
              payload: {
                isAnimation: false
              }
            });
            window.setTimeout(() => {
              TweenLite.set(inner, {
                clearProps: 'alpha, transform'
              });
            }, 20);
          }
        });
      }, 1000);

      break;
  }
};

export const onEnter = (element, pageType) => {
  return dispatch => {
    console.log(
      `%conEnter :: pageType is ${pageType}`,
      'color: #ff8e71;background:#3f3f3f;padding:.25em;font-size:20px;font-weight:bold;'
    );
    enter(element, pageType, dispatch);
  };
};

const exit = (element, pageType) => {
  switch (pageType) {
    case LOADER:
      TweenLite.to(element, 1, {
        alpha: 0,
        display: 'none',
        ease: Sine.easeIn
      });
      break;
  }
};

export const onExit = (element, pageType) => {
  return dispatch => {
    console.log(
      `%conExit :: pageType is ${pageType}`,
      'color: #ff8e71;background:#3f3f3f;padding:.25em;font-size:20px;font-weight:bold;'
    );
    dispatch({
      type: UPDATE_ANIMATION_STATE,
      payload: {
        isAnimation: true
      }
    });
    exit(element, pageType);
  };
};
