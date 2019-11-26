import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    apiKey: "AIzaSyAV_OH28yZquK_PBlbI8gJE0ctqmpm8QgM",
    authDomain: "fir-x-react.firebaseapp.com",
    databaseURL: "https://fir-x-react.firebaseio.com",
    projectId: "fir-x-react",
    storageBucket: "fir-x-react.appspot.com",
    messagingSenderId: "454319770435",
    appId: "1:454319770435:web:9567facc2d3128b669bdf6",
    measurementId: "G-BDS2ZK1BNL"
  };
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;