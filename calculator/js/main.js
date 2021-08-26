let btnNum = document.querySelectorAll(".calc-num");
let equal = document.querySelector(".equal");
let prevSum = document.querySelector(".prev");
let currentSum = document.querySelector(".cur");
let deleteNum = document.querySelector(".del");
let deleteAll = document.querySelector(".ac");
let square = document.querySelector(".square");

let allNum = [];
let sumNums = 0;
let sum = 0;
let roundedSum;
prevSum.textContent = 0;
currentSum.textContent = 0;

function parse(str) {
  return Function(`'use strict'; return (${str})`)();
}

let sumNumber = function () {};
for (let i = 0; i < btnNum.length; i++) {
  btnNum[i].addEventListener("click", function () {
    if (btnNum[i].value > 0 && btnNum[i].value < 9) {
      allNum.push(+btnNum[i].value);
    } else {
      allNum.push(btnNum[i].value);
    }

    sumNums = allNum.join("");
    currentSum.textContent = sumNums;

    equal.addEventListener("click", function () {
      prevSum.textContent = sumNums;

      if (sumNums.includes("^")) {
        sumNums = sumNums.replace("^", "**");
      }

      sum = parse(sumNums);
      let sumString = sum.toString();
      let roundStringNum = sumString.substring(0, 10);
      let newSum = parse(roundStringNum);

      roundedSum = Math.round(newSum * 100) / 100;

      currentSum.textContent = roundedSum;
      allNum = [roundedSum];
    });

    square.addEventListener("click", squares);
  });
}

function squares() {
  sumNums = allNum.join("");
  sum = parse(sumNums);
  roundedSum = Math.sqrt(sum);

  prevSum.textContent = `√(${sum})`;
  currentSum.textContent = roundedSum;
  allNum = [roundedSum];
}

deleteNum.addEventListener("click", function () {
  allNum.pop();
  sumNums = allNum.join("");

  currentSum.textContent = sumNums;

  if (allNum.length === 0) {
    currentSum.textContent = 0;
    prevSum.textContent = 0;
  }
});

deleteAll.addEventListener("click", function () {
  allNum = [];
  sumNums = 0;
  currentSum.textContent = sumNums;
  prevSum.textContent = sumNums;
});
