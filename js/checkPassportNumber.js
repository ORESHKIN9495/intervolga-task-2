export const checkPassportNumber = (value) => {
  return value.substring(0, 6).replace(/\D/g, "");
};
