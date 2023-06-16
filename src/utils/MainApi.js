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
}

export default MainApi;
