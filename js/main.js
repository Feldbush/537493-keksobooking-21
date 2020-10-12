'use strict';

const quantityPins = 8;
const titlesOffer = [`Супер классный, новый, модный отель`, `Вот это отель`, `Гостиница так гостиница`];
const descriptions = [`Лучший отель на этой планете Лучший отель на этой планете Лучший отель на этой планете`, `Бомба БомбаБомбаБомбаБомбаБомбаБомба`, `Шикарно Шикарно Шикарно Шикарно`];
const offerType = [`palace`, `flat`, `house`, `bungalow`];
const maxQuantityRooms = 5;
const maxQuantityGuest = 7;
const checkinTimes = [`12:00`, `13:00`, `14:00`];
const checkoutTimes = [`12:00`, `13:00`, `14:00`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const photosLinks = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const mapNode = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinLocation = {
  yMin: 130,
  yMax: 630,
  xMin: 50,
  xMax: mapNode.offsetWidth - 100
};


function getRandomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}


function getRandomElementArray(array) {
  return array[getRandomInteger(0, array.length - 1)];
}


function createMockPinData(count) {
  return new Array(count)
  .fill(``)
  .map((element, index) => {
    const mockPinData = {
      author: {
        avatar: `img/avatars/user0${index + 1}.png`
      },
      offer: {
        title: getRandomElementArray(titlesOffer),
        price: getRandomInteger(1000, 4500),
        type: getRandomElementArray(offerType),
        rooms: getRandomInteger(1, maxQuantityRooms),
        guests: getRandomInteger(1, maxQuantityGuest),
        checkin: getRandomElementArray(checkinTimes),
        checkout: getRandomElementArray(checkoutTimes),
        features: features.slice(0, getRandomInteger(1, features.length - 1)),
        description: getRandomElementArray(descriptions),
        photos: photosLinks.slice(0, getRandomInteger(1, photosLinks.length - 1))
      },
      location: {
        x: getRandomInteger(pinLocation.xMin, pinLocation.xMax),
        y: getRandomInteger(pinLocation.yMin, pinLocation.yMax)
      }
    };
    mockPinData.offer.address = `${mockPinData.location.x},${mockPinData.location.y}`;

    return mockPinData;
  });
}


function createPinNode(pinData) {
  const pin = pinTemplate.cloneNode(true);
  const pinImg = pin.querySelector(`img`);

  pinImg.src = pinData.author.avatar;
  pinImg.alt = pinData.offer.title;

  pin.style.left = pinData.location.x + `px`;
  pin.style.top = pinData.location.y + `px`;

  return pin;
}

function fixPositiPin(pin) {
  pin.style.left = pin.offsetLeft - pin.offsetWidth / 2 + `px`;
  pin.style.top = pin.offsetTop - pin.offsetHeight + `px`;
}


function appendPins(pinsData, placeInsertion) {
  const temporaryСontainer = document.createDocumentFragment();

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


// Показываю карту
mapNode.classList.remove(`map--faded`);

// Генерирую пины и вставляю на страницу
const mockPinsData = createMockPinData(quantityPins);
const mapPinsContainer = document.querySelector(`.map__pins`);
appendPins(mockPinsData, mapPinsContainer);

