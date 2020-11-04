'use strict';

// Эту функцию я использую не только здесь но и в обработчике события в модуле map на строке 40, стоит ли её куда либо вынести или же оставить тут?
window.setStatePage = function (state = false) {
  window.map.setStateMap(state);
  window.form.setStateForm(state);

  window.statePage = state;
  window.form.fillAdress();
};

window.setStatePage(false);
