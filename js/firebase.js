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
  get amiiboCollection() {
    return this.database.collection("amiibo");
  }

  addAmiibo(id) {
    this.amiiboCollection.doc(id).set({});
  }

  removeAmiibo(id) {
    this.amiiboCollection.doc(id).delete();
  }
}

export const firebaseInstance = new Firebase(
  "AIzaSyBiqoqbhrX-Xu2qZIHzlsVmlTcRaIQ77YA",
  "amiigo-aa4c1",
  "amiigo-aa4c1.appspot.com"
);
