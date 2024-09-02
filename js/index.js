const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const reset = document.querySelector(".reset");
const elements = document.querySelectorAll("input");

const picker = document.querySelector(".date");
const newPicker = document.querySelector(".custom-date__icon");
const customDate = document.querySelector(".custom-date__input");

// Регулярные выражения

const patternGosNumber =
  /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/iu;

const patternNumber = /[^0-9]/g;
const patternLetter = /[^АВЕКМНОРСТУХ]/gi;

// Вызываем Datepicker

newPicker.addEventListener("click", (event) => {
  picker.showPicker();
});

// Переводим дату в нужный формат и добавляем результат в кастомный инпут

picker.addEventListener("change", (event) => {
  customDate.value = picker.value.split("-").reverse().join("-");

  removeError(customDate);
});

// Отправляем форму

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);

  if (validate()) {
    console.log(data);
  }
});

// Валидация полей

const validate = () => {
  let isValid = true;

  elements.forEach((element) => {
    if (!element.value.length) {
      addError(element, "Поле не должно быть пустым");
    }

    if (element.name === "gos-number") {
      if (!patternGosNumber.test(element.value) && element.value.length) {
        addError(element, "Некорректный госномер");
      }
    }

    if (element.name === "passport-series") {
      if (element.value.length < 5 && element.value.length) {
        addError(element, "Введите корректную серию паспорта");
      }
    }

    if (element.name === "passport-number") {
      if (element.value.length < 6 && element.value.length) {
        addError(element, "Введите корректный номер паспорта");
      }
    }

    if (
      element.name === "passport-date" ||
      element.name === "custom-date__input"
    ) {
      if (element.value.length) {
        checkIsValidDate(element.value, element);
      }
    }

    if (element.classList.contains("error")) {
      isValid = false;
    }
  });

  return isValid;
};

// Выводим результат масок в инпуты

elements.forEach((element) => {
  element.addEventListener("input", (event) => {
    removeError(element);

    if (element.name === "gos-number") {
      element.value = checkGosNumber(event.target.value);
    }

    if (event.target.name === "passport-series") {
      event.target.value = checkPassportSeries(event.target.value);
    }

    if (event.target.name === "passport-number") {
      element.value = checkPassportNumber(event.target.value);
    }

    if (event.target.name === "passport-date") {
      element.value = checkDate(event.target.value);
    }

    if (event.target.name === "custom-date__input") {
      element.value = checkDate(event.target.value);

      picker.value = checkDate(event.target.value)
        .split("-")
        .reverse()
        .join("-");
    }
  });
});

// Проверка валидности даты

const checkIsValidDate = (value, element) => {
  const currentDate = value.split("-");
  const date = new Date(currentDate[2], currentDate[1], currentDate[0]);

  if (date.getDate() != currentDate[0]) {
    addError(element, "Веедиде корректный день");
  } else if (date.getMonth() != currentDate[1]) {
    addError(element, "Веедиде корректный месяц");
  } else if (date.getFullYear() != currentDate[2]) {
    addError(element, "Веедиде корректный год");
  }
};

// Маска для полей даты

const checkDate = (value) => {
  let formatedValue = "";

  formatedValue = value.substring(0, 2).replace(patternNumber, "");

  if (formatedValue.length >= 2) {
    formatedValue += "-" + value.substring(2, 5).replace(patternNumber, "");
  }

  if (formatedValue.length >= 5) {
    formatedValue += "-" + value.substring(5, 10).replace(patternNumber, "");
  }

  return formatedValue;
};

// Маска гос-номера

const checkGosNumber = (value) => {
  let formatedValue = "";

  formatedValue = value.substring(0, 1).replace(patternLetter, "");

  if (value.length > 1) {
    formatedValue += value.substring(1, 4).replace(patternNumber, "");
  }

  if (value.length >= 4) {
    formatedValue += value.substring(4, 6).replace(patternLetter, "");
  }

  if (value.length >= 6) {
    formatedValue += value.substring(6, 9).replace(patternNumber, "");
  }

  return formatedValue.toUpperCase();
};

// Маска для серии и номера паспорта

const checkPassportSeries = (value) => {
  let formatedValue = "";

  formatedValue = value.substring(0, 2).replace(patternNumber, "");

  if (formatedValue.length >= 2) {
    formatedValue += " " + value.substring(2, 5).replace(patternNumber, "");
  }

  return formatedValue;
};

const checkPassportNumber = (value) => {
  let formatedValue = "";

  formatedValue = value.substring(0, 6).replace(patternNumber, "");

  return formatedValue;
};

// Добавляем ошибки

const addError = (element, error) => {
  if (element.name === "custom-date__input") {
    element.parentElement.classList.add("error");
    element.parentElement.parentElement.lastElementChild.innerHTML = error;
  } else {
    element.classList.add("error");
    element.parentElement.lastElementChild.innerHTML = error;
  }
};

// Отчищаем ошибки

const removeError = (element) => {
  if (element.name === "custom-date__input") {
    element.parentElement.classList.remove("error");
    element.parentElement.parentElement.lastElementChild.innerHTML = "";
  } else {
    element.classList.remove("error");
    element.parentElement.lastElementChild.innerHTML = "";
  }
};

// Отчищаем поля формы и ошибки

reset.addEventListener("click", (event) => {
  elements.forEach((element) => removeError(element));
});
