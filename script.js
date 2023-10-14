const charDisplay = document.getElementById('char-display');
const resultDisplay = document.getElementById('result-display');
let history = ['', ''];
const characters = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐔", "🐧", "🦆", "🦉", "🦇", "🦅", "🦋"];



function getRandomChar() {
    //let randomIndex = Math.floor(Math.random() * characters.length);
    //randomIndex = characters.length%randomIndex;
    //return characters[randomIndex];
    window_size = 5;
    start = i % characters.length;
    end = (i + window_size) % characters.length;

    if (start < end){
        let window = characters.slice(start, end);
    }

    else{
         window = input_string[start:] + input_string[:end]
    }
            
    i += 1;
    let randomIndex = Math.floor(Math.random() * window.length);
    randomIndex = window.length%randomIndex;
    return window[randomIndex];
}

function checkMatch(userSaidYes) {
    const isMatch = history[0] === history[1];
    if (userSaidYes === isMatch) {
        resultDisplay.textContent = 'Correct!';
        resultDisplay.style.color = 'green';
    } else {
        resultDisplay.textContent = 'Wrong!';
        resultDisplay.style.color = 'red';
    }
    nextCharacter();
}

function nextCharacter() {
    const newChar = getRandomChar();
    charDisplay.textContent = newChar;
    history[0] = history[1];
    history[1] = newChar;
}

nextCharacter(); // Start the game with the first character

