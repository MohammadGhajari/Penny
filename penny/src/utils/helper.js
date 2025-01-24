export function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function isPersian(str) {
  const persianRegex = /[\u0600-\u06FF]/;

  return persianRegex.test(str);
}
export function isEnglish(str) {
  const englishRegex = /^[A-Za-z\s]+$/;

  return englishRegex.test(str);
}
