
    //Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('nav-link-logout');
    const btnRegister = document.getElementById('btnRegister');

    // Add login event
    btnLogin.addEventListener('click', e => {
       // Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email,pass);
        promise.catch(e => console.log(e.message));
    });

    // Add signup event
    btnRegister.addEventListener('click', e => {
        // Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email,pass);
        promise.catch(e => console.log(e.message));
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
        }else {
            console.log('not logged in');
        }
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
};


