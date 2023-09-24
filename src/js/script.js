import API from './cat-api.js';
const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('select.breed-select');
const error = document.querySelector('.error');

window.addEventListener('load', event => {
  loadData();
});

function loadData() {
  showLoading();
  API.fetchBreeds()
    .then(res => {
      if (res.data?.length === 0) {
        showError();
      }
      return res.data.reduce(
        (markup, breed) => markup + createMarkup(breed),
        ''
      );
    })
    .then(markup => updateBreeds(markup))
    .catch(onError)
    .finally(() => {
      hideLoading();
    });
}

function createMarkup(breed) {
  const { id, name } = breed;

  return `<option value=${id}>${name}</option>`;
}

function updateBreeds(markup) {
  breedSelect.innerHTML = markup;
}

function showError() {
  error.classList.remove('hidden');
}

function onError(err) {
  console.error(err);
  showError();
}

function showLoading() {
  loader.classList.remove('hidden');
  error.classList.add('hidden');
}

function hideLoading() {
  loader.classList.add('hidden');
}
