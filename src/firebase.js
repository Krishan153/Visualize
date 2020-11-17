import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyC6OvuLnUgZWj4Vfl_Hoc71i5v9Z5otjfE",
        authDomain: "visualize-32d23.firebaseapp.com",
        databaseURL: "https://visualize-32d23.firebaseio.com",
        projectId: "visualize-32d23",
        storageBucket: "visualize-32d23.appspot.com",
        messagingSenderId: "697438576928",
        appId: "1:697438576928:web:b6f7131f3d313a7bdeb745",
        measurementId: "G-59W0FDDQL2"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
  