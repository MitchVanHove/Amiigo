class AmiiboAPI {
  async getAmiiboData(refID) {
    // haalt specifieke data op van Amiibo API
    let response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?tail=${refID}`
    );
    let data = await response.json();
    return data;
  }

  async getAllAmiiboData() {
    // haalt alle data op van Amiibo API
    // momenteel wordt enkel data van Super Smash Bros opgehaald. Het ophalen van alle Amiibo is te zwaar voor de browser.
    let response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?type=Figure&amiiboSeries=Super Smash Bros.`
    );
    let data = await response.json();
    return data;
  }
}

export const amiiboAPI = new AmiiboAPI();
