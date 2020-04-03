function InitGame() {
    //Getting client's screen dimension
    var ClientScreenWidth = document.body.clientWidth;
    var ClientScreenHeight = document.body.clientHeight;

    //Sizing game window
    if (ClientScreenWidth <= 1920 && ClientScreenHeight <= 1200) {
        ScreenWidth = ClientScreenWidth;
        ScreenHeight = ClientScreenHeight;
    } else {
        if (ClientScreenWidth > 1920 && ClientScreenHeight > 1200) {
            ScreenWidth = 1920;
            ScreenHeight = 1200;
        } else {
            if (ClientScreenWidth > 1920) {
                ScreenWidth = 1920;
                ScreenHeight = ClientScreenHeight;
            }
            if (ClientScreenHeight > 1200) {
                ScreenWidth = ClientScreenWidth;
                ScreenHeight = 1200;
            }

        }

    }


    //game configuration
    var config = {
        type: Phaser.AUTO,
        width: ScreenWidth,
        height: ScreenHeight,
        parent: 'game-div',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 20},
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    };

    //initializing game
    var game = new Phaser.Game(config);

    //preloading game assets
    function preload() {
        //images
        this.load.image('background', 'resources/backgrounds/background2.jpg');
        this.load.image('virus1', 'resources/virus/virus1.png');
        this.load.image('ship1', localStorage.getItem('shipUrl'));
        this.load.image('bullet', 'resources/bullets/bullet1.png');
        this.load.image('planet', 'resources/planets/planet1.png');
        this.load.image('bottomCollider', 'resources/others/bottomCollider.jpg');

        //music
        this.load.audio('music', 'resources/musics/Deorro-Five_hours.mp3');

        //sound effects
        this.load.audio('gunshot', 'resources/sounds/gunshot.mp3');
        this.load.audio('splash', 'resources/sounds/splash.mp3');


    }

    //Initializing variable
    var background;
    var player;

    var virusGroup;
    var virus;
    var spawn_virus_speed;
    var timerVirus;
    var nb_virus = 0;

    var bulletGroup;
    var bullet;
    var cadence_tir;
    var nb_tir;
    var nb_tir_tt = 0;
    var shotFired = 0;

    var score = 0;
    var scoreText;

    var nb_kill = 0;
    var waveLvl = 1;

    var multiplier = 0;

    var planet_contamination = 0;
    var contamination_status_bar;

    var intro_terminated = 0;
    var gameOver = false;
    var gameWin = false;

    var score_added = false;

    //create game environment
    function create() {
        //background image position
        background = this.add.image(ScreenWidth / 2, ScreenHeight / 2, 'background');
        //planet position and scale
        planet = this.add.image(ScreenWidth / 2, ScreenHeight - ScreenHeight / 2, 'planet');
        planet.scale = 10;
        //creating a collider in the bottom of the screen ( where virus crash)
        bottomCollider = this.physics.add.image(ScreenWidth / 2, ScreenHeight + 2510, 'bottomCollider');
        //make the collider unsensible to the gravity
        bottomCollider.setGravityY(-20);

        //creating the player     :::::://///::::::
        //associating an image
        player = this.physics.add.image(0, 0, 'ship1');
        //unsensible to the gravity
        player.setGravityY(-20);
        //scale
        player.scale = 0.2;
        //position
        player.x = ScreenWidth / 2;
        player.y = ScreenHeight / 2;

        //creating the virus groupObject
        virusGroup = this.physics.add.group();
        //creating the bullet groupObject
        bulletGroup = this.physics.add.group();

        //display the contamination status
        contamination_status_bar = this.add.text(16, 16, 'Contamination |----------|', {
            fontSize: '35px',
            fill: '#fff'
        });
        //display the score
        scoreText = this.add.text(16, ScreenHeight - 56, 'Éliminations: 0', {fontSize: '35px', fill: '#fff'});

        //make cursor invisible
        this.input.setDefaultCursor('none');

        //initializing fire rate , virus spawn speed , music
        cadence_tir = 10;
        spawn_virus_speed = 100;
        game.sound.play('music');
        //positioning cursor
        game.input.mousePointer.x = ScreenWidth / 2;
        game.input.mousePointer.y = ScreenHeight - ScreenHeight / 2;
        //
        j = 0;
    }

    //get a random number between min and max
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function update() {
        //after the intro the game start
        if (intro_terminated == 2) {
            //rotation of the planet and moving background
            planet.rotation += 0.0005;
            planet.y = ScreenHeight + (ScreenHeight / 2) - (player.y / 50);
            planet.x = ScreenWidth / 2 - (player.x / 50);

            background.y = ScreenHeight / 2 - (player.y / 50);
            background.x = ScreenWidth / 2 - (player.x / 50);

            //player follow mouse cursor
            player.x = game.input.mousePointer.x;
            player.y = game.input.mousePointer.y;

            //if game is not finish
            if(gameOver == false) {
                //if the user 'click'
                if (game.input.mousePointer.isDown) {
                    //define the tik of the first shot at 0
                    if (firstShotTime == 0) {
                        //shot a bullet
                        shot(this);
                        //play the sound of a gunshot
                        game.sound.play('gunshot');

                        //the shot is fired => variable
                        shotFired = 1;
                        //count nb of shot in the game
                        nb_tir = 1;
                        nb_tir_tt++;
                    } else {
                        //reshot when the tik correspond to the fire rate
                        if (firstShotTime / cadence_tir == nb_tir) {
                            shot(this);
                            game.sound.play('gunshot');

                            nb_tir++;
                            let i = 0;
                            nb_tir_tt++;
                        }
                    }
                    firstShotTime++;
                } else {
                    //this part block player to shoot faster than the fire rate by clicking fast
                    if (shotFired == 1) {
                        if (timer / cadence_tir == 1) {
                            shotFired = 0;
                            timer = 0;
                            firstShotTime = 0;
                        }
                        timer++
                    } else {
                        firstShotTime = 0;
                        timer = 0;
                    }
                }
            }

            //create the first virus
            if (nb_virus == 0) {
                createVirus(this);
                //the number of virus spawn in this wave
                nb_virus = 1;
                //set the tik of the first spawn at 0
                timerVirus = 0;
            } else {
                //if the tik correspond to the virus spawn rate
                if (timerVirus / spawn_virus_speed == nb_virus) {
                    createVirus(this);
                    nb_virus++;
                }
                timerVirus++;
            }

            //define the different wave (difficulty)
            //by changing virus spawn rate according to the number of kill
            if (nb_kill == 10 && waveLvl == 1) {
                waveLvl++;

                spawn_virus_speed = 100;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 30 && waveLvl == 2) {
                waveLvl++;

                spawn_virus_speed = 90;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 50 && waveLvl == 3) {
                waveLvl++;

                spawn_virus_speed = 80;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 100 && waveLvl == 4) {
                waveLvl++;

                spawn_virus_speed = 70;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 200 && waveLvl == 5) {
                waveLvl++;

                spawn_virus_speed = 60;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 300 && waveLvl == 6) {
                waveLvl++;

                spawn_virus_speed = 50;
                nb_virus = 0;
                timerVirus = 0;

            }
            if (nb_kill == 400 && waveLvl == 7) {
                waveLvl++;

                spawn_virus_speed = 40;
                nb_virus = 0;
                timerVirus = 0;
            }
            //if the player kill 500 virus the game end with the status "win"
            if (nb_kill == 500) {
                if(gameWin ==false){
                    endGame('win');
                    gameWin =true;
                }
            }
        } else {
            //this part permit to make something between intro and the game start
            if (intro_terminated == 1) {
                intro_terminated = 2;
            } else {
                //the intro ( planet going back to make the impression that the ship is going up)
                j++;

                player.x = game.input.mousePointer.x;
                player.y = game.input.mousePointer.y;
                if (player.scale > 0.1) {
                    player.scale -= 0.0001
                }

                background.y = ScreenHeight / 2 - (player.y / 60);
                background.x = ScreenWidth / 2 - (player.x / 60);

                planet.x = ScreenWidth / 2 - (player.x / 60);
                planet.y = ScreenHeight - ScreenHeight / 2 - (player.y / 60) + j;

                planet.rotation += 0.0005;


                if (planet.scale >= 1) {
                    planet.scale -= 0.015;
                }
                if (planet.y >= ScreenHeight + (ScreenHeight / 2)) {
                    intro_terminated = 1;
                }
            }
        }
    }

    //function that create a virus
    function createVirus(vir) {
        //spawn the virus randomly on top of the game to make random horizontal position and speed
        virus = vir.physics.add.image(getRandom(50, ScreenWidth - 50), getRandom(-100, -1200), 'virus1');
        virus.scale = 0.1;
        virus.body.collideWorldBounds = true;
        virus.checkWorldBounds = true;
        virusGroup.add(virus);
        //set the collider with bullets , player , and planet(bottom collider)
        vir.physics.add.overlap(virus, player, virusHitPlayer, null, virus);
        vir.physics.add.overlap(bulletGroup, virus, bulletHitVirus, null, virus);
        vir.physics.add.overlap(virus, bottomCollider, virusHitPlanet, null, virus);

    }

    //function that make the ship shot a bullet
    function shot(bul) {
        //create the bullet where the ship is
        bullet = bul.physics.add.image(player.x, player.y, 'bullet');
        bullet.scale = 0.02;
        bullet.angle = 270;
        bulletGroup.add(bullet);
        bullet.setGravityY(-20);
        bullet.setVelocityY(-1000);
    }

    //if a bullet hit a virus
    function bulletHitVirus(Virus, Bullet) {
        //the bullet disapear
        Bullet.destroy();
        //if the virus is in game window (they spawn on top of it)
        if (Virus.y >= 0) {
            //the virus disapear
            Virus.destroy();
            //play a "scrouitch" sound
            game.sound.play('splash');
            //add 10 to the score
            score += 10;
            //add 1 to the number of kill
            nb_kill++;
            //update the text who display the number of elimination
            scoreText.setText('Éliminations : ' + nb_kill);
        }
    }

    //if a virus hit the planet
    function virusHitPlanet(Virus) {
        //the virus disapear
        Virus.destroy();
        //if the planet contamination is under 100 , add 10 to it
        if (planet_contamination < 100) {
            planet_contamination += 10;
        }
        //set the number od "X" in the status bar
        nb_contamination = planet_contamination / 10;
        //set the number of space missing in the status bar
        var space_missing = 10 - nb_contamination;
        //set the text variable
        var contamination_icon = '';
        //add "X"'s to the text variable
        for (let i = 0; i < nb_contamination; i++) {
            contamination_icon = contamination_icon + 'X';
        }
        //add the spaces to the text variable
        for (let i = 0; i < space_missing; i++) {
            contamination_icon = contamination_icon + '-';
        }
        //update the display
        contamination_status_bar.setText('Contamination |' + contamination_icon + '|');

        //if the contamination of the planet = 100
        if (planet_contamination >= 100) {
            //the game end with the status "defeat"
            if (gameOver == false) {
                endGame('defeat');
            }

        }
    }

    //if a virus it the player
    function virusHitPlayer(Virus) {
        //the game end with the status "defeat"
        endGame('defeat');
    }


    //when the game end
    function endGame(result) {
        //set the cursor visible
        game.input.setDefaultCursor('auto');
        //define the accuracy variable
        var accuracy = 0;
        //if at least one bullet as been shot
        if (nb_tir_tt > 0) {
            //the accuracy = at the kill number divided by the number of bullet shot
            accuracy = Math.round((nb_kill / nb_tir_tt) * 100);
        }
        //add accuracy/10 to the score multiplier
        multiplier += (accuracy / 10);

            //the game as ended with the "win" status
            if (result == 'win') {
                //increment multiplier according to the planet contamination
                multiplier += ((100 - planet_contamination) / 10);
            }

            //set the final score variable to score x multiplier
        var Final_Score = Math.round(score * multiplier);

            //if the game as ended with the status "defeat"
        if(result == 'defeat'){
            //the player disapear
            player.destroy();
            gameOver = true;
        }

        //initializing DOM object variable
        var endgame_Score = document.getElementById('endgame-score');
        var endgame_title = document.getElementById('endgame-title');

        var input_score = document.getElementById('input_score');
        var input_kill = document.getElementById('input_kill');
        var input_accuracy = document.getElementById('input_accuracy');
        var input_contamination = document.getElementById('input_contamination');

        //display "win" or "defeat"
        endgame_title.innerHTML = result;

        //display score, number of kill , accuracy , planet contamination
        input_score.value = Final_Score;
        input_kill.value=nb_kill;
        input_accuracy.value=accuracy;
        input_contamination.value=planet_contamination;

        //display the panel
        endgame_Score.classList.remove('d-none');
    }

    //set the event on the "retour au menu" and "enregistrer" button
    const btnRefresh = document.getElementById('endgame-score-refresh');
    const btnEndgame = document.getElementById('endgame-score-submit');

    btnEndgame.addEventListener('click', addScore);
    btnRefresh.addEventListener('click',RefreshPage);

    //push scores into Database if "enregistrer" is pressed
    function addScore(name, accuracy, score) {
        var input_name = document.getElementById('input_name');
        var input_accuracy = document.getElementById('input_accuracy');
        var input_score = document.getElementById('input_score');
        var database = firebase.database();
        var ref = database.ref('highscores');
        var data = {
            name: input_name.value,
            accuracy: input_accuracy.value,
            score: input_score.value,
        }
        if(score_added == false && input_name.value != ""){
            ref.push(data);
            score_added = true;
            btnEndgame.setAttribute('disabled','true');
        }
        else{
            if(input_name.value == ""){
                if(input_name.placeholder == ' Entrez votre pseudo'){
                    input_name.placeholder = '-Entrez votre pseudo-';
                }
                else{
                    if(input_name.placeholder == '-Entrez votre pseudo-'){
                        input_name.placeholder = ' Entrez votre pseudo';
                    }
                }
            }
        }
        console.log(data);
    };

    //refresh the page if "retour au menu" is pressed
    function RefreshPage(){
        window.location.reload();
    }







}