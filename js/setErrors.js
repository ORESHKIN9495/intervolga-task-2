export let errors = {};

const elements = document.querySelectorAll("input");

export const setError = (key, error) => {
  errors[key] = error;

  inputError(key);

  setTimeout(() => {
    errors = {};

    removeError(key);
  }, 3000);
};

const inputError = (key) => {
  elements.forEach((element) => {
    if (element.name === key) {
      if (element.name === "customInput") {
        element.parentElement.classList.add("error");

        element.parentElement.parentElement.insertAdjacentHTML(
          "beforeend",
          `<p class="error-text">${errors[key]}</p>`
        );
      } else {
        element.classList.add("error");

        element.parentElement.insertAdjacentHTML(
          "beforeend",
          `<p class="error-text">${errors[key]}</p>`
        );
      }
    }
  });
};

const removeError = (key) => {
  elements.forEach((element) => {
    if (element.name === key) {
      document.querySelector(".error-text").remove();

      element.classList.remove("error");

      if (key === "customInput") {
        element.parentElement.classList.remove("error");
      }
    }
  });
};
