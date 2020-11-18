'use strict';

(function () {
  const MAP_PIN_MAIN_TOP = 375;
  const MAP_PIN_MAIN_LEFT = 570;
  const mainPin = document.querySelector(`.map__pin--main`);

  const mapNode = document.querySelector(`.map`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);

  function pinHandler(evt) {
    if (evt.button === window.utils.LEFT_BUTTON_MOUSE_KEY_CODE || evt.keyCode === window.utils.ENTER_KEY_CODE) {
      if (document.querySelector(`.map__card`)) {
        document.querySelector(`.map__card`).remove();
      }
      const serialNumber = evt.currentTarget.dataset.serialNumber;
      const cardOffer = window.card.createCardNode(window.filter.getData(true)[serialNumber]);
      const closeOfferCardOnKeypress = (e) => {
        if (e.keyCode === window.utils.ESC_KEY_CODE) {
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
    if (evt.button === window.utils.LEFT_BUTTON_MOUSE_KEY_CODE || evt.keyCode === window.utils.ENTER_KEY_CODE) {
      evt.preventDefault();
      window.map.setStatePage(true);
    }
  }


  function dragAndDropHandlerMainPin(evt) {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let startPin = {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      const maxCoordX = mainPin.offsetParent.offsetWidth - (mainPin.offsetWidth / 2);
      const minCoordX = 0 - (mainPin.offsetWidth / 2);
      const maxCoordY = 630 - (mainPin.offsetHeight) - window.form.HEIGHT_NEEDLE_MAIN_PIN;
      const minCoordY = 130 - (mainPin.offsetHeight) - window.form.HEIGHT_NEEDLE_MAIN_PIN;

      mainPin.style.top = startPin.y - shift.y + `px`;
      mainPin.style.left = startPin.x - shift.x + `px`;

      if (mainPin.offsetLeft <= minCoordX) {
        mainPin.style.left = minCoordX + `px`;
      }
      if (mainPin.offsetLeft >= maxCoordX) {
        mainPin.style.left = maxCoordX + `px`;
      }
      if (mainPin.offsetTop <= minCoordY) {
        mainPin.style.top = minCoordY + `px`;
      }
      if (mainPin.offsetTop >= maxCoordY) {
        mainPin.style.top = maxCoordY + `px`;
      }

      window.form.fillAdress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      window.form.fillAdress();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    }

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }

  function appendPins(pinsData, placeInsertion) {
    const temporaryContainer = document.createDocumentFragment();
    pinsData.forEach((pinData, index) => {
      let pin = window.pin.createPinNode(pinsData[index], pinsData[index].serialNumber);
      pin.addEventListener(`click`, pinHandler);
      pin.addEventListener(`keypress`, pinHandler);
      temporaryContainer.append(pin);
    });

    placeInsertion.append(temporaryContainer);
  }

  function insertBeforeNode(parentNode, insertedNode, nodeBeforeInsert) {
    parentNode.insertBefore(insertedNode, nodeBeforeInsert);
  }

  function errorRequestHandler(message) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `40px`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  const setMainPinCenter = function () {
    mainPin.style.top = MAP_PIN_MAIN_TOP + `px`; // прописали стиль координат на данные с html
    mainPin.style.left = MAP_PIN_MAIN_LEFT + `px`; // прописали стиль координат на данные с html
  };

  mainPin.addEventListener(`mousedown`, dragAndDropHandlerMainPin);
  mainPin.addEventListener(`mousedown`, mainPinHandler);
  mainPin.addEventListener(`keydown`, mainPinHandler);

  window.map = {
    setStateMap(state = false) {
      if (state) {
        // Удаляю класс скрывающий пины
        mapNode.classList.remove(`map--faded`);
        // Генерирую пины и вставляю на страницу
        const mapPinsContainer = document.querySelector(`.map__pins`);
        window.getData.makeRequest((response) => {
          window.filter.setData(response);
          appendPins(window.filter.getData(), mapPinsContainer);
        },
        errorRequestHandler
        );

        mainPin.removeEventListener(`mousedown`, mainPinHandler);
        mainPin.removeEventListener(`keydown`, mainPinHandler);
      } else {
        window.map.clearPins();
        window.map.closeCardsOffer();
        mapNode.classList.add(`map--faded`);
        setMainPinCenter();
        mainPin.addEventListener(`mousedown`, mainPinHandler);
        mainPin.addEventListener(`keydown`, mainPinHandler);
      }
    },
    setStatePage(state = false) {
      window.map.setStateMap(state);
      window.form.setStateForm(state);
      window.filter.setStatefilterForm(state);

      window.statePage = state;
      window.form.fillAdress();
    },
    clearPins() {
      const pins = mapNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      pins.forEach((pin) => {
        pin.remove();
      });
    },
    updatePins(array) {
      const mapPinsContainer = document.querySelector(`.map__pins`);
      window.map.clearPins();
      appendPins(array, mapPinsContainer);
    },
    closeCardsOffer() {
      document.querySelectorAll(`.map__card`).forEach((item) => item.remove());
    }
  };

})();
