'use strict';

(function () {
  const maxQuantity = 5;
  const filterForm = document.querySelector(`.map__filters`);
  const MapPrice = {
    MIDDLE_MIN: 10000,
    MIDDLE_MAX: 50000,
    LOW: 10000,
    HIGH: 50000,
  };
  const PriceValue = {
    ANY: `any`,
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`,
  };

  function getCurrentFeatures() {
    const housingFeatures = filterForm.querySelector(`#housing-features`);
    const features = [];
    housingFeatures.querySelectorAll(`input:checked`).forEach((input) => {
      features.push(input.value);
    });
    return features;
  }

  function filter(dataItem, type, price, rooms, guests, featuresArray) {
    const offer = dataItem.offer;

    if (type !== `any`) {
      if (type !== offer.type) {
        return false;
      }
    }

    if (price !== `any`) {
      switch (true) {
        case price === PriceValue.MIDDLE && offer.price > MapPrice.MIDDLE_MIN && offer.price < MapPrice.MIDDLE_MAX:
          break;
        case price === PriceValue.HIGH && offer.price >= MapPrice.HIGH:
          break;
        case price === PriceValue.LOW && offer.price <= MapPrice.LOW:
          break;
        default:
          return false;
      }
    }

    if (rooms !== `any`) {
      if (parseInt(rooms, 10) !== offer.rooms) {
        return false;
      }
    }

    if (guests !== `any`) {
      if (parseInt(guests, 10) !== offer.guests) {
        return false;
      }
    }

    if (featuresArray.length !== 0) {
      for (let index = 0; index < featuresArray.length; index++) {
        if (!offer.features.includes(featuresArray[index])) {
          return false;
        }
      }
    }

    return dataItem;
  }

  function filterAllData() {
    const housingType = filterForm.querySelector(`#housing-type`).value;
    const housingPrice = filterForm.querySelector(`#housing-price`).value;
    const housingRooms = filterForm.querySelector(`#housing-rooms`).value;
    const housingGuests = filterForm.querySelector(`#housing-guests`).value;

    const data = window.filter.getData(true);
    let filtredData = data.filter((item) => {
      return filter(item, housingType, housingPrice, housingRooms, housingGuests, getCurrentFeatures());
    }).splice(0, maxQuantity);
    return filtredData;
  }

  function onChangefilterForm() {
    const filtredData = filterAllData();
    window.utils.debounce(() => {
      window.map.updatePins(filtredData);
    })();
    window.map.closeCardsOffer();
  }

  filterForm.addEventListener(`change`, onChangefilterForm);


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
    setStatefilterForm(state = false) {
      const fields = filterForm.querySelectorAll(`.map__filter, .map__features`);
      fields.forEach((item) => {
        item.disabled = !state;
      });
    }
  };
})();
