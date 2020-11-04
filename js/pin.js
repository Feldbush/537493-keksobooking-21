'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  window.pin = {
    createPinNode(pinData) {
      const pin = pinTemplate.cloneNode(true);
      const pinImg = pin.querySelector(`img`);

      pinImg.src = pinData.author.avatar;
      pinImg.alt = pinData.offer.title;

      pin.style.left = pinData.location.x - pinImg.width + `px`;
      pin.style.top = pinData.location.y - pinImg.height + `px`;

      pin.dataset.serialNumber = pinData.serialNumber;

      return pin;
    }
  };
})();
