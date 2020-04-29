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
      <div class="buttons">
        <img src="../IMG/Amiigo_X.png" id="remove${this.data.tail}" />
      </div>
    </div>`;
  }

  removeAmiibo = () => {
    console.log(this.data.tail);
  };

  bindEvents = () => {
    this.removeButton = document.getElementById(`remove${this.data.tail}`);
    this.removeButton.addEventListener("click", this.removeAmiibo);
  };
}
