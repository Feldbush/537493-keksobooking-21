'use strict';

(function () {
  window.filter = {
    setData(data) {
      if (data) {
        this.pinsData = data;
      } else {
        this.pinsData = [];
      }
    },
    getData() {
      if (this.data) {
        return this.data;
      }
      return [];
    }
  };
})();
