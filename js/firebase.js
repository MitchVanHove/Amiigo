class Firebase {
  constructor(apiKey, projectId, storageBucket) {
    firebase.initializeApp({
      apiKey,
      projectId,
      storageBucket,
    });
    this.database = firebase.firestore();
    this.fileStorage = firebase.storage().ref();
  }
  convertQuerySnapshotToRegularArray(querySnapshot) {
    return querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
  }

  // Haalt alle amiibo van Firebase
  get amiiboCollection() {
    return this.database.collection("amiibo");
  }

  // Voegt amiibo toe aan Firebase
  addAmiibo(id) {
    this.amiiboCollection.doc(id).set({});
  }

  // Verwijdert amiibo van Firebase
  removeAmiibo(id) {
    this.amiiboCollection.doc(id).delete();
  }
}

// Maakt een instantie van de klasse om op andere plaatsen te gebruiken
export const firebaseInstance = new Firebase(
  "AIzaSyBiqoqbhrX-Xu2qZIHzlsVmlTcRaIQ77YA",
  "amiigo-aa4c1",
  "amiigo-aa4c1.appspot.com"
);
