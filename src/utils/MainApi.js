class MainApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async updateProfile(name, email) {
    const url = `${this.baseUrl}/users/me`;
    const token = localStorage.getItem('jwt');

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении профиля');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      throw error;
    }
  }

  async createMovie(movieData) {
    const url = `${this.baseUrl}/movies`;
    const token = localStorage.getItem('jwt');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании фильма');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при создании фильма:', error);
      throw error;
    }
  }

  async getMovies() {
    const url = `${this.baseUrl}/movies`;
    const token = localStorage.getItem('jwt');

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при получении списка фильмов');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении списка фильмов:', error);
      throw error;
    }
  }

  async deleteMovie(movieId) {
    const url = `${this.baseUrl}/movies/${movieId}`;
    const token = localStorage.getItem('jwt');

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении фильма');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при удалении фильма:', error);
      throw error;
    }
  }

}

export default MainApi;
