'use strict';

(function () {
  const ESC_KEY_CODE = 27;
  const ENTER_KEY_CODE = 13;
  const LEFT_BUTTON_MOUSE_KEY_CODE = 0;

  // const mockPinsData = window.data.createMockPinData(QUANTITY_PINS);
  const mainPin = document.querySelector(`.map__pin--main`);

  const mapNode = document.querySelector(`.map`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);

  function pinHandler(evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      if (document.querySelector(`.map__card`)) {
        document.querySelector(`.map__card`).remove();
      }
      const serialNumber = evt.currentTarget.dataset.serialNumber;
      const cardOffer = window.card.createCardNode(window.mockPinsData[serialNumber]);
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
      window.map.setStatePage(true);
    }
  }


  function dargAndDropHandlerMainPin(evt) {

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

      // console.log(shift.x, shift.y);

      // startCoords = {
      //   x: moveEvt.clientX,
      //   y: moveEvt.clientY
      // };

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
    const temporaryСontainer = document.createDocumentFragment();

    pinsData.forEach((pinData, index) => {
      let pin = window.pin.createPinNode(pinsData[index], index);
      pin.addEventListener(`click`, pinHandler);
      pin.addEventListener(`keypress`, pinHandler);
      temporaryСontainer.append(pin);
    });

    placeInsertion.append(temporaryСontainer);
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

  mainPin.addEventListener(`mousedown`, mainPinHandler);
  mainPin.addEventListener(`mousedown`, dargAndDropHandlerMainPin);
  mainPin.addEventListener(`keydown`, mainPinHandler);

  window.map = {
    setStateMap(state = false) {
      if (state) {
        // Удаляю класс скрывающий пины
        mapNode.classList.remove(`map--faded`);
        // Генерирую пины и вставляю на страницу
        const mapPinsContainer = document.querySelector(`.map__pins`);
        window.getData.makeRequest((response) => {
          window.mockPinsData = response;
          appendPins(response, mapPinsContainer);
        },
        errorRequestHandler
        );
      } else {
        mapNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
        mapNode.classList.add(`map--faded`);
      }
    },
    setStatePage(state = false) {
      window.map.setStateMap(state);
      window.form.setStateForm(state);

      window.statePage = state;
      window.form.fillAdress();
    }
  };

})();
