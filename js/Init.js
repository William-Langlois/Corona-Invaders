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

//Initialize mulitple website functions
function Init(){
    var actualShip = localStorage.getItem('shipUrl');
    if(actualShip == null){
        localStorage.setItem('shipUrl','resources/ships/ship1.png')
    }
    console.log(actualShip);
    NavInit();
    loginInit();
}
//Login with GitHub
function githublogin() {
    toggleSignIn();
}
//Logout with GitHub
function githublogout() {
    toggleSignOut();
}
function changeShipImage(url) {
    localStorage.clear();
    localStorage.setItem('shipUrl',url)
}
