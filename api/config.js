import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDz74naPU6uA55dE0gDWx2hxG_DYM9Wwyk",
  authDomain: "magic-spending-app.firebaseapp.com",
  databaseURL: "https://magic-spending-app.firebaseio.com",
  projectId: "magic-spending-app",
  storageBucket: "magic-spending-app.appspot.com",
  messagingSenderId: "920909774148",
  appId: "1:920909774148:web:ac7d9e446fe71934"
};

export const Firebase = firebase.initializeApp(firebaseConfig);
