const Joke = () => {
    const main = document.querySelector('main');

    fetch('https://v2.jokeapi.dev/joke/Any?type=single')
    .then((response) => response.json())
    .then((data) => {
        main.innerHTML = ` <div class="card m-5">
        <div class="card-header">
          ${data.category}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>${data.joke}</p>
          </blockquote>
        </div>
      </div>`;
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    })
};

export default Joke;