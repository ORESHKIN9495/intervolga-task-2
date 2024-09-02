import { setError } from "./setErrors.js";

export const validate = (data) => {
  for (const key in data) {
    if (!data[key].length && key !== "date") {
      setError(key, "Поле не должно быть пустым");
    }

    if (key === "gosNumber") {
      if (
        !/^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/iu.test(
          data[key]
        ) &&
        data[key].length
      ) {
        setError(key, "Некорректный госномер");
      }
    }

    if (key === "passportSeries") {
      if (data[key].length < 5 && data[key].length) {
        setError(key, "Введите корректную серию паспорта");
      }
    }

    if (key === "passportNumber") {
      if (data[key].length < 6 && data[key].length) {
        setError(key, "Введите корректный номер паспорта");
      }
    }

    if (key === "passportDate" || key === "customInput") {
      if (data[key].length) {
        isValidDate(data[key], key);
      }

      if (data[key].length < 10 && data[key].length) {
        setError(key, "Введите корректную дату");
      }
    }
  }
};

export const isValidDate = (value, key) => {
  const currentDate = value.split("-");
  const date = new Date(currentDate[2], currentDate[1], currentDate[0]);

  if (
    date.getDate() != currentDate[0] ||
    date.getMonth() != currentDate[1] ||
    date.getFullYear() != currentDate[2]
  ) {
    setError(key, "Введите корректную дату");
  }
};
