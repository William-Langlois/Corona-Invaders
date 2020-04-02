

    const ulList = document.getElementById('scoreslist');
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
            let precision = scores[k].precision;
            let score = scores[k].score;
            console.log(name, precision, score);
            let li = document.createElement ('li');
            li.innerHTML = (name + precision + score);
            ulList.appendChild(li);
            console.log(li)
        }
    }

    function errData(err) {
        console.log('Error!');
        console.log(err);
    }