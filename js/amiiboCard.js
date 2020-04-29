export class AmiiboCard {
  constructor(amiibo) {
    this.data = amiibo;
  }

  get htmlString() {
    return `<div class="amiibo"><img src=${this.data.image} />
      <div id="amiiboInfo" class="amiiboInfo">
      ${this.data.name}</br>
      Series: ${this.data.gameSeries}</br>
      ${this.data.release.eu}</br>
      </div>
    </div>`;
  }
}
