'use strict';

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

const titleInput = document.querySelector(`#title`);
const roomsField = document.querySelector(`#room_number`);
const capacityField = document.querySelector(`#capacity`);
const addressInput = document.querySelector(`#address`);
const timeInInput = document.querySelector(`#timein`);
const timeOutInput = document.querySelector(`#timeout`);
const offerTypeInput = document.querySelector(`#type`);
const offerPriceInput = document.querySelector(`#price`);


function roomsCapacityRatioValidHandler(evt) {
  // roomsField = document.querySelector(`#room_number`);
  // capacityField = document.querySelector(`#capacity`);

  const roomsValue = parseInt(roomsField.value, 10);
  const capacityValue = parseInt(capacityField.value, 10);


  if (roomsField.options[roomsField.selectedIndex].dataset.live === `false` || capacityValue === 0) {
    if (roomsField.options[roomsField.selectedIndex].dataset.live === `false` && capacityValue === 0) {
      capacityField.setCustomValidity(``);
      roomsField.setCustomValidity(``);
      return;
    }
    evt.currentTarget.setCustomValidity(`"Не для гостей" только не жилые помещения - "100 комнат"`);
    // return;
  } else if (roomsValue < capacityValue) {
    evt.currentTarget.setCustomValidity(`Комнат не может быть меньше чем мест`);
    // return;
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
  }
  offerPriceInput.setCustomValidity(``);
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

function offerTypeRatioPriceValidHandler(evt) {
  const minPrice = OfferTypeToMinPrice[offerTypeInput.value];
  offerPriceInput.placeholder = String(minPrice);

  if (parseInt(offerPriceInput.value, 10) < minPrice) {
    offerPriceInput.setCustomValidity(`Минимальная цена за ночь для выбранного типа жилья состовляет ${minPrice}`);
  } else {
    offerPriceInput.setCustomValidity(``);
  }

  evt.currentTarget.reportValidity();
}


// roomsField.removeEventListener(`change`, roomsCapacityRatioValidHandler);
// capacityField.removeEventListener(`change`, roomsCapacityRatioValidHandler);

titleInput.addEventListener(`input`, offerTitleValidator);

roomsField.addEventListener(`input`, roomsCapacityRatioValidHandler);
capacityField.addEventListener(`input`, roomsCapacityRatioValidHandler);

addressInput.addEventListener(`keydown`, addressInputHandler);

timeOutInput.addEventListener(`change`, timeinTimeOutHandler);
timeInInput.addEventListener(`change`, timeinTimeOutHandler);


offerTypeInput.addEventListener(`input`, offerTypeRatioPriceValidHandler);
offerPriceInput.addEventListener(`input`, offerTypeRatioPriceValidHandler);
offerPriceInput.addEventListener(`input`, offerPriceMaxValueValidator);
