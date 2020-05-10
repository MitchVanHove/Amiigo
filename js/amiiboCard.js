import { firebaseInstance } from "./firebase.js";
import { amiiboCards } from "./amiiboCards.js";

export class AmiiboCard {
  constructor(amiibo) {
    this.data = amiibo;
  }

  // Kijkt na of de gebruiker de amiibo heeft en geeft een vinkje of een x'je weer.
  getActions() {
    if (this.data.checked) {
      return `<img src="../IMG/Amiigo_Check.png" id="add${this.data.tail}" />`;
    }
    return `<img src="../IMG/Amiigo_X.png" id="remove${this.data.tail}" />`;
  }

  // De HTML lay-out voor de Amiibo-cards
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

  // Voegt de amiibo toe aan de collectie van de gebruiker
  addAmiibo() {
    console.log("Amiibo Checked");
    firebaseInstance.addAmiibo(this.data.tail);
    window.setTimeout(amiiboCards.rerenderFunction.bind(amiiboCards), 0);
  }

  // Verwijdert amiibo uit de collectie van de gebruiker
  removeAmiibo() {
    console.log("Amiibo Unchecked");
    firebaseInstance.removeAmiibo(this.data.tail);
    window.setTimeout(amiiboCards.rerenderFunction.bind(amiiboCards), 0);
  }

  // Verbindt eventlistener aan de buttons van de amiibocards
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
