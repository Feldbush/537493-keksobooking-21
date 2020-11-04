'use strict';

(function () {

  const formAd = document.querySelector(`.ad-form`);
  const fields = formAd.querySelectorAll(`fieldset`);
  const HEIGHT_NEEDLE_MAIN_PIN = 16;
  const OfferTypeToMinPrice = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0
  };

  // function paintOrClearBorderField(field, toggle) {
  //   if (!toggle) {
  //     field.style.borderColor = `tomato`;
  //   } else if (toggle) {
  //     field.style.borderColor = ``;
  //   }
  // }

  function enableDisabledFields(FieldsCollection, state = false) {
    FieldsCollection.forEach((field) => {
      field.disabled = !state;
    });
  }

  const titleInput = document.querySelector(`#title`);
  const roomsField = document.querySelector(`#room_number`);
  const capacityField = document.querySelector(`#capacity`);
  const addressInput = document.querySelector(`#address`);
  const timeInInput = document.querySelector(`#timein`);
  const timeOutInput = document.querySelector(`#timeout`);
  const offerTypeInput = document.querySelector(`#type`);
  const offerPriceInput = document.querySelector(`#price`);


  function roomsCapacityRatioValidHandler(evt) {
    const roomsValue = parseInt(roomsField.value, 10);
    const capacityValue = parseInt(capacityField.value, 10);

    if (roomsField.options[roomsField.selectedIndex].dataset.live === `false` || capacityValue === 0) {
      if (roomsField.options[roomsField.selectedIndex].dataset.live === `false` && capacityValue === 0) {
        capacityField.setCustomValidity(``);
        roomsField.setCustomValidity(``);
        return;
      }
      evt.currentTarget.setCustomValidity(`"Не для гостей" только не жилые помещения - "100 комнат"`);
    } else if (roomsValue < capacityValue) {
      evt.currentTarget.setCustomValidity(`Комнат не может быть меньше чем мест`);
    } else {
      capacityField.setCustomValidity(``);
      roomsField.setCustomValidity(``);
    }

    evt.currentTarget.reportValidity();
  }

  function offerTitleValidator() {
    if (titleInput.value.length < 30 || titleInput.value.length > 100) {
      titleInput.setCustomValidity(`Введите не менее 30 и не более 100 символов`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  }

  function offerPriceMaxValueValidator() {
    if (parseInt(offerPriceInput.value, 10) > 1000000) {
      offerPriceInput.setCustomValidity(`Максимальное значение — 1000000.`);
    } else {
      offerPriceInput.setCustomValidity(``);
    }
  }

  function timeinTimeOutHandler(evt) {
    if (timeInInput.value !== timeOutInput.value) {
      timeInInput.value = evt.currentTarget.value;
      timeOutInput.value = evt.currentTarget.value;
    }
  }

  function addressInputHandler(evt) {
    evt.preventDefault();
  }

  function offerTypeRatioPriceValidHandler() {
    const minPrice = OfferTypeToMinPrice[offerTypeInput.value];
    offerPriceInput.placeholder = String(minPrice);

    if (parseInt(offerPriceInput.value, 10) < minPrice) {
      offerPriceInput.setCustomValidity(`Минимальная цена за ночь для выбранного типа жилья состовляет ${minPrice}`);
    } else {
      offerPriceInput.setCustomValidity(``);
    }
    offerPriceInput.reportValidity();
  }

  titleInput.addEventListener(`input`, offerTitleValidator);

  roomsField.addEventListener(`input`, roomsCapacityRatioValidHandler);
  capacityField.addEventListener(`input`, roomsCapacityRatioValidHandler);

  addressInput.addEventListener(`keydown`, addressInputHandler);

  timeOutInput.addEventListener(`change`, timeinTimeOutHandler);
  timeInInput.addEventListener(`change`, timeinTimeOutHandler);

  offerTypeInput.addEventListener(`input`, offerTypeRatioPriceValidHandler);
  offerPriceInput.addEventListener(`input`, offerPriceMaxValueValidator);
  offerPriceInput.addEventListener(`input`, offerTypeRatioPriceValidHandler);

  window.form = {
    fillAdress() {
      const fieldAdress = document.querySelector(`#address`);
      const mainPin = document.querySelector(`.map__pin--main`);

      const x = Math.abs(Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2));
      const y = window.statePage
        ? Math.abs(Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2))
        : Math.abs(Math.round(mainPin.offsetTop + mainPin.offsetHeight + HEIGHT_NEEDLE_MAIN_PIN));
      fieldAdress.value = `${x}, ${y}`;
    },

    setStateForm(state = false) {
      if (state) {
        formAd.classList.remove(`ad-form--disabled`);
      } else {
        formAd.classList.add(`ad-form--disabled`);
      }

      enableDisabledFields(fields, state);
    }
  };

})();
