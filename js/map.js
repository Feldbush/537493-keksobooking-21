'use strict';

(function () {
  const QUANTITY_PINS = 8;
  const ESC_KEY_CODE = 27;
  const ENTER_KEY_CODE = 13;
  const LEFT_BUTTON_MOUSE_KEY_CODE = 0;

  const mockPinsData = window.data.createMockPinData(QUANTITY_PINS);
  const mainPin = document.querySelector(`.map__pin--main`);

  const mapNode = document.querySelector(`.map`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);

  function pinHandler(evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      if (document.querySelector(`.map__card`)) {
        document.querySelector(`.map__card`).remove();
      }
      const serialNumber = evt.currentTarget.dataset.serialNumber;
      const cardOffer = window.card.createCardNode(mockPinsData[serialNumber]);
      const closeOfferCardOnKeypress = (e) => {
        if (e.keyCode === ESC_KEY_CODE) {
          cardOffer.remove();
          document.removeEventListener(`keydown`, closeOfferCardOnKeypress);
        }
      };
      cardOffer.querySelector(`.popup__close`).addEventListener(`click`, () => {
        cardOffer.remove();
      });
      document.addEventListener(`keydown`, closeOfferCardOnKeypress);
      // Добавляю карточку оффера на страницу
      insertBeforeNode(mapNode, cardOffer, mapFiltersContainer);
    }
  }

  function mainPinHandler(evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      evt.preventDefault();
      window.setStatePage(true);
    }
  }

  function appendPins(pinsData, placeInsertion) {
    const temporaryСontainer = document.createDocumentFragment();

    pinsData.forEach((pinData, index) => {
      let pin = window.pin.createPinNode(pinsData[index]);
      pin.addEventListener(`click`, pinHandler);
      pin.addEventListener(`keypress`, pinHandler);
      temporaryСontainer.append(pin);
    });

    placeInsertion.append(temporaryСontainer);
  }

  function insertBeforeNode(parentNode, insertedNode, nodeBeforeInsert) {
    parentNode.insertBefore(insertedNode, nodeBeforeInsert);
  }

  mainPin.addEventListener(`mousedown`, mainPinHandler);
  mainPin.addEventListener(`keydown`, mainPinHandler);

  window.map = {
    setStateMap(state = false) {
      if (state) {
        // Удаляю класс скрывающий пины
        mapNode.classList.remove(`map--faded`);
        // Генерирую пины и вставляю на страницу
        const mapPinsContainer = document.querySelector(`.map__pins`);
        appendPins(mockPinsData, mapPinsContainer);
      } else {
        mapNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
        mapNode.classList.add(`map--faded`);
      }
    }
  };

})();
