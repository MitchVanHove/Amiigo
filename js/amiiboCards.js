import { firebaseInstance } from "./firebase.js";
import { AmiiboCard } from "./amiiboCard.js";
import { amiiboAPI } from "./amiiboAPI.js";
import { sorter } from "./sorter.js";

class AmiiboCards {
  constructor() {
    this.htmlElement = document.getElementById("amiiboCollection");
    this.dataCache = [];
    this.checkedAmiibo = [];
    this.amiiboData = [];
    this.rerenderFunction;
    this.allAmiibo = [];

    firebaseInstance.amiiboCollection.onSnapshot((querySnapshot) => {
      this.amiiboData = firebaseInstance.convertQuerySnapshotToRegularArray(
        querySnapshot
      );
    });
  }

  bindEventsToAmiibo() {
    this.dataCache.forEach((data) => {
      const amiibo = new AmiiboCard(data);
      amiibo.bindEvents();
    });
  }

  renderAmiiboOnScreen(amiibo) {
    let htmlString = this.htmlElement.innerHTML;
    htmlString += amiibo.htmlString;
    this.htmlElement.innerHTML = htmlString;
  }

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

  sort() {
    const select = document.getElementById("sort");
    const option = select.options[select.selectedIndex].text;
    this.dataCache = sorter.sort(this.dataCache, option);
    this.render();
  }

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
window.setTimeout(amiiboCards.renderAllAmiibo.bind(amiiboCards), 500); // We wachten op de response van de firebase
