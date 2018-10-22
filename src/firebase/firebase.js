import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCk5tDQoEKwU6Nx9jkSfjOF1Y9_bXcK8Es",
    authDomain: "mapapp-f549d.firebaseapp.com",
    databaseURL: "https://mapapp-f549d.firebaseio.com",
    projectId: "mapapp-f549d",
    storageBucket: "mapapp-f549d.appspot.com",
    messagingSenderId: "666210709333"
  };

  firebase.initializeApp(config);
  export default firebase;

