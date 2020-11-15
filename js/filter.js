'use strict';

(function () {
  const maxQuantity = 5;
  const filterForm = document.querySelector(`.map__filters`);

  const housingType = filterForm.querySelector(`#housing-type`);
  // const housingPrice = filterForm.querySelector(`#housing-price`);
  // const housingRooms = filterForm.querySelector(`#housing-rooms`);
  // const housingGuests = filterForm.querySelector(`#housing-guests`);
  // const housingFeatures = filterForm.querySelector(`#housing-features`);

  function filterData() {
    let resultArray = [];
    const data = window.filter.getData(true);

    data.forEach((item) => {
      if (housingType.value === item.offer.type || housingType.value === `any` && resultArray.length <= maxQuantity) {
        resultArray.push(item);
      }
    });

    return resultArray;
  }

  filterForm.addEventListener(`change`, () => {
    window.map.updatePins(filterData());
    window.map.closeCardsOffer();
  });


  window.filter = {
    setData(data) {
      if (data) {
        this.pinsData = data.map((item, index) => {
          item.serialNumber = index;
          return item;
        });
      } else {
        this.pinsData = [];
      }
    },
    getData(isFull) {
      if (this.pinsData) {
        if (isFull) {
          return this.pinsData;
        } else {
          return this.pinsData.slice(0, maxQuantity);
        }
      }
      return [];
    },
  };
})();
