function start(){
var words = ["sonic", "rings","tails","sega", "genesis","cartridge"];
var word = words[Math.floor(Math.random()*words.length)];
console.log(word);
var answerArray = [];
var blanks = document.getElementById('blank');
var wrongltr = document.getElementById('wrongLetters');
		for (var i = 0; i < word.length; i++);{
			answerArray[i] = "";
		}
	var remainingLetters = word.length;
	blanks.innerHTML = answerArray.join(" _ ");
  
document.onkeyup = function(keypress){
        var guess = keypress.key;
        for (var j = 0; j < word.length; j++) {

          if (word[j] === guess) {

            answerArray[i] = guess;

            remainingLetters--;
            console.log(remainingLetters);
          }
        }
    }
}

window.onload = start;
