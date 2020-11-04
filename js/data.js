'use strict';

(function () {
  const TITLE_OFFER = [`Супер классный, новый, модный отель`, `Вот это отель`, `Гостиница так гостиница`];
  const DESCRIPTION = [`Лучший отель на этой планете Лучший отель на этой планете Лучший отель на этой планете`, `Бомба БомбаБомбаБомбаБомбаБомбаБомба`, `Шикарно Шикарно Шикарно Шикарно`];
  const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const MAX_QUANTITY_ROOMS = 5;
  const MAX_QUANTITY_GUEST = 7;
  const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const mapNode = document.querySelector(`.map`);
  const PIN_LOCATION = {
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

  window.data = {
    createMockPinData(count) {
      return new Array(count)
      .fill(``)
      .map((element, index) => {
        const mockPinData = {
          author: {
            avatar: `img/avatars/user0${index + 1}.png`
          },
          offer: {
            title: getRandomElementArray(TITLE_OFFER),
            price: getRandomInteger(1000, 4500),
            type: getRandomElementArray(OFFER_TYPE),
            rooms: getRandomInteger(1, MAX_QUANTITY_ROOMS),
            guests: getRandomInteger(1, MAX_QUANTITY_GUEST),
            checkin: getRandomElementArray(CHECKIN_TIMES),
            checkout: getRandomElementArray(CHECKOUT_TIMES),
            features: FEATURES.slice(0, getRandomInteger(1, FEATURES.length - 1)),
            description: getRandomElementArray(DESCRIPTION),
            photos: PHOTOS_LINKS.slice(0, getRandomInteger(1, PHOTOS_LINKS.length - 1))
          },
          location: {
            x: getRandomInteger(PIN_LOCATION.xMin, PIN_LOCATION.xMax),
            y: getRandomInteger(PIN_LOCATION.yMin, PIN_LOCATION.yMax)
          }
        };
        mockPinData.offer.address = `${mockPinData.location.x},${mockPinData.location.y}`;
        mockPinData.serialNumber = index;

        return mockPinData;
      });
    }
  };
})();
