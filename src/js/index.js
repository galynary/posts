const listPosts = document.querySelector('.js-posts');
const addtPost = document.querySelector('.js-add');
const formWraper = document.querySelector('.js-form');
const errMessage = document.querySelector('.js-error');

addtPost.addEventListener('click', handlerAddPost);

function handlerAddPost() {
  formWraper.innerHTML = `<form action="submit" class="js-form-add" style="display:flex;flex-direction:column;">
    <input type="text" name="title" />
    <textarea name="body" cols="" rows=""></textarea>
    <button type="submit">Додати пост</button>
  </form>`;
  const form = document.querySelector('.js-form-add');
  form.addEventListener('submit', handleFormSubmit);
}

//--------ДАНІ ФОРМИ-----------
function handleFormSubmit(evt) {
  evt.preventDefault();

  const { title, body } = evt.currentTarget.elements;
  const data = {
    title: title.value,
    body: body.value,
  };

  addPostService(data)
    .then(obj => {
      listPosts.insertAdjacentHTML('beforeend', createPostMarkup(obj));
    })
    .catch(() => {
      errMessage.innerHTML = 'Не можливо додати пост';
    })
    .finally(() => {
      formWraper.innerHTML = '';
      setTimeout(() => {
        errMessage.innerHTML = '';
      }, 2000);
    });
}

function createPostMarkup({ id, title, body }) {
  return `<li data-id="${id}">
    <h2>${title}</h2>
    <p>${body}</p>
  </li>`;
}

//--------ВІДПРАВКА ДАНИХ(ПОСТ)-----------
function addPostService(data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch('https://jsonplaceholder.typicode.com/posts', options).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}
