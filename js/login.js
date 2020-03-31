(function () {

    // Initialise Firebase
    const config = {
        apiKey: "AIzaSyBnBa-76xV5FN_pD6Rg-27Ad0bm3q3rYvQ",
        authDomain: "corona-invaders.firebaseapp.com",
        databaseURL: "https://corona-invaders.firebaseio.com",
        projectId: "corona-invaders",
        storageBucket: "corona-invaders.appspot.com",
        messagingSenderId: "638389868093",
        appId: "1:638389868093:web:23b50412f9e44b89da3c54",
        measurementId: "G-HYRT2KCPF9"
    };
    firebase.initializeApp(config);

    //Get elements
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("nav-link-logout");



});




// Get the modal
const modal = document.getElementById('id01');
const linkHome = document.getElementById('nav-link-home');
const closeLoginFormIcon = document.getElementById('close-login-form-icon');

function closeLoginForm() {
    modal.style.display = "none";
    let lastActive = document.getElementsByClassName('nav-link-active');
    if (lastActive[0] != ""){
        lastActive[0].classList.remove('nav-link-active')
    }
    linkHome.classList.add('nav-link-active')
}
//When the user click on the icon to close the modal
closeLoginFormIcon.addEventListener('click',function () {
    closeLoginForm();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeLoginForm();
    }
}



function validation() {
    var username = document.getElementById("uname").value;
    var password = document.getElementById("psw").value;

}
const auth = firebase.auth();
auth.signInWithEmailAndPassword(email, pass);
auth.createUserWithEmailAndPassword(email,pass);
auth.onAuthStateChanged(firebaseUser =>{});