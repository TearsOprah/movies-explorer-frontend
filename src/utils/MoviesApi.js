class MoviesApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getMovies() {
    return fetch(`${this.baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error('Ошибка:', err);
      });
  }
}

export default new MoviesApi('https://api.nomoreparties.co');
