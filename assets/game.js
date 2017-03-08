
    "use strict";
    var availableLetters, words, guessInput, guess, 
    guessButton, lettersGuessed, lettersMatched, output,
     man, letters, lives, currentWord, numLettersMatched,
     usedArray, usedLtr, messages;

    function setup() {
        /* start config options */
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
        lives = 5;
        words = ["sonic", "tails", "rings", "genesis","robotnik","cartrdige"];
        messages = {
            win: 'You win!',
            lose: 'Game over!',
            guessed: ' already guessed, please try again...',
            validLetter: 'Please enter a letter from A-Z'
        };
        /* end config options */

        lettersGuessed = lettersMatched = '';
        numLettersMatched = 0;
        usedLtr = document.getElementById("guessedletters");
        usedArray = [];
        /* choose a word */
        currentWord = words[Math.floor(Math.random() * words.length)];

        /* make #man and #output blank, create vars for later access */
        output = document.getElementById("output");
        man = document.getElementById("livesleft");
        guessInput = document.onkeyup;

        man.innerHTML = 'You have ' + lives + ' lives remaining';
        output.innerHTML = '';

    
        /* set up display of letters in current word */
        letters = document.getElementById("blank");
        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }
        guessInput.value = '';
    }

    /* Start game - should ideally check for existing functions attached to window.onload */
    window.onload = setup;


    /* main guess function when user clicks #guess */
    document.onkeyup = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = e.key;
        /* does guess have a value? if yes continue, if no, error */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (availableLetters.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }
                /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    /* check to see if letter appears multiple times */
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    console.log(lettersGuessed);
                    usedLtr.innerHTML = lettersGuessed;
                    if (lives === 0) gameOver();
                }
            }
            /* not a valid letter, error */
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        /* no letter entered, error */
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
