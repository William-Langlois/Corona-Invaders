function NavInit() {
<!-- DOM Elements Variable -->

    var linkHome = document.getElementById('nav-link-home');
    var linkLogin = document.getElementById('nav-link-login');
    var linkPlay = document.getElementById('nav-link-play');
    var linkScoreboard = document.getElementById('nav-link-scoreboard');
    var linkProfile = document.getElementById('nav-link-profile');
    var linkLogout = document.getElementById('nav-link-logout');

    linkHome.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkHome.classList.add('nav-link-active');
        document.location.reload(true);
        document.getElementById('scoreboard').style.display='none';
    });

    linkLogin.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkLogin.classList.add('nav-link-active');
        document.getElementById('id01').style.display='block';
        document.getElementById('scoreboard').style.display='none';
    });

    linkPlay.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkPlay.classList.add('nav-link-active');
        document.getElementById('Planet-Container').classList.add('d-none');
        document.getElementById('coroned-navbar').classList.add('d-none');
        document.getElementById('scoreboard').style.display='none';

        InitGame();
    });

    linkScoreboard.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkScoreboard.classList.add('nav-link-active');
        document.getElementById('scoreboard').style.display='block'
    });

    linkProfile.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkProfile.classList.add('nav-link-active');
        document.getElementById('scoreboard').style.display='none';
    });

    linkLogout.addEventListener('click',function () {
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != ""){
            lastActive[0].classList.remove('nav-link-active')
        }
        linkHome.classList.add('nav-link-active');
        document.getElementById('scoreboard').style.display='none';
    });

}


