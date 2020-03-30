function NavInit() {
<!-- DOM Elements Variable -->

    const linkHome = document.getElementById('nav-link-home');
    const linkLogin = document.getElementById('nav-link-login');
    const linkRegister = document.getElementById('nav-link-register');
    const linkPlay = document.getElementById('nav-link-play');
    const linkScoreboard = document.getElementById('nav-link-scoreboard');
    const linkProfile = document.getElementById('nav-link-profile');
    const linkLogout = document.getElementById('nav-link-logout');

    linkHome.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkHome.classList.add('nav-link-active')

    });
    linkRegister.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkRegister.classList.add('nav-link-active')
    });
    linkLogin.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkLogin.classList.add('nav-link-active')
        document.getElementById('id01').style.display='block'
    });
    linkPlay.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkPlay.classList.add('nav-link-active')
    });
    linkScoreboard.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkScoreboard.classList.add('nav-link-active')
    });
    linkProfile.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkProfile.classList.add('nav-link-active')
    });
    linkLogout.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkHome.classList.add('nav-link-active');
        linkPlay.classList.add('d-none');
        linkProfile.classList.add('d-none');
        linkScoreboard.classList.add('d-none');
        linkLogout.classList.add('d-none');
    });
}

