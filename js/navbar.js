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
        closeProfile();
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
        document.getElementById('profile-panel').classList.remove('d-none');
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

    window.addEventListener('click', function event(event) {
        console.log(event.target);
        var body = document.getElementsByTagName('body')[0];
        var planet = document.getElementById('Planet');
        var planetContainer = document.getElementById('Planet-Container');
        var navbar = document.getElementById('coroned-navbar-ul');

        if (event.target == body || event.target == planet || event.target == planetContainer || event.target == navbar){
            closeProfile();
        }
    });

}


function closeProfile() {
    console.log('fermer');

    let profile= document.getElementById('profile-panel');
    profile.classList.add('d-none');

    let lastActive = document.getElementsByClassName('nav-link-active');
    if (lastActive[0] != "") {
        lastActive[0].classList.remove('nav-link-active')
    }
    document.getElementById('nav-link-home').classList.add('nav-link-active')
}

