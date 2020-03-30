function NavInit() {
<!-- DOM Elements Variable -->
    const linkHome = document.getElementById('nav-link-home');
    const linkLogin = document.getElementById('nav-link-login');
    const linkRegister = document.getElementById('nav-link-register');
    const linkPlay = document.getElementById('nav-link-play');
    const linkScoreboard = document.getElementById('nav-link-scoreboard');
    const linkProfile = document.getElementById('nav-link-profile');
    const linkLogout = document.getElementById('nav-link-logout');

    let foo=1;
    if(foo == 2){
        linkLogin.classList.add('d-none');
        linkRegister.classList.add('d-none');

        linkLogout.classList.remove('d-none');
        linkProfile.classList.remove('d-none');
        linkScoreboard.classList.remove('d-none');
        linkPlay.classList.remove('d-none');

    }
    else{
        linkLogin.classList.remove('d-none');
        linkRegister.classList.remove('d-none');

        linkLogout.classList.add('d-none');
        linkProfile.classList.add('d-none');
        linkScoreboard.classList.add('d-none');
        linkPlay.classList.add('d-none');
    }
}

