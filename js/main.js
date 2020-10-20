'use strict';

// const QUANTITY_PINS = 8;
// const TITLE_OFFER = [`Супер классный, новый, модный отель`, `Вот это отель`, `Гостиница так гостиница`];
// const DESCRIPTION = [`Лучший отель на этой планете Лучший отель на этой планете Лучший отель на этой планете`, `Бомба БомбаБомбаБомбаБомбаБомбаБомба`, `Шикарно Шикарно Шикарно Шикарно`];
// const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
// const OfferTypeRu = {
//   palace: `Дворец`,
//   flat: `Квартира`,
//   house: `Дом`,
//   bungalow: `Бунгало`
// };
// const MAX_QUANTITY_ROOMS = 5;
// const MAX_QUANTITY_GUEST = 7;
// const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
// const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
// const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
// const PHOTOS_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
// const mapNode = document.querySelector(`.map`);
// const mapFiltersContainer = document.querySelector(`.map__filters-container`);
// const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
// const PIN_LOCATION = {
//   yMin: 130,
//   yMax: 630,
//   xMin: 50,
//   xMax: mapNode.offsetWidth - 100
// };
const HEIGHT_NEEDLE_MAIN_PIN = 16;

// function getRandomInteger(min, max) {
//   return Math.round(min - 0.5 + Math.random() * (max - min + 1));
// }


// function getRandomElementArray(array) {
//   return array[getRandomInteger(0, array.length - 1)];
// }


// function createMockPinData(count) {
//   return new Array(count)
//   .fill(``)
//   .map((element, index) => {
//     const mockPinData = {
//       author: {
//         avatar: `img/avatars/user0${index + 1}.png`
//       },
//       offer: {
//         title: getRandomElementArray(TITLE_OFFER),
//         price: getRandomInteger(1000, 4500),
//         type: getRandomElementArray(OFFER_TYPE),
//         rooms: getRandomInteger(1, MAX_QUANTITY_ROOMS),
//         guests: getRandomInteger(1, MAX_QUANTITY_GUEST),
//         checkin: getRandomElementArray(CHECKIN_TIMES),
//         checkout: getRandomElementArray(CHECKOUT_TIMES),
//         features: FEATURES.slice(0, getRandomInteger(1, FEATURES.length - 1)),
//         description: getRandomElementArray(DESCRIPTION),
//         photos: PHOTOS_LINKS.slice(0, getRandomInteger(1, PHOTOS_LINKS.length - 1))
//       },
//       location: {
//         x: getRandomInteger(PIN_LOCATION.xMin, PIN_LOCATION.xMax),
//         y: getRandomInteger(PIN_LOCATION.yMin, PIN_LOCATION.yMax)
//       }
//     };
//     mockPinData.offer.address = `${mockPinData.location.x},${mockPinData.location.y}`;

//     return mockPinData;
//   });
// }


// function createPinNode(pinData) {
//   const pin = pinTemplate.cloneNode(true);
//   const pinImg = pin.querySelector(`img`);

//   pinImg.src = pinData.author.avatar;
//   pinImg.alt = pinData.offer.title;

//   pin.style.left = pinData.location.x - pinImg.width + `px`;
//   pin.style.top = pinData.location.y - pinImg.height + `px`;

//   return pin;
// }


// function appendPins(pinsData, placeInsertion) {
//   const temporaryСontainer = document.createDocumentFragment();

//   for (let index = 0; index < pinsData.length; index++) {
//     temporaryСontainer.append(createPinNode(pinsData[index]));
//   }

//   placeInsertion.append(temporaryСontainer);
// }


// function renderFeatures(container, dataElements) {
//   container.innerHTML = ``;

//   dataElements.forEach((feature) => {
//     const template = document.createElement(`li`);
//     template.classList.add(`popup__feature`);
//     template.classList.add(`popup__feature--${feature}`);
//     container.append(template);
//   });
// }


// function renderPhotos(container, template, dataElements) {
//   container.innerHTML = ``;

//   dataElements.forEach((photoSrc) => {
//     const photo = template.cloneNode(true);
//     photo.src = photoSrc;
//     container.append(photo);
//   });
// }


// function createCardNode(dataCard) {
//   const {
//     offer = {},
//     author = {}
//   } = dataCard;

//   const {
//     address = `500`,
//     checkin = ``,
//     checkout = ``,
//     description = ``,
//     features = [],
//     guests = ``,
//     photos = [],
//     price = ``,
//     rooms = ``,
//     title = ``,
//     type = ``
//   } = offer;

//   const card = cardTemplate.cloneNode(true);

