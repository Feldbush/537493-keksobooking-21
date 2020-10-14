'use strict';

const QUANTITY_PINS = 8;
const TITLE_OFFER = [`Супер классный, новый, модный отель`, `Вот это отель`, `Гостиница так гостиница`];
const DESCRIPTION = [`Лучший отель на этой планете Лучший отель на этой планете Лучший отель на этой планете`, `Бомба БомбаБомбаБомбаБомбаБомбаБомба`, `Шикарно Шикарно Шикарно Шикарно`];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OfferTypeRu = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const MAX_QUANTITY_ROOMS = 5;
const MAX_QUANTITY_GUEST = 7;
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const mapNode = document.querySelector(`.map`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
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


function createMockPinData(count) {
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

    return mockPinData;
  });
}


function createPinNode(pinData) {
  const pin = pinTemplate.cloneNode(true);
  const pinImg = pin.querySelector(`img`);

  pinImg.src = pinData.author.avatar;
  pinImg.alt = pinData.offer.title;

  pin.style.left = pinData.location.x - pinImg.width + `px`;
  pin.style.top = pinData.location.y - pinImg.height + `px`;

  return pin;
}


function appendPins(pinsData, placeInsertion) {
  const temporaryСontainer = document.createDocumentFragment();

  for (let index = 0; index < pinsData.length; index++) {
    temporaryСontainer.append(createPinNode(pinsData[index]));
  }

  placeInsertion.append(temporaryСontainer);
}

function createCardNode(dataCard) {
  const card = cardTemplate.cloneNode(true);
  const title = card.querySelector(`.popup__title`);
  const address = card.querySelector(`.popup__text--address`);
  const price = card.querySelector(`.popup__text--price`);
  const type = card.querySelector(`.popup__type`);
  const capacity = card.querySelector(`.popup__text--capacity`);
  const time = card.querySelector(`.popup__text--time`);
  const featuresItems = card.querySelectorAll(`.popup__feature`);
  const description = card.querySelector(`.popup__description`);
  const photos = card.querySelector(`.popup__photos`);
  const photoTemplate = card.querySelector(`.popup__photo`).cloneNode(true);
  const avatar = card.querySelector(`.popup__avatar`);

  title.textContent = dataCard.offer.title;
  address.textContent = dataCard.offer.address;
  price.textContent = dataCard.offer.price;
  type.textContent = OfferTypeRu[dataCard.offer.type];
  capacity.textContent = `${dataCard.offer.rooms} комнаты для ${dataCard.offer.guests} гостей`;
  time.textContent = `Заезд после ${dataCard.offer.checkin}, выезд до ${dataCard.offer.checkout}`;
  description.textConten = dataCard.offer.description;
  avatar.src = dataCard.author.avatar;

  // Скрываю все преимущества
  featuresItems.forEach((item) => {
    item.style.display = `none`;
  });

  // Показываю лишь те преимущества которые есть в данном офере
  dataCard.offer.features.forEach((feature) => {
    const featureItem = card.querySelector(`.popup__feature--${feature}`);
    if (featureItem !== null) {
      featureItem.style.display = ``;
    }
  });

  // Удаляю все дочерние элементы контейнера с фотками офера
  while (photos.firstChild) {
    photos.removeChild(photos.firstChild);
  }

  // Добавляю фото оффера используя в качестве темплейта img которые уже лежал в контенере с фото
  dataCard.offer.photos.forEach((photoSrc) => {
    const photo = photoTemplate.cloneNode(true);
    photo.src = photoSrc;
    photos.append(photo);
  });

  return card;
}


// Показываю карту
mapNode.classList.remove(`map--faded`);

// Генерирую пины и вставляю на страницу
const mockPinsData = createMockPinData(QUANTITY_PINS);
const mapPinsContainer = document.querySelector(`.map__pins`);
appendPins(mockPinsData, mapPinsContainer);

// Добавляю карточку оффера на страницу
mapNode.insertBefore(createCardNode(createMockPinData(QUANTITY_PINS)[0]), mapFiltersContainer);
