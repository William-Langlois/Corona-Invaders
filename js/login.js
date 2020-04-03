function loginInit() {
    //Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const btnLogout = document.getElementById('nav-link-logout');

    // Add login event
    btnLogin.addEventListener('click', e => {
        // Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // Logout
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add signup event
    btnRegister.addEventListener('click', e => {
        // Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {

        var linkLogin = document.getElementById('nav-link-login');
        var linkPlay = document.getElementById('nav-link-play');
        var linkScoreboard = document.getElementById('nav-link-scoreboard');
        var linkProfile = document.getElementById('nav-link-profile');
        var linkLogout = document.getElementById('nav-link-logout');

        if (firebaseUser) {
            console.log(firebaseUser);
            linkLogin.classList.add('d-none');
            linkPlay.classList.remove('d-none');
            linkScoreboard.classList.remove('d-none');
            linkProfile.classList.remove('d-none');
            linkLogout.classList.remove('d-none');
        } else {
            console.log('logged out');
            linkLogin.classList.remove('d-none');
            linkPlay.classList.add('d-none');
            linkScoreboard.classList.add('d-none');
            linkProfile.classList.add('d-none');
            linkLogout.classList.add('d-none');
        }
    });

    window.onclick = function (event) {
        if (event.target == document.getElementById('id01')) {
            closeLoginForm();
        }
    };

}

function closeLoginForm() {
    let modal = document.getElementById('id01');
    let linkHome = document.getElementById('nav-link-home');


    modal.style.display = "none";
    let lastActive = document.getElementsByClassName('nav-link-active');
    if (lastActive[0] != "") {
        lastActive[0].classList.remove('nav-link-active')
    }
    linkHome.classList.add('nav-link-active')
}


