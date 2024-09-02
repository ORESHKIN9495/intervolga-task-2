import { checkDate } from "./checkDate.js";
import { checkGosNumber } from "./checkGosNumber.js";
import { checkPassportSeries } from "./checkPasportSeries.js";
import { checkPassportNumber } from "./checkPassportNumber.js";
import { errors } from "./setErrors.js";
import { validate } from "./validate.js";

const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const reset = document.querySelector(".reset");
const elements = document.querySelectorAll("input");

const picker = document.querySelector(".date");
const newPicker = document.querySelector(".custom-date__icon");
const customDate = document.querySelector(".custom-date__input");

// Вызываем Datepicker

newPicker.addEventListener("click", () => {
  picker.showPicker();
});

// Переводим дату в нужный формат и добавляем результат в кастомный инпут

picker.addEventListener("change", () => {
  customDate.value = picker.value.split("-").reverse().join("-");
});

// Отправляем форму

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);

  validate(Object.fromEntries(data));

  if (!Object.keys(errors).length) {
    console.log(data);
  }
});

// Выводим результат масок в инпуты

elements.forEach((element) => {
  element.addEventListener("input", (event) => {
    if (element.name === "gosNumber")
      element.value = checkGosNumber(event.target.value);

    if (event.target.name === "passportSeries")
      event.target.value = checkPassportSeries(event.target.value);

    if (event.target.name === "passportNumber")
      element.value = checkPassportNumber(event.target.value);

    if (event.target.name === "passportDate")
      element.value = checkDate(event.target.value);

    if (event.target.name === "customInput") {
      element.value = checkDate(event.target.value);

      picker.value = checkDate(event.target.value)
        .split("-")
        .reverse()
        .join("-");
    }
  });
});

// Очищаем форму

reset.addEventListener("click", () => {
  form.reset();
});
