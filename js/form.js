'use strict';

(function () {
  const formAd = document.querySelector(`.ad-form`);
  const fields = formAd.querySelectorAll(`fieldset`);
  const resetBtn = formAd.querySelector(`.ad-form__reset`);
  const OfferTypeToMinPrice = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0
  };
  const actionForm = `https://21.javascript.pages.academy/keksobooking`;

  function paintOrClearBorderField(field, toggle) {
    if (!toggle) {
      field.style.border = `2px solid tomato`;
    } else if (toggle) {
      field.style.borderColor = ``;
    }
  }

  function resetFormHandler() {
    window.map.setStatePage(false);
  }

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

    paintOrClearBorderField(evt.currentTarget, evt.currentTarget.reportValidity());
  }

  function offerTitleValidator() {
    if (titleInput.value.length < 30 || titleInput.value.length > 100) {
      titleInput.setCustomValidity(`Введите не менее 30 и не более 100 символов`);
    } else {
      titleInput.setCustomValidity(``);
    }

    paintOrClearBorderField(titleInput, titleInput.reportValidity());
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

  function offerTypeRatioValidator() {
    const minPrice = OfferTypeToMinPrice[offerTypeInput.value];
    offerPriceInput.placeholder = String(minPrice);

    if (parseInt(offerPriceInput.value, 10) < minPrice) {
      offerPriceInput.setCustomValidity(`Минимальная цена за ночь для выбранного типа жилья состовляет ${minPrice}`);
    } else if (parseInt(offerPriceInput.value, 10) > 1000000) {
      offerPriceInput.setCustomValidity(`Максимальное значение — 1000000.`);
    } else {
      offerPriceInput.setCustomValidity(``);
    }
    paintOrClearBorderField(offerPriceInput, offerPriceInput.reportValidity());
  }

  function sendUserData(data, onSucces, onError, url = actionForm) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onSucces(`Данные успешно отправлены`);
      } else {
        onError(`Непредвиденная ошибка`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = window.utils.TIMEOUT_IN_MS;

    xhr.open(`POST`, url);

    xhr.send(data);
  }

  function onSuccesSendUserData(message) {
    const messageTemplate = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
    if (message) {
      messageTemplate.querySelector(`.success__message`).textContent = message;
    }
    document.querySelector(`main`).append(messageTemplate);
    document.addEventListener(`click`, documentClickHandler);
    document.addEventListener(`keydown`, documentClickHandler);

    function documentClickHandler(evt) {
      if (evt.button === window.utils.LEFT_BUTTON_MOUSE_KEY_CODE || evt.keyCode === window.utils.ESC_KEY_CODE) {
        messageTemplate.remove();
        document.removeEventListener(`click`, documentClickHandler);
        document.removeEventListener(`keydown`, documentClickHandler);
        window.map.setStatePage(false);
      }
    }

    document.addEventListener(`click`, documentClickHandler);
    document.addEventListener(`keydown`, documentClickHandler);
  }

  function onErrorSendUserData(message) {
    const messageTemplate = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
    if (message) {
      messageTemplate.querySelector(`.error__message`).textContent = message;
    }
    document.querySelector(`main`).append(messageTemplate);
    document.addEventListener(`click`, documentClickHandler);
    document.addEventListener(`keydown`, documentClickHandler);

    function documentClickHandler(evt) {
      if (evt.button === window.utils.LEFT_BUTTON_MOUSE_KEY_CODE || evt.keyCode === window.utils.ESC_KEY_CODE) {
        messageTemplate.remove();
        document.removeEventListener(`click`, documentClickHandler);
        document.removeEventListener(`keydown`, documentClickHandler);
      }
    }

    document.addEventListener(`click`, documentClickHandler);
    document.addEventListener(`keydown`, documentClickHandler);
  }

  function handlerSend(evt) {
    evt.preventDefault();
    const data = new FormData(formAd);
    sendUserData(data, onSuccesSendUserData, onErrorSendUserData);
  }

  // function validatorForm() {
  //   console.log(`ye`);
  //   // Я столкнулся с тем, что обработчик не срабатывает если хотя бы одно поле на форме не валидно соответственно код ниже не отрабатывает
  //   const fieldsets = formAd.querySelectorAll(`fieldset`);
  //   fieldsets.forEach((field) => {
  //     const input = field.querySelector(`input, select`);
  //     console.log(`work`);
  //     if (input) {
  //       paintOrClearBorderField(input, input.reportValidity());
  //     }
  //   });
  // }


  titleInput.addEventListener(`input`, offerTitleValidator);

  roomsField.addEventListener(`input`, roomsCapacityRatioValidHandler);
  capacityField.addEventListener(`input`, roomsCapacityRatioValidHandler);

  addressInput.addEventListener(`keydown`, addressInputHandler);

  timeOutInput.addEventListener(`change`, timeinTimeOutHandler);
  timeInInput.addEventListener(`change`, timeinTimeOutHandler);

  offerTypeInput.addEventListener(`input`, offerTypeRatioValidator);
  offerPriceInput.addEventListener(`input`, offerTypeRatioValidator);
  resetBtn.addEventListener(`click`, resetFormHandler);
  formAd.addEventListener(`submit`, handlerSend);
  // formAd.addEventListener(`invalid`, validatorForm, true);

  window.form = {
    HEIGHT_NEEDLE_MAIN_PIN: 15,

    fillAdress() {
      const fieldAdress = document.querySelector(`#address`);
      const mainPin = document.querySelector(`.map__pin--main`);

      const x = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
      const y = window.statePage
        ? Math.abs(Math.round(mainPin.offsetTop + mainPin.offsetHeight + window.form.HEIGHT_NEEDLE_MAIN_PIN))
        : Math.abs(Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2));
      fieldAdress.value = `${x}, ${y}`;
    },

    setStateForm(state = false) {
      if (state) {
        formAd.classList.remove(`ad-form--disabled`);
      } else {
        formAd.reset();
        formAd.classList.add(`ad-form--disabled`);
      }
      enableDisabledFields(fields, state);
    }
  };

})();
