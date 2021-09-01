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
let changed = false;

prevSum.textContent = 0;
currentSum.textContent = 0;

function parse(str) {
  return Function(`'use strict'; return (${str})`)();
}

let sumNumber = function () {};
for (let i = 0; i < btnNum.length; i++) {
  btnNum[i].addEventListener("click", function () {
    if (btnNum[i].value >= 0 && btnNum[i].value <= 9) {
      allNum.push(+btnNum[i].value);
    } else {
      allNum.push(btnNum[i].value);
    }

    for (let j = 0; j < allNum.length; j++) {
      if (allNum[j] == 0 && allNum[j - 1] == "-") {
        let indx = allNum.indexOf("-");

        if (
          allNum[indx + 2] != "." &&
          allNum[indx + 2] != undefined &&
          indx < 3
        ) {
          allNum.splice(indx, 1);
        }
      }
      valid("-");
      valid("+");
      valid("/");
      valid("*");
      valid("^");
    }

    sumNums = allNum.join("");
    currentSum.textContent = sumNums;

    equal.addEventListener("click", function () {
      prevSum.textContent = sumNums;

      if (sumNums.includes("^")) {
        sumNums = sumNums.replace("^", "**");
      }

      if (sumNums.includes("-") && sumNums.includes("**") && changed == false) {
        changed = true;
        exponentation();
      }
      sum = parse(sumNums);
      let sumString = sum.toString();
      let roundStringNum = sumString.substring(0, 10);

      let newSum = parse(roundStringNum);

      roundedSum = Math.round(newSum * 100) / 100;

      if (
        roundedSum == Infinity ||
        roundedSum == NaN ||
        roundedSum == undefined ||
        roundedSum === false
      ) {
        currentSum.textContent = "Error";
        allNum = [];
        prevSum.textContent = "Error";
        return;
      }
      currentSum.textContent = roundedSum;
      allNum = [roundedSum];
    });

    square.addEventListener("click", squares);
  });
}

function valid(operator) {
  if (
    allNum[allNum.length - 1] == operator &&
    allNum[allNum.length - 2] == operator
  ) {
    allNum.pop();
  }
}

function exponentation() {
  let newArr = sumNums.split("");
  newArr.unshift("(");
  let index = newArr.indexOf("*");
  newArr.splice(index, 0, ")");

  sumNums = newArr.join("");
}

function squares() {
  sumNums = allNum.join("");
  sum = parse(sumNums);

  roundedSum = Math.sqrt(sum);

  if (!Math.sign(roundedSum)) {
    currentSum.textContent = "Error";
    return;
  }

  let fixedNum = roundedSum.toFixed();
  prevSum.textContent = `√(${sum})`;

  currentSum.textContent = fixedNum;
  allNum = [fixedNum];
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

  changed = false;
});
