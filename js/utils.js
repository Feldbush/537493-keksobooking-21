'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.utils = {
    TIMEOUT_IN_MS: 10000,
    ESC_KEY_CODE: 27,
    ENTER_KEY_CODE: 13,
    LEFT_BUTTON_MOUSE_KEY_CODE: 0,
    debounce(cb) {
      let lastTimeout = null;
      return function () {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb();
        }, DEBOUNCE_INTERVAL);
      };
    },
  };
})();
