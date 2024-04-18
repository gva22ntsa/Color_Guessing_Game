const colorsEasy = ['red', 'blue', 'yellow', 'green'];
const colorsMedium = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
const colorsHard = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink', 'brown'];

let correctColor = '';
let correctCount = 0;
let incorrectCount = 0;
let round = 'easy'; 
const maxCorrectEasy = 5; 
const maxCorrectMedium = 8; 
const maxCorrectHard = 14; 

let colorPool = [];

function generateColor(difficulty) {
    switch (difficulty) {
        case 'easy':
            colorPool = colorsEasy.slice(0);
            break;
        case 'medium':
            colorPool = colorsMedium.slice(0);
            break;
        case 'hard':
            colorPool = colorsHard.slice(0);
            break;
        default:
            colorPool = colorsEasy.slice(0);
            break;
    }

    const randomIndex = Math.floor(Math.random() * colorPool.length);
    correctColor = colorPool[randomIndex];
    document.getElementById('colorBox').style.backgroundColor = correctColor;

    const colorOptionsHTML = colorPool.map(color => `<div class="colorOption" style="background-color: ${color}" onclick="checkColor('${color}')"></div>`).join('');
    document.getElementById('colorOptions').innerHTML = colorOptionsHTML;


    document.getElementById('result').textContent = '';
}

function checkColor(selectedColor) {
    const resultDiv = document.getElementById('result');
    if (selectedColor === correctColor) {
        resultDiv.textContent = 'Correct!';
        correctCount++;
        if (round === 'easy' && correctCount >= maxCorrectEasy) {
            round = 'medium'; // გადავიდეს საშუალო რაუნდში 
            correctCount = 0;
        } else if (round === 'medium' && correctCount >= maxCorrectMedium) {
            round = 'hard'; //გადავიდეს რთულ რაუნდში
            correctCount = 0; 
        } else if (round === 'hard' && correctCount >= maxCorrectHard) {
            //გამოიტანოს თამაშის დასრულების მესიჯი
            document.getElementById('colorContainer').style.display = 'none';
            document.getElementById('gameOverMsg').style.display = 'block';
            resultDiv.textContent = ''; 
        }
    } else {
        resultDiv.textContent = 'Incorrect!';
        incorrectCount++;
    }
    updateScore();
}

function updateScore() {
    document.getElementById('correctCount').textContent = `Correct: ${correctCount}`;
    document.getElementById('incorrectCount').textContent = `Incorrect: ${incorrectCount}`;
}

document.querySelectorAll('.difficulty').forEach(difficulty => {
    difficulty.addEventListener('click', () => {
        generateColor(difficulty.id);
        document.getElementById('colorContainer').style.display = 'block';
    });
});

document.getElementById('nextColorBtn').addEventListener('click', () => {
    generateColor(round); 
});

document.getElementById('startOverBtn').addEventListener('click', () => {
    round = 'easy'; 
    correctCount = 0; 
    incorrectCount = 0; 
    generateColor(round); // თამაში დაიწყოს ისევ თავიდან
    document.getElementById('colorContainer').style.display = 'block';
    document.getElementById('gameOverMsg').style.display = 'none';
    updateScore();
});

generateColor('easy'); 
