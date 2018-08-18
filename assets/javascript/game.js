// BEGINNING OF THE FUNCTION!

(function () {

    let alpha = [];
    let guessedAlpha = [];
    let correctGuessedAlpha = [];
    let guessCount = 6;
    let winCount = 0;
    let charChoices = ["Bob Belcher", "Linda Belcher", "Tina Belcher", "Gene Belcher", "Louise Belcher", "Jimmy Pesto", "Jimmy Jr", "Andy Pesto", "Ollie Pesto", "Mort", "Teddy", "Pocket Size Rudy"];
    let selectedChar = [];
    let charCodes = [];
    let correctGuess = false;
    let currentState = [];
    let gameOver = true;
    let charName = charChoices[Math.floor(Math.random() * charChoices.length)];
    let gameSet = true;
    
    charName = charName.toLowerCase();

    let nameLetters;

    // LOOP ALPHABET AT THE BOTTOM OF THE PAGE
    function createAlphabet() {
        for (let i = 0; i < 26; i++) {

            let newAnchor = document.createElement("a");
            newAnchor.innerHTML = (i + 10).toString(36).toUpperCase();
            newAnchor.setAttribute("class", ((i + 10).toString(36)));
            document.querySelector(".letters-to-guess").appendChild(newAnchor);
            alpha.push((i + 10).toString(36));
        }
    }

    document.body.onload = createAlphabet;

    // GAME START
    function startGame() {

        document.querySelector(".reset-game").style.display = 'none';

        document.querySelector(".main").style.display = 'none';

        for (let j = 0; j < charName.length; j++) {

            charCodes.push(charName.charCodeAt(j));

            nameLetters = document.createElement("span");

            //IF THE PERSON HITS THE SPACE BUTTON
            if (charName.charCodeAt(j) === 32) {

                nameLetters.innerHTML = " ";

            } else {

                nameLetters.innerHTML = "-";
                selectedChar.push(charName[j]);

            }

            //NON-ALPHA CHAR (SHOW THEM!)
            if (charName.charCodeAt(j) < 65) {

                nameLetters.innerHTML = charName.charAt(j);

            }

            nameLetters.setAttribute("class", "letter-" + charName.charAt(j));
            document.querySelector(".char-name").appendChild(nameLetters);
            gameOver = false;
        }

    } 

    //CORRECT GUESSED LETTERS: THE CHECK POINT! DO NOT TOUCH THIS!
    function checkLetter(letterToCheck) {

        for (let k = 0; k < charName.length; k++) {

            if (letterToCheck === charName.charAt(k) && gameOver === false) {

                let correctClass = document.body.querySelectorAll(".letter-" + letterToCheck);

                for (let l = 0; l < correctClass.length; l++) {

                    correctClass[l].innerHTML = letterToCheck;

                }

                correctGuess = true;

                correctGuessedAlpha.push(letterToCheck);

    // GAME OVER: THE CHECK POINT! DON NOT TOUCH THIS!
                let childTitles = document.querySelector(".char-name").children;

                for (let m = 0; m < childTitles.length; m++) {

                    currentState.splice(m, 1, childTitles[m].innerHTML);

                }

                if ((currentState.indexOf("-")) === -1 && (gameOver === false)) {
                    // WIN COUNT!
                    winCount++
                    document.querySelector(".win-count").innerHTML = winCount;
                    document.querySelector(".instructions").style.display = 'none';
                    document.querySelector(".already-guessed").style.display = 'none';
                    document.querySelector(".already-guessed").style.visibility = 'hidden';
                    document.querySelector(".result").innerHTML = "YOU WIN!";
                    document.querySelector(".result").style.visibility = 'visible';
                    document.querySelector(".result").style.display = 'block';
                    document.querySelector(".reset-game").style.display = 'block';
                    document.querySelector(".reset-game").innerHTML = "Play Again";
                    document.querySelector(".char-name").innerHTML = charName;
                    gameOver = true;
                    gameSet = false;
                }
            }
        } 
    } 

    //IF LETTER HAS BEEN GUESSED: CHECK POINT!!! DONT MOVE THIS!
    function isLetterGuessed(letterGuessed) {

        if (gameOver === false) {

            if ((alpha.indexOf(letterGuessed) === -1) && (guessedAlpha.indexOf(letterGuessed) === -1)) {} else if ((alpha.indexOf(letterGuessed) === -1)) {

                document.querySelector(".instructions").style.display = 'none';
                document.querySelector(".result").style.display = 'none';
                document.querySelector(".result").style.visibility = 'hidden';
                document.querySelector(".already-guessed").innerHTML = letterGuessed.toUpperCase() + " already guessed!";
                document.querySelector(".already-guessed").style.display = 'block';
                document.querySelector(".already-guessed").style.visibility = 'visible';

            } else {

                let guess = alpha.splice(alpha.indexOf(letterGuessed), 1);
                guess = guess.join();
                guessedAlpha.push(guess);

            }


            if (correctGuess === false) {

                guessCount--
                document.querySelector(".guess-counter").innerHTML = guessCount;

                if (guessCount < 1) {

                    document.querySelector(".instructions").style.display = 'none';
                    document.querySelector(".already-guessed").style.display = 'none';
                    document.querySelector(".already-guessed").style.visibility = 'hidden';
                    document.querySelector(".result").innerHTML = "GAME OVER";
                    document.querySelector(".result").style.display = 'block';
                    document.querySelector(".result").style.visibility = 'visible';
                    document.querySelector(".reset-game").style.display = 'block';
                    document.querySelector(".reset-game").innerHTML = "Play Again";
                    document.querySelector(".char-name").innerHTML = charName;
                    gameOver = true;
                    gameSet = false;
                }

            } else {

                correctGuess = false;

            }

            let timingFunction = setTimeout(function () {

                document.querySelector(".already-guessed").style.display = 'none';
                document.querySelector(".already-guessed").style.visibility = 'hidden';

            }, 2000);
        }
    } 

                 //LETTER REMOVAL!
    function removeLetters(lettersToRemove) {

        if (alpha.indexOf(lettersToRemove) === -1) {

            document.querySelector("." + lettersToRemove).innerHTML = "-";
        }
    };

    let keyFunction = function (event) {

        //STARTGAME RUN
        if (gameOver === true && gameSet === true) {

            startGame();

        };

        if (gameOver === false && gameSet === true && event.key.charCodeAt(0) >= 97 && event.key.charCodeAt(0) <= 122) {

            checkLetter(event.key);

            isLetterGuessed(event.key);

            removeLetters(event.key);
        }
    }

    document.onkeydown = keyFunction;

    let clickFunction = function (event) {

       
        if (gameOver === true && gameSet === true) {

            startGame();

        }

        if (gameOver === false && gameSet === true && event.target.classList[0] && event.target.classList[0].length === 1 && event.target.classList[0].charCodeAt(0) >= 97 && event.target.classList[0].charCodeAt(0) <= 122) {

            checkLetter(event.target.classList[0].toLowerCase());

            isLetterGuessed(event.target.classList[0].toLowerCase());

            removeLetters(event.target.classList[0].toLowerCase());
        }
    } 

    document.onclick = clickFunction;

    function resetVar() {

        alpha = [];
        guessedAlpha = [];
        correctGuessedAlpha = [];
        guessCount = 7;
        selectedChar = [];
        charCodes = [];
        currentState = [];
        correctGuess = false;
        gameSet = true;

    };

    function hideRemove() {

        document.querySelector(".result").style.display = 'none';
        document.querySelector(".result").style.visibility = 'hidden';
        document.querySelector(".already-guessed").style.display = 'none';
        document.querySelector(".already-guessed").style.visibility = 'hidden';
        document.querySelector(".reset-game").style.display = 'none';
        var lettersToClear = document.querySelector(".letters-to-guess");

        while (lettersToClear.firstChild) {

            lettersToClear.removeChild(lettersToClear.firstChild);

        };

        let nameToClear = document.querySelector(".char-name");

        while (nameToClear.firstChild) {

            nameToClear.removeChild(nameToClear.firstChild);

        };

    };

    function showAdd() {

        document.querySelector(".instructions").style.display = 'block';
        document.querySelector(".main").style.display = 'block';
        createAlphabet();
        charName = charChoices[Math.floor(Math.random() * charChoices.length)];
        charName = charName.toLowerCase();

    };


    function resetGame() { 
        resetVar();
        hideRemove();
        showAdd();

    };

// ------------------------------//
// ATTENTION!!
// ------------------------------//


}()) // /function