import { amiiboCards } from "./amiiboCards.js";

class Navigation {
  bindEvents() {
    document
      .getElementById("allButton")
      .addEventListener("click", amiiboCards.renderAllAmiibo.bind(amiiboCards));
    document
      .getElementById("haveButton")
      .addEventListener(
        "click",
        amiiboCards.renderCheckedAmiibo.bind(amiiboCards)
      );
    document
      .getElementById("needButton")
      .addEventListener(
        "click",
        amiiboCards.renderUncheckedAmiibo.bind(amiiboCards)
      );
    document
      .getElementById("sort")
      .addEventListener("change", amiiboCards.sort.bind(amiiboCards));
  }
}

const navigation = new Navigation();
navigation.bindEvents();
