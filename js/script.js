let minValue
let maxValue
let answerNumber
let orderNumber
let gameRun
const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
const minValueInput = document.querySelector('#inp-min');
const maxValueInput = document.querySelector('#inp-max');
const gameWindow = document.querySelector('#game-window');
const minValueWindow = document.querySelector('#min-value-window');
const maxValueWindow = document.querySelector('#max-value-window');
const alertWindow = document.querySelector('#alert-window');
const alertMin = document.querySelector('#alert-min');
const alertMax = document.querySelector('#alert-max');

toNine = ['0','один','два','три','четыре','пять','шесть','семь','восемь','девять'];
tens = ['','','двадцать','тридцать','сорок','пятдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
hundred = ['','сто','двести','триста','четыреста','пятсот','шестьсот','семьсот','восемьсот','девятьсот'];
exceptions = ['десять','одинадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'];
successPhrase = ['Я всегда угадываю \n\u{1F60E}', 'Проще простого! \n\u{1F601}', 'Это было легко! \n\u{1F60B}', 'Даже не напрягался...\n\u{1F618}', 'Попробуем еще раз?\n\u{1F609}'];
answerPhrase = ['Думаю это число ', 'Может быть число ', 'Вы загадали число ', 'Возможно это число', 'Предполагаю это число'];
errorPhrase = ['Вы загадали неправильное число! \n\u{1F914}', 'Я сдаюсь.. \n\u{1F92F}', 'Что-то пошло не так... \n\u{1F92A}', 'Вы точно поняли правила игры?\n\u{1F605}','Давай попробуем еще раз?\n\u{1F921}'];


function num2str() {
    let x;
    out = [];
    let answerNumberAbs = Math.abs(answerNumber);
    answerNumber === 0 ? out.push(toNine[0]) : false;
    answerNumber < 0 ? out.push('минус') : false;
    x = Math.floor(answerNumberAbs / 100);
    x >= 1 ? out.push(hundred[x]) : false;
    x = Math.floor((answerNumberAbs % 100) / 10);
    x > 1 ? out.push(tens[x]) : false;
    x = Math.floor(answerNumberAbs % 100);
    if (x >= 10 && x < 20) {
        out.push(exceptions[x - 10]);
    } else {
        x = Math.floor(answerNumberAbs % 10);
        x <= 9 && x != 0 ? out.push(toNine[x]) : false;
    }
    x = out.join(' ')
    return x.length > 20 ? answerNumber : x;
};

function startGame() {
    gameRun = true;
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `${phraseRandom(answerPhrase)} ${num2str()}?`;
};

function phraseRandom(arr) {
    let numberRandom = Math.round(Math.random() * 4);
    return arr[numberRandom]; 
};

document.querySelector('#btnRetry').addEventListener('click', function () {
    maxValueInput.value = '';
    minValueInput.value = '';
    gameWindow.classList.add("collapse");
    minValueWindow.classList.remove("collapse");
})

document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            answerField.innerText = phraseRandom(errorPhrase);
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `${phraseRandom(answerPhrase)} ${num2str()}?`;
        }
    }
})

document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            answerField.innerText = phraseRandom(errorPhrase);
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `${phraseRandom(answerPhrase)} ${num2str()}?`;
        }
    }
})

document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = phraseRandom(successPhrase);
        gameRun = false;
    }
})

document.querySelector('#button-min').addEventListener('click', (e) => {
    e.preventDefault();
    minValue = parseInt(minValueInput.value) || 0;
    minValue < -999 ? minValue = -1000 : false;
    minValueWindow.classList.add("collapse");
    maxValueWindow.classList.remove("collapse");
    alertMin.innerText = minValue;

})

document.querySelector('#button-max').addEventListener('click', (e) => {
    e.preventDefault();
    maxValue = parseInt(maxValueInput.value) || 100;
    maxValue > 999 ? maxValue = 1000 : false; 
    maxValueWindow.classList.add("collapse");
    alertWindow.classList.remove("collapse");
    alertMax.innerText = maxValue;
})

document.querySelector('#button-start').addEventListener('click', (e) => {
    e.preventDefault();
    alertWindow.classList.add("collapse");
    gameWindow.classList.remove("collapse");
    startGame();
})

