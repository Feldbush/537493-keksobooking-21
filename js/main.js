'use strict';

const QUANTITY_PINS = 8;
const TITLE_OFFER = `Супер классный, новый, модный отель`;
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const MAX_QUANTITY_ROOMS = 5;
const MAX_QUANTITY_GUEST = 7;
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP_NODE = document.querySelector(`.map`);
const PIN_LOCATION = {
  yMin: 130,
  yMax: 630,
  xMin: 50,
  xMax: MAP_NODE.offsetWidth - 100
};


function getRandomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}


function createAuthors() {
  let authorNumbers = new Set();
  let authors = [];

  while (authorNumbers.size < QUANTITY_PINS) {
    let randomInteger = String(getRandomInteger(1, QUANTITY_PINS));
    authorNumbers.add(randomInteger);
  }

  authorNumbers.forEach((authorNumber) => {
    let author = {};
    author.avatar = `img/avatars/user0${authorNumber}.png`;
    authors.push(author);
  });

  return authors;
}


function createOffers() {
  let offers = [];

  for (let i = 0; i < QUANTITY_PINS; i++) {
    let offer = {};

    offer.title = TITLE_OFFER;
    offer.price = getRandomInteger(1000, 4500);
    offer.type = OFFER_TYPE[getRandomInteger(0, OFFER_TYPE.length - 1)];
    offer.rooms = getRandomInteger(1, MAX_QUANTITY_ROOMS);
    offer.guests = getRandomInteger(1, MAX_QUANTITY_GUEST);
    offer.checkin = getRandomInteger(1, CHECKIN_TIMES.length - 1);
    offer.checkout = getRandomInteger(1, CHECKOUT_TIMES.length - 1);
    offer.description = `Лучший отель на этой планете Лучший отель на этой планете Лучший отель на этой планете`;

    let nonrepeatingFeatures = new Set();
    for (let featuresIndex = 0; featuresIndex < FEATURES.length; featuresIndex++) {
      nonrepeatingFeatures.add(FEATURES[getRandomInteger(0, FEATURES.length - 1)]);
    }
    offer.features = Array.from(nonrepeatingFeatures);

    let nonrepeatingPhotos = new Set();
    for (let photosLinksIndex = 0; photosLinksIndex < PHOTOS_LINKS.length; photosLinksIndex++) {
      nonrepeatingPhotos.add(PHOTOS_LINKS[getRandomInteger(0, PHOTOS_LINKS.length - 1)]);
    }
    offer.photos = Array.from(nonrepeatingPhotos);

    offers.push(offer);
  }

  return offers;
}


function craeateLocations() {
  let locations = [];

  for (let i = 0; i < QUANTITY_PINS; i++) {
    let location = {
      x: getRandomInteger(PIN_LOCATION.xMin, PIN_LOCATION.xMax),
      y: getRandomInteger(PIN_LOCATION.yMin, PIN_LOCATION.yMax)
    };

    locations.push(location);
  }

  return locations;
}


function createMockPinData() {
  const authors = createAuthors();
  const offers = createOffers();
  const locations = craeateLocations();
  let pins = [];

  for (let i = 0; i < QUANTITY_PINS; i++) {
    let pin = {};
    pin.author = authors[i];
    pin.offer = offers[i];
    pin.location = locations[i];
    pins.push(pin);
  }

  return pins;
}


function createPinNode(pinData) {
  const pinTemplate = document.querySelector(`#pin`).content.children[0];

  const pin = pinTemplate.cloneNode(true);
  const pinImg = pin.querySelector(`img`);

  pinImg.src = pinData.author.avatar;
  pinImg.alt = pinData.offer.title;
  pin.style.left = pinData.location.x + `px`;
  pin.style.top = pinData.location.y + `px`;

  return pin;
}


function fixPositiPin(pin) {
  pin.style.left = Number(pin.style.left.replace(/[^\d;]/g, ``)) - pin.offsetWidth / 2 + `px`;
  pin.style.top = Number(pin.style.top.replace(/[^\d;]/g, ``)) - pin.offsetHeight + `px`;
}


function appendPins(pinsData, placeInsertion) {
  const fragment = document.createDocumentFragment();
  const temporaryСontainer = fragment;

  for (let index = 0; index < pinsData.length; index++) {
    temporaryСontainer.append(createPinNode(pinsData[index]));
  }

  placeInsertion.append(temporaryСontainer.cloneNode(true));
  const pinCssClass = placeInsertion.lastChild.className;

  // Беру количество вставленных элементов с конца контейнера и фиксирую положение их положение таким образом,
  // чтобы метка указывала на точку указанную в pinData.location.x, pinData.location.y
  for (let i = temporaryСontainer.children.length; i >= 1; i--) {
    let currentElement = placeInsertion.querySelector(`.${pinCssClass}:nth-last-child(${i})`);
    fixPositiPin(currentElement);
  }

}


// показываю карту
MAP_NODE.classList.remove(`map--faded`);


// Генерирую пины и вставляю на страницу
const mockPinsData = createMockPinData();
const mapPinsContainer = document.querySelector(`.map__pins`);
appendPins(mockPinsData, mapPinsContainer);

