export function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getFromLocalStorage(key) {
  localStorage.getItem(key);
}
