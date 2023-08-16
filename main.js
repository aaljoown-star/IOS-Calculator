

const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.input-screen span');
const signs = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (e) => {
    let atr = e.target.getAttribute('value');
    if (isFirstValue === false) {
      getFirstValue(atr)
    }
    if(isSecondValue === false) {
      getSecondValue(atr)
    }
  });
}

function getFirstValue(el) {
  result.innerHTML = "";
  firstValue += el;
  firstValue = +firstValue;
  result.innerHTML = formatNumber(firstValue);
}

function getSecondValue(el) {
  if (firstValue !== "" && sign !== "") {
    secondValue += el;
    secondValue = +secondValue;
    result.innerHTML = formatNumber(secondValue);
  }
}

function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener('click', (e) => {
      sign = e.target.getAttribute('value');
      isFirstValue = true;
    })
  }
}
getSign();

equals.addEventListener('click', () => {
  result.innerHTML = "";
  if (sign === "+") {
    resultValue = firstValue + secondValue;
  } else if (sign === "-") {
    resultValue = firstValue - secondValue;
  } else if (sign === "x") {
    resultValue = firstValue * secondValue;
  } else if (sign === "/") {
    resultValue = firstValue / secondValue;
  }
  result.innerHTML = formatNumber(resultValue);
  firstValue = resultValue;
  secondValue = "";
  checkResultLength();
});

function checkResultLength() {
  resultValue = JSON.stringify(resultValue);

  if (resultValue.length >= 8) {
    resultValue = JSON.parse(resultValue);
    result.innerHTML = formatNumber(resultValue.toFixed(5));
  }
}

function formatNumber(number) {
  if (Math.abs(number) >= 1e6) {
    return parseFloat(number.toFixed(2)).toLocaleString();
  } else {
    return number.toLocaleString();
  }
}

negative.addEventListener('click', () => {
  result.innerHTML = "";
  if (firstValue !== "") {
    resultValue = -firstValue;
    firstValue = resultValue;
  }
  if (firstValue !== "" && secondValue !== "" && sign !== "") {
    resultValue = -resultValue;
  }

  result.innerHTML = formatNumber(resultValue);
});

percent.addEventListener('click', () => {
  result.innerHTML = "";
  if (firstValue !== "") {
    resultValue = firstValue / 100;
    firstValue = resultValue;
  }
  if (firstValue !== "" && secondValue !== "" && sign !== "") {
    resultValue = resultValue / 100;
  }

  result.innerHTML = formatNumber(resultValue);
});

clear.addEventListener('click', () => {
  result.innerHTML = 0;

  firstValue = "";
  isFirstValue = false;
  secondValue = "";
  isSecondValue = false;
  sign = "";
  resultValue = 0;
});

 