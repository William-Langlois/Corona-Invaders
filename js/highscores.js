    const namelist = document.getElementById('pname');
    const scorelist = document.getElementById('pscore');
    const accuracylist = document.getElementById('paccuracy');
    // init firebase
    const db = firebase.database();
    // Create references

    const ref = db.ref('highscores');
    ref.on('value', gotData, errData);

    function gotData(data) {
        console.log(data.val());
        const scores = data.val();
        const keys = Object.keys(scores);
        console.log(keys);
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            let name = scores[k].name;
            let accuracy = scores[k].accuracy;
            let score = scores[k].score;
            console.log(name, accuracy, score);
            let nameli = document.createElement ('li');
            let scoreli = document.createElement('li');
            let accuracyli = document.createElement('li');
            nameli.innerHTML = (name);
            scoreli.innerHTML = (score);
            accuracyli.innerHTML = (accuracy);
            namelist.appendChild(nameli);
            scorelist.appendChild(scoreli);
            accuracylist.appendChild(accuracyli);
            console.log(nameli)
        }


    }

    function errData(err) {
        console.log('Error!');
        console.log(err);
    }

    window.onclick = function (event) {
        if (event.target == document.getElementById('scoreboard')) {
            closeScoreboard();
        }
    };

    function closeScoreboard() {
        let modal = document.getElementById('scoreboard');
        let linkScoreboard = document.getElementById('nav-link-scoreboard');


        modal.style.display = "none";
        let lastActive = document.getElementsByClassName('nav-link-active');
        if (lastActive[0] != "") {
            lastActive[0].classList.remove('nav-link-active')
        }
        linkScoreboard.classList.add('nav-link-active')
    }