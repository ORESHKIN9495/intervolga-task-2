export const checkDate = (value) => {
  let formatedValue = "";

  formatedValue = value.substring(0, 2).replace(/\D/g, "");

  if (formatedValue.length >= 2) {
    formatedValue += "-" + value.substring(2, 5).replace(/\D/g, "");
  }

  if (formatedValue.length >= 5) {
    formatedValue += "-" + value.substring(5, 10).replace(/\D/g, "");
  }

  return formatedValue;
};
