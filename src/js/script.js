import API from './cat-api.js';
const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('select.breed-select');
const error = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

window.addEventListener('load', event => {
  loadData();
});

breedSelect.addEventListener('change', loadCatInfo);

function loadCatInfo(event) {
  showLoading();
  hideCatInfo();
  const selectedOptionValue = event.currentTarget.value;
  const selectedOptionIndex = event.currentTarget.selectedIndex;
  const selectedOptionText =
    event.currentTarget.options[selectedOptionIndex].text;
  API.fetchCatByBreed(selectedOptionValue)
    .then(res => {
      if (res.data?.length === 0) {
        showError();
      }
      return createCatInfoDivMarkup(res.data[0]);
    })
    .then(markup => {
      showCatInfo();
      updateCatInfo(markup);
    })
    .catch(onError)
    .finally(() => {
      hideLoading();
    });
}

function loadData() {
  showLoading();
  API.fetchBreeds()
    .then(res => {
      if (res.data?.length === 0) {
        showError();
      }
      return res.data.reduce(
        (markup, breed) => markup + createSelectMarkup(breed),
        ''
      );
    })
    .then(markup => {
      showSelect();
      updateBreeds(markup);
    })
    .catch(onError)
    .finally(() => {
      hideLoading();
    });
}

function createSelectMarkup(breed) {
  const { id, name } = breed;

  return `<option value=${id}>${name}</option>`;
}

function createCatInfoDivMarkup(breed) {
  const { url, breeds } = breed;

  return `<img src="${url}" alt="${breeds[0].name}" width="300"><div class="content"><h3>${breeds[0].name}</h3><p>${breeds[0].description}</p><b>Temperament: </b><span>${breeds[0].temperament}</span></div>`;
}

function updateBreeds(markup) {
  breedSelect.innerHTML = markup;
}

function updateCatInfo(markup) {
  catInfoDiv.innerHTML = markup;
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

function showSelect() {
  breedSelect.classList.remove('hidden');
}

function showCatInfo() {
  catInfoDiv.classList.remove('invisible');
}

function hideCatInfo() {
  catInfoDiv.classList.add('invisible');
}
