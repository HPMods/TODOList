import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyBwS4kNvMnefNYZwjDbKGwpMUTHGrZ45Ws",
  authDomain: "demo.firebaseapp.com",
  databaseURL: "https://fir-32f18.firebaseio.com",
  projectId: "fir-32f18"
};
firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
