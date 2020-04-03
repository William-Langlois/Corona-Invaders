function toggleSignIn() {
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have signed up with a different provider for that email.');
        } else {
            console.log(error);
        }
    });
    document.getElementById('githublogin').addEventListener('click', toggleSignIn, false);

    //Display logged with github if logged with github (obviously)
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById('githublogin').textContent = 'Logged with Github';
        }
    });

}
