const charDisplay = document.getElementById('char-display');
const resultDisplay = document.getElementById('result-display');
const windowTitle = document.getElementById('window-title');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');

const timeBar = document.getElementById('time-bar');
let timer;

let history = ['', '', ''];
const characters = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐔", "🐧", "🦆", "🦉", "🦇", "🦅", "🦋"];
let speed = 0;
let i = 0;
let flag = 0;
const window_size = 2;
let record = {
    "correct": 0, 
    "incorrect": 0
}

function getRandomChar() {
    //let randomIndex = Math.floor(Math.random() * characters.length);
    //randomIndex = characters.length%randomIndex;
    //return characters[randomIndex];
    let window;
    start = i % characters.length;
    end = (i + window_size) % characters.length;

    window = characters.slice(start, end);
    if (flag==2) {
        i += 1;
    }
          
    //let randomIndex = Math.floor(Math.random() * window.length);
    let randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;

    console.log(start + " to " + end);
    return characters[randomIndex];
}

function checkMatch(userSaidYes) {
    const isMatch = history[0] === history[2];
    if (userSaidYes === isMatch) {
        record.correct+=1;
        resultDisplay.textContent = 'Correct!';
        resultDisplay.style.color = 'green';
        flag = 0;
    } else {
        record.incorrect+=1;
        resultDisplay.textContent = 'Wrong!';
        resultDisplay.style.color = 'red';
        flag +=1;
    }

    correctCount.textContent = "Correct: " + record.correct;
    incorrectCount.textContent = "Incorrect: " + record.incorrect;
    clearInterval(timer);
    startTimer();
    nextCharacter();
}

function nextCharacter() {
    const newChar = getRandomChar();
    charDisplay.textContent = newChar;
    history[0] = history[1];
    history[1] = history[2];
    history[2] = newChar;
}

nextCharacter(); // Start the game with the first character


//close instruction pop up
function closeInstructions() {
    var modal = document.getElementById("instructions");
    modal.style.display = "none";
}


//decreases timer
function decreaseTime() {
    const currentWidth = parseFloat(timeBar.style.width);
    if (currentWidth > 0) {
        timeBar.style.width = (currentWidth - 0.1) + '%'; // Decrease by 0.1% per interval. Makes it smoother
    } 
    else {
        //checkMatch will clear current timer and start new one
        checkMatch(); //add to incorrect when timer runs out and move on 
    
    }
  }

  //starts timer 
  function startTimer() {
  
    // Reset the time bar
    timeBar.style.width = '100%';
  
    timer = setInterval(decreaseTime, speed); //will adjust interval every [speed] seconds
  }


// handles difficulty form submission
document.getElementById("difficulty").addEventListener("submit", function(event) {
    
    event.preventDefault();


    var selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');

    if (selectedDifficulty) {
        // Close window and record difficulty lvl
        closeInstructions();

        if(selectedDifficulty.value === "Easy") {
            speed = 15; //timer will be 15 seconds
        }
        else if(selectedDifficulty.value === "Medium") {
            speed = 7; //7 seconds
        }
        else if(selectedDifficulty.value === "Hard") {
            speed = 3; //3 seconds
        }
        
        //starts timer 
        startTimer();
    }
});