//   const cardTitle = card.querySelector(`.popup__title`);
//   const cardAddress = card.querySelector(`.popup__text--address`);
//   const cardPrice = card.querySelector(`.popup__text--price`);
//   const cardType = card.querySelector(`.popup__type`);
//   const cardCapacity = card.querySelector(`.popup__text--capacity`);
//   const cardTime = card.querySelector(`.popup__text--time`);
//   const cardFeatures = card.querySelector(`.popup__features`);
//   const cardDescription = card.querySelector(`.popup__description`);
//   const cardPhotos = card.querySelector(`.popup__photos`);
//   const cardAvatar = card.querySelector(`.popup__avatar`);
//   const cardPhotoTemplate = card.querySelector(`.popup__photo`).cloneNode(true);

//   cardTitle.textContent = title;
//   cardAddress.textContent = address;
//   cardPrice.textContent = price;
//   cardType.textContent = OfferTypeRu[type];
//   cardCapacity.textContent = `${rooms} ${getDeclinationlOfNum(Number(rooms), [`комната`, `комнаты`, `комнат`])} для ${guests} ${getDeclinationlOfNum(Number(guests), [`гость`, `гостей`, `гостей`])}`;
//   cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
//   cardDescription.textConten = description;
//   cardAvatar.src = author.avatar;
//   renderFeatures(cardFeatures, features);
//   renderPhotos(cardPhotos, cardPhotoTemplate, photos);

//   return card;
// }

// function getDeclinationlOfNum(number, titles) {
//   const cases = [2, 0, 1, 1, 1, 2];
//   return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
// }


// // Показываю карту
// mapNode.classList.remove(`map--faded`);

// // Генерирую пины и вставляю на страницу
// const mockPinsData = createMockPinData(QUANTITY_PINS);
// const mapPinsContainer = document.querySelector(`.map__pins`);
// appendPins(mockPinsData, mapPinsContainer);

// function insertBeforeNode(parentNode, insertedNode, nodeBeforeInsert) {
//   parentNode.insertBefore(insertedNode, nodeBeforeInsert);
// }

// // Добавляю карточку оффера на страницу
// insertBeforeNode(mapNode, createCardNode(createMockPinData(QUANTITY_PINS)[0]), mapFiltersContainer);


function setStatePage(toggle) {
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const fields = form.querySelectorAll(`fieldset`);

  fillAdress();

  if (toggle) {
    fields.forEach((field) => {
      field.disabled = false;
    });
    form.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);

    window.statePage = true;

    return window.statePage;
  }

  fields.forEach((field) => {
    field.disabled = true;
  });
  form.classList.add(`ad-form--disabled`);
  map.classList.add(`map--faded`);

  window.statePage = false;

  return window.statePage;
}


function mainPinHandler(evt) {
  if (evt.button === 0 || evt.keyCode === 13) {
    evt.preventDefault();
    setStatePage(true);
    fillAdress();
  }
}


function fillAdress() {
  const fieldAdress = document.querySelector(`#address`);
  const mainPin = document.querySelector(`.map__pin--main`);

  if (window.statePage === false) {
    const x = Math.abs(Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2));
    const y = Math.abs(Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2));
    fieldAdress.value = `${x}, ${y}`;
  } else if (window.statePage === true) {
    const x = Math.abs(Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2));
    const y = Math.abs(Math.round(mainPin.offsetTop + mainPin.offsetHeight + HEIGHT_NEEDLE_MAIN_PIN));
    fieldAdress.value = `${x}, ${y}`;
  }
}


function roomsCapacityRatioValidHandler() {
  const roomsField = document.querySelector(`#room_number`);
  const capacityField = document.querySelector(`#capacity`);

  const roomsValue = Number(roomsField.value);
  const capacityValue = Number(capacityField.value);


  if (roomsField.options[roomsField.selectedIndex].dataset.live === `false` || capacityValue === 0) {

    if (roomsField.options[roomsField.selectedIndex].dataset.live === `false` && capacityValue === 0) {
      capacityField.setCustomValidity(``);
      roomsField.setCustomValidity(``);

      return;
    }

    roomsField.setCustomValidity(`"Не для гостей" только не жилые помещения - "100 комнат"`);

    return;
  }


  if (roomsValue < capacityValue) {
    roomsField.setCustomValidity(`Комнат не может быть меньше чем мест`);

    return;
  }


  capacityField.setCustomValidity(``);
  roomsField.setCustomValidity(``);
}


function preparePage() {
  setStatePage(false);
  const mainPin = document.querySelector(`.map__pin--main`);
  mainPin.addEventListener(`mousedown`, mainPinHandler);
  mainPin.addEventListener(`keydown`, mainPinHandler);
  fillAdress();

  const roomsField = document.querySelector(`#room_number`);
  const capacityField = document.querySelector(`#capacity`);

  roomsField.addEventListener(`change`, roomsCapacityRatioValidHandler);
  capacityField.addEventListener(`change`, roomsCapacityRatioValidHandler);
}

preparePage();
