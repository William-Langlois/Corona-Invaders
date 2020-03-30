function Init(){
    NavInit();

    const firebaseConfig = {
        apiKey: "AIzaSyBnBa-76xV5FN_pD6Rg-27Ad0bm3q3rYvQ",
        authDomain: "corona-invaders.firebaseapp.com",
        databaseURL: "https://corona-invaders.firebaseio.com",
        projectId: "corona-invaders",
        storageBucket: "corona-invaders.appspot.com",
        messagingSenderId: "638389868093",
        appId: "1:638389868093:web:23b50412f9e44b89da3c54",
        measurementId: "G-HYRT2KCPF9"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

}
