'use strict';

(function () {
  const Url = {
    LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
    SEND: `https://21.javascript.pages.academy/keksobooking`
  };

  window.getData = {
    makeRequest(onSuccesss, onError, url = Url.LOAD) {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener(`load`, function () {

        let error;
        switch (xhr.status) {
          case 200:
            onSuccesss(JSON.parse(xhr.responseText));
            break;
          case 400:
            error = `Неверный запрос`;
            break;
          case 401:
            error = `Пользователь не авторизован`;
            break;
          case 404:
            error = `Ничего не найдено`;
            break;

          default:
            error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
        }

        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });

      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      });

      xhr.timeout = window.utils.TIMEOUT_IN_MS;

      xhr.open(`GET`, url);

      xhr.send();
    },
    sendUserData(data, onSuccess, onError, url = Url.SEND) {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener(`load`, function () {
        if (xhr.status === 200) {
          onSuccess(`Данные успешно отправлены`);
        } else {
          onError(`Непредвиденная ошибка`);
        }
      });

      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });

      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      });

      xhr.timeout = window.utils.TIMEOUT_IN_MS;

      xhr.open(`POST`, url);

      xhr.send(data);
    }
  };
})();
