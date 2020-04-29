import { firebaseInstance } from "./firebase.js";

import { AmiiboCard } from "./amiiboCard.js";

import { amiiboAPI } from "./amiiboAPI.js";

class AmiiboCards {
  constructor() {
    this.htmlElement = document.getElementById("amiiboCollection");
    this.amiiboCache = [];
  }

  render() {
    firebaseInstance.amiiboCollection.onSnapshot((querySnapshot) => {
      let htmlString = "";
      const amiiboData = firebaseInstance.convertQuerySnapshotToRegularArray(
        querySnapshot
      );
      amiiboData.sort(this.sortByTimeStamp);
      amiiboData.forEach((x) => {
        amiiboAPI
          .getAmiiboData(x.refID)
          .then((dataResponse) => {
            const object = dataResponse.amiibo[0];
            const a = new AmiiboCard(object);
            htmlString += a.htmlString;
            this.htmlElement.innerHTML = htmlString;
            return a;
          })
          .then((a) => this.amiiboCache.push(a))
          .then(console.log(this.amiiboCache));
      });
    });
  }
}
const amiiboCards = new AmiiboCards();
amiiboCards.render();
