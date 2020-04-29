class AmiiboAPI {
  async getAmiiboData(refID) {
    let response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?tail=${refID}`
    );
    let data = await response.json();
    return data;
  }

  async getAllAmiiboData() {
    let response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?type=Figure`
    );
    let data = await response.json();
    return data;
  }
}

export const amiiboAPI = new AmiiboAPI();
