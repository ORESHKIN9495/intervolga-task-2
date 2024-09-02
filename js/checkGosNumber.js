export const checkGosNumber = (value) => {
  let formatedValue = "";

  formatedValue = value.substring(0, 1).replace(/[^АВЕКМНОРСТУХ]/gi, "");

  if (value.length > 1) {
    formatedValue += value.substring(1, 4).replace(/\D/g, "");
  }

  if (value.length >= 4) {
    formatedValue += value.substring(4, 6).replace(/[^АВЕКМНОРСТУХ]/gi, "");
  }

  if (value.length >= 6) {
    formatedValue += value.substring(6, 9).replace(/\D/g, "");
  }

  return formatedValue.toUpperCase();
};
