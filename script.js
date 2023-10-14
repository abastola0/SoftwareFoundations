const charDisplay = document.getElementById('char-display');
const resultDisplay = document.getElementById('result-display');
const windowTitle = document.getElementById('window-title');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
let history = ['', '', ''];
const characters = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐔", "🐧", "🦆", "🦉", "🦇", "🦅", "🦋"];

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

function closeInstructions() {
    var modal = document.getElementById("instructions");
    modal.style.display = "none";
}