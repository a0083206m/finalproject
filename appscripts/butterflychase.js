require(
    [],
    function() {

        console.log("yo, I'm alive!");
        var i1 = document.getElementById("i1");
        var i2 = document.getElementById("i2");
        var i3 = document.getElementById("i3");
        var i4 = document.getElementById("i4"); //DOM recalling the four quadrants//

        var a1 = document.getElementById("a1");
        var a2 = document.getElementById("a2");
        var a3 = document.getElementById("a3");
        var a4 = document.getElementById("a4"); //DOM recalling audio files
        var gamesound = document.getElementById("tiptoe");

        var startbutton = document.getElementById("theButton"); //DOM recalling start button

        var gameround = document.getElementById("gameround"); //DOM recall the words "Round: []"

        var clickspace = document.getElementById("clickspace"); //DOM recalling the overlay rectangle

        clickspace.style.visibility="hidden"; //this clickspace is a big rectangle overlaid over everything to disable user clicks (When sequence is playing AND when game is over(player lost))

        sequence =[];
        playersequence=[]; //setting both sequence and playersequence arrays to empty
        i=0; //setting round to 0
        gamesound.play(); //plays background music for game

        var p1 = function() { //this is for the first quadrant
            a1.play();
            i1.src = "css/1c.png";
            i1.style.opacity = "0.5";
            setTimeout(function() {
                i1.style.opacity = "1";
                i1.src = "css/1.png";
            }, 250);
            };

        var p2 = function() { //this is for the second quadrant
            a2.play(); //plays a2 sound
            i2.src = "css/2c.png"; //changes quadrant image to feedback image
            i2.style.opacity = "0.5"; //changes opacity to 0.5 (to make the quadrant seem to light up)
            setTimeout(function() { //executes function after 250ms
                i2.style.opacity = "1"; //changes opacity back to 1 after 250ms
                i2.src = "css/2.png"; //changes image back to original after 250ms
            }, 250);
            };

        var p3 = function() { //this is for the third quadrant
            a3.play();
            i3.src = "css/3c.png";
            i3.style.opacity = "0.5";
            setTimeout(function() {
                i3.style.opacity = "1";
                i3.src = "css/3.png";
            }, 250);
            };

        var p4 = function() { //this is for the fourth quadrant
            a4.play();
            i4.src = "css/4c.png";
            i4.style.opacity = "0.5";
            setTimeout(function() {
                i4.style.opacity = "1";
                i4.src = "css/4.png";
            }, 250);
            };

        activateBoard = function(){
            console.log("activated board");
            clickspace.style.visibility="hidden"; //hides the clickspace layer ontop so that gameboard is clickable

            }

        activateislands = function(){

            i1.addEventListener("click", function(){ //lets quadrant 1 listen for user click
            p1(); //executes function p1
            playersequence.push("1"); //pushes 1 intp playersequence array
            registerClick(); //executes function resgisterClick()
            });

            i2.addEventListener("click", function(){ //lets quadrant 2 listen for user click
            p2();
            playersequence.push("2");
            registerClick();
            });

            i3.addEventListener("click", function(){ //lets quadrant 3 listen for user click
            p3();
            playersequence.push("3");
            registerClick();
            });

            i4.addEventListener("click", function(){ //lets quadrant 4 listen for user click
            p4();
            playersequence.push("4");
            registerClick();
            })
            }

        deactivateBoard = function(){
            clickspace.style.visibility="visible"; //this overlays the clickspace layer ontop of the gameboard to take the clicks so that gameboard will not receive any clicks and be "deactivated"
            }


    theButton.addEventListener("click",function(){ //lets start button listen for user click to start game by executing startGame function
        startGame();
        })

    var startGame = function(){ //executes startGame function
            activateislands(); //lets quadrants listen for clicks
            deactivateBoard(); //removes clickspace overlay to allow user to click quadrants
            sequence=[]; //declaring sequence array as empty
            playersequence=[]; //declaring playersequence as empty
            i=0; //declaring i to be 0
            gameround.innerHTML="Round: "+i+""; //Changes the round's text to correspond to i. 
            newRound(); //executes newRound function
            startbutton.style.visibility="hidden"; //When start button is clicked, this hides the start button so that user can't cick on it once game begins

            }

        var newRound = function(){
            i++ //adds 1 to i each time newRound is called
            if(i>=9){confirm("You caught the butterfly! Let's head back to the village..."); //This gives a pop up window if the player has successfully completed 8 rounds
            window.location.href = "12d_L.html";}; //If player has successfully completed 8 rounds, the player gets navigated to the next page (successful ending)
            playersequence=[]; //clears the playersequence array
            console.log("Round "+i+""); //tells myself what round it is
            gameround.innerHTML="Round: "+i+""; //Changes the round's text to correspond to i so that player can see what round it is
            sequence.push(randomNumber()); //pushes a random number from 1-4 (using randomNumber function) into the sequence array
            deactivateBoard(); //disables player from clicking the quadrants by placing an overlay ontop of it
            animate(sequence); //animates the quadrants in the sequence of the sequence array
            console.log("sequence is "+sequence+""); //for checking the sequence
            activateBoard(); //removes the overlay to let players click the quadrants again
            };


        var animate = function(sequence){ //animate function takes sequence array as argument
            i=0; 
            var interval = setInterval(function(){
                litup(i); //calls the litup function within the interval function every 500mx

                i++; //adds 1 to i every 500ms
                if (i>=sequence.length){
                    clearInterval(interval); //if i exceeds the sequence's length, the interval will stop
                }
                },500); //the interval time. The function will keep running every 500ms until condition is satisfied
                };

        var checkLose = function(){ //checkLose function checks if the player has followed the sequence coorectly or not
            if (playersequence.toString()==sequence.toString()){ //as the numbers in both arrays cannot be compared to each other using "==" operators, they are converted to strings and then compared
                    setTimeout(newRound,1000); //if player successfully completes the sequence, waits 1s before new round starts
                    playersequence=[]; //clears player sequence array for new round to start
                } else { //if player loses
                        deactivateBoard(); //disables players from clicking the quadrants
                        startbutton.style.visibility="visible"; //show start button again
                        i=0;
                        gameround.innerHTML="Round: "+i+""; //resets the round back to show "Round 0"
                        confirm("Oops! You lost track of the butterfly!"); //pop up message if the player has lost the game, 
                        window.location.href = "12a_L.html"; //and this navigates to the next page (bad ending)
                        };
                        }


        var registerClick = function(e){ //registerClick function takes e as argument, enables the player to input sequence,

            if (playersequence.length == sequence.length){ //if player has finished input equals to the sequence,
                checkLose(); //checkLose is called to check if player has won or lost

            } else {console.log("wait....")};

            }



        var litup = function(i){ //this enables the quadrants to light up according to the sequence array
            if (sequence[i] === 1){ //if the sequence element is 1, it lights up the corresponding first quadrant by calling p1
                p1()}
            if (sequence[i] === 2){ //if the sequence element is 2, it lights up the corresponding first quadrant by calling p2
                p2()}
            if (sequence[i] === 3){ //if the sequence element is 3, it lights up the corresponding first quadrant by calling p3
                p3()}
            if (sequence[i] === 4){ //if the sequence element is 4, it lights up the corresponding first quadrant by calling p4
                p4()}
            
            }
     


        var randomNumber = function() {
            return Math.floor((Math.random() * 4) + 1); //randomNumber function returns a randomly generated number from 1 to 4
            }



    });