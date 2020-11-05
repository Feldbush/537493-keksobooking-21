'use strict';

(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const offerTypeToRu = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  function renderFeatures(container, dataElements) {
    container.innerHTML = ``;

    dataElements.forEach((feature) => {
      const template = document.createElement(`li`);
      template.classList.add(`popup__feature`);
      template.classList.add(`popup__feature--${feature}`);
      container.append(template);
    });
  }

  function renderPhotos(container, template, dataElements) {
    container.innerHTML = ``;

    dataElements.forEach((photoSrc) => {
      const photo = template.cloneNode(true);
      photo.src = photoSrc;
      container.append(photo);
    });
  }

  function getDeclinationlOfNum(number, titles) {
    const CASES = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : CASES[(number % 10 < 5) ? number % 10 : 5]];
  }

  window.card = {
    createCardNode(dataCard) {
      const {
        offer = {},
        author = {}
      } = dataCard;

      const {
        address = `500`,
        checkin = ``,
        checkout = ``,
        description = ``,
        features = [],
        guests = ``,
        photos = [],
        price = ``,
        rooms = ``,
        title = ``,
        type = ``
      } = offer;

      const card = cardTemplate.cloneNode(true);

      const cardTitle = card.querySelector(`.popup__title`);
      const cardAddress = card.querySelector(`.popup__text--address`);
      const cardPrice = card.querySelector(`.popup__text--price`);
      const cardType = card.querySelector(`.popup__type`);
      const cardCapacity = card.querySelector(`.popup__text--capacity`);
      const cardTime = card.querySelector(`.popup__text--time`);
      const cardFeatures = card.querySelector(`.popup__features`);
      const cardDescription = card.querySelector(`.popup__description`);
      const cardPhotos = card.querySelector(`.popup__photos`);
      const cardAvatar = card.querySelector(`.popup__avatar`);
      const cardPhotoTemplate = card.querySelector(`.popup__photo`).cloneNode(true);

      cardTitle.textContent = title;
      cardAddress.textContent = address;
      cardPrice.textContent = price;
      cardType.textContent = offerTypeToRu[type];
      cardCapacity.textContent = `${rooms} ${getDeclinationlOfNum(parseInt(rooms, 10), [`комната`, `комнаты`, `комнат`])} для ${guests} ${getDeclinationlOfNum(parseInt(guests, 10), [`гость`, `гостей`, `гостей`])}`;
      cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
      cardDescription.textConten = description;
      cardAvatar.src = author.avatar;
      renderFeatures(cardFeatures, features);
      renderPhotos(cardPhotos, cardPhotoTemplate, photos);

      return card;
    }
  };
})();

