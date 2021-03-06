import { Sine, TweenLite } from 'gsap';

export const UPDATE_ANIMATION_STATE = '@@/animation/UPDATE_ANIMATION_STATE';

export const onEnter = (element, pageType) => {
  return dispatch => {
    console.log(
      `%conEnter :: pageType is ${pageType}`,
      'color: #ff8e71;background:#3f3f3f;padding:.25em;font-size:20px;font-weight:bold;'
    );
    TweenLite.fromTo(
      element,
      1,
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
  };
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
    TweenLite.to(element, 1, {
      alpha: 0,
      display: 'none',
      ease: Sine.easeIn
    });
  };
};
