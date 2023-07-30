import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import { fetchLink } from './js/fetch';

let simpleLightboxFrame = new SimpleLightbox('.gallery a');

const refs = {
  inputEl: document.querySelector('.searchedInput'),
  form: document.querySelector('.search-form'),
  divEl: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', handlerBtnSubmit);
refs.loadBtn.addEventListener('click', loadMore);

const inputWord = refs.inputEl.value.trim();

async function handlerBtnSubmit(e) {
  try {
    refs.loadBtn.style.display = 'none';
    e.preventDefault();
    refs.divEl.innerHTML = '';
    const { hits, totalHits } = await fetchLink(inputWord);
    refs.divEl.insertAdjacentHTML('beforeend', createMarkup(hits));
    simpleLightboxFrame.refresh();
    Notify.success(`Hooray! We found ${totalHits} images.`);

    refs.loadBtn.style.display = 'block';
    e.target.reset();
  } catch (err) {
    console.log(err);
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } finally {
  }
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
     
      <div class="photo-card">
      <a class="gallery__link" href=${largeImageURL}>
<img src="${webformatURL}" alt="${tags}"  width = "350" height= 300px loading="lazy" /></a>
<div class="info">
  <p class="info-item">
    <b>Likes ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views ${views}</b>
  </p>
  <p class="info-item">
    <b>Comments ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads ${downloads}</b>
  </p>
</div>
</div>
`
    )
    .join('');
}

let page = 1;

async function loadMore(e) {
  try {
    page += 1;
    const { hits, totalHits } = await fetchLink(inputWord, page);
    refs.divEl.insertAdjacentHTML('beforeend', createMarkup(hits));
    simpleLightboxFrame.refresh();

    if (hits.length === totalHits) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
}
