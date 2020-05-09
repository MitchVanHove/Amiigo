import { firebaseInstance } from "./firebase.js";
import { amiiboCards } from "./amiiboCards.js";

export class AmiiboCard {
  constructor(amiibo) {
    this.data = amiibo;
  }

  getActions() {
    if (this.data.checked) {
      return `<img src="../IMG/Amiigo_Check.png" id="add${this.data.tail}" />`;
    }
    return `<img src="../IMG/Amiigo_X.png" id="remove${this.data.tail}" />`;
  }

  get htmlString() {
    return `<div class="amiibo" id="amiibo${this.data.tail}"><img src=${
      this.data.image
    } />
      <div id="amiiboInfo" class="amiiboInfo">
      ${this.data.name}</br>
      Series: ${this.data.gameSeries}</br>
      ${this.data.release.eu ?? "N/A"}</br>
      </div>
      <div class="buttons">
      ${this.getActions()}
      </div>
    </div>`;
  }

  addAmiibo() {
    console.log("Amiibo Unchecked");
    firebaseInstance.addAmiibo(this.data.tail);
    window.setTimeout(amiiboCards.rerenderFunction.bind(amiiboCards), 0);
  }

  removeAmiibo() {
    console.log("Amiibo checked");
    firebaseInstance.removeAmiibo(this.data.tail);
    window.setTimeout(amiiboCards.rerenderFunction.bind(amiiboCards), 0);
  }

  bindEvents = () => {
    if (this.data.checked) {
      this.addButton = document.getElementById(`add${this.data.tail}`);
      this.addButton.addEventListener("click", this.removeAmiibo.bind(this));
    } else {
      this.removeButton = document.getElementById(`remove${this.data.tail}`);
      this.removeButton.addEventListener("click", this.addAmiibo.bind(this));
    }
  };
}
