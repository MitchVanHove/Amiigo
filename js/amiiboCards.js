import { firebaseInstance } from "./firebase.js";
import { AmiiboCard } from "./amiiboCard.js";
import { amiiboAPI } from "./amiiboAPI.js";
import { sorter } from "./sorter.js";

class AmiiboCards {
  constructor() {
    // htmlElement wordt gebruikt om alle nodige html in te voeren
    this.htmlElement = document.getElementById("amiiboCollection");

    // dataCache wordt gebruikt om de rendered data te beheren
    this.dataCache = [];

    // checkedAmiibo wordt gebruikt als collectie om de gechekte amiibo id's bij te houden
    this.checkedAmiibo = [];

    // allAmiibo is om de amiibo van de de firebase bij te houden
    this.amiiboData = [];

    // rerenderFunction wordt bijgehouden om te refreshen als een actie gebeurt
    this.rerenderFunction;

    // amiiboData wordt gebruikt om alle info van amiibo bij te houden
    this.allAmiibo = [];

    firebaseInstance.amiiboCollection.onSnapshot((querySnapshot) => {
      this.amiiboData = firebaseInstance.convertQuerySnapshotToRegularArray(
        querySnapshot
      );
    });
  }

  // Per amiibo card laten we de eventlisteners zich verbinden
  bindEventsToAmiibo() {
    this.dataCache.forEach((data) => {
      const amiibo = new AmiiboCard(data);
      amiibo.bindEvents();
    });
  }

  // De specifieke amiibo op het scherm renderen
  renderAmiiboOnScreen(amiibo) {
    let htmlString = this.htmlElement.innerHTML;
    htmlString += amiibo.htmlString;
    this.htmlElement.innerHTML = htmlString;
  }

  // De amiibo die de gebruiker niet heeft renderen op het scherm
  renderUncheckedAmiibo() {
    console.log("rendering unchecked amiibo");
    this.checkedAmiibo = this.amiiboData.map((x) => x.id);
    this.dataCache = [];
    this.dataCache = this.allAmiibo.filter(
      (x) => !this.checkedAmiibo.includes(x.tail)
    );

    this.dataCache.forEach((x) => (x.checked = false));
    this.sort();
    this.render();
    document.getElementById(
      "itemCounter"
    ).innerText = `Need (${this.dataCache.length})`;
    this.rerenderFunction = this.renderUncheckedAmiibo;
  }

  // De amiibo die de gebruiker wel heeft renderen op het scherm
  renderCheckedAmiibo() {
    this.dataCache = [];
    this.checkedAmiibo = this.amiiboData.map((x) => x.id);
    if (!this.checkedAmiibo.length) {
      this.htmlElement.innerHTML = "There are no Amiibo in this section";
    }
    this.allAmiibo.forEach((x) => {
      if (this.checkedAmiibo.includes(x.tail)) {
        this.dataCache.push({ ...x, checked: true });
      }
    });
    this.sort();
    this.render();
    document.getElementById(
      "itemCounter"
    ).innerText = `Have (${this.dataCache.length})`;
    this.rerenderFunction = this.renderCheckedAmiibo;
  }

  // Alle amiibo renderen op het scherm
  renderAllAmiibo() {
    console.log("rendering all amiibo");
    this.dataCache = [];

    this.checkedAmiibo = this.amiiboData.map((x) => x.id);
    amiiboAPI.getAllAmiiboData().then((dataResponse) => {
      this.allAmiibo = dataResponse.amiibo;
      this.dataCache = this.allAmiibo;
      this.dataCache.forEach((x) => {
        if (this.checkedAmiibo.includes(x.tail)) {
          x.checked = true;
        } else {
          x.checked = false;
        }
      });
      this.sort();
      this.render();
      document.getElementById(
        "itemCounter"
      ).innerText = `All (${this.dataCache.length})`;
    });
    this.rerenderFunction = this.renderAllAmiibo;
  }

  // De datacache laten sorteren afhankelijk van welk sort er gebruikt wordt
  sort() {
    const select = document.getElementById("sort");
    const option = select.options[select.selectedIndex].text;
    this.dataCache = sorter.sort(this.dataCache, option);
    this.render();
  }

  // Het renderen van de amiibo die in de dataCache zitten
  render() {
    this.htmlElement.innerHTML = "";
    if (!this.dataCache.length) {
      this.htmlElement.innerHTML = "There are no Amiibo in this section";
    }
    this.dataCache.forEach((x) => {
      const a = new AmiiboCard(x);
      this.renderAmiiboOnScreen(a);
    });
    window.setTimeout(this.bindEventsToAmiibo.bind(this), 0);
  }
}

export const amiiboCards = new AmiiboCards();

// We wachten op de response van de firebase
window.setTimeout(amiiboCards.renderAllAmiibo.bind(amiiboCards), 500);
