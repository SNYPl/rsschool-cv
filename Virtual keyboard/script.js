const engInputs = enInputs;
const geoInputs = kaInputs;

const body = document.getElementById("body");
const container = document.createElement("div");
const textArea = document.createElement("textarea");
const keyboard = document.createElement("div");
let btns;
let keys = [];

container.classList.add("container");
textArea.classList.add("container-textarea");
keyboard.classList.add("container-keyboard");

body.insertAdjacentElement("afterbegin", container);
container.insertAdjacentElement("afterbegin", textArea);
container.insertAdjacentElement("beforeend", keyboard);

textArea.disabled = "true";

let selectList = document.createElement("select");
selectList.id = "mySelect";
body.insertAdjacentElement("afterbegin", selectList);

let eng = document.createElement("option");
eng.value = "English";
eng.text = "English";
selectList.insertAdjacentElement("afterbegin", eng);

let ka = document.createElement("option");
ka.value = "Georgian";
ka.text = "Georgian";
selectList.insertAdjacentElement("afterbegin", ka);
let langChanged = true;

if (localStorage.length === 0) {
  localStorage.setItem("lang", "English");
}

const storageLanguage = localStorage.getItem("lang");

if (storageLanguage === "Georgian") {
  ka.selected = "true";
} else {
  eng.selected = "true";
}
const selector = document.getElementById("mySelect");
const keyboardContainer = document.getElementsByClassName("container-keyboard");

selector.addEventListener("change", function (e) {
  localStorage.setItem("lang", e.target.value);
  langChanged = false;
  if (e.target.value === "English") {
    langChanged = false;
    keyboard.innerHTML = "";

    engInputs.map((item) => {
      let keys = `<div class='key' id='${item.code}' data-value=${item.key}><span class="secondaryKey">${item.second}</span>${item.key}</div>`;

      keyboard.insertAdjacentHTML("beforeend", keys);
    });

    btns = document.querySelectorAll(".key");
    keys = [...btns];
  }
  if (e.target.value === "Georgian") {
    langChanged = false;
    keyboard.innerHTML = "";
    geoInputs.map((item) => {
      let keys = `<div class='key' id='${item.code}' data-value=${item.key}><span class="secondaryKey">${item.second}</span>${item.key}</div>`;

      keyboard.insertAdjacentHTML("beforeend", keys);
    });
  }
  btns = document.querySelectorAll(".key");
  keys = [...btns];

  onClickInputs(keys);
});

if (storageLanguage === "English") {
  engInputs.map((item) => {
    let keys = `<div class='key' id='${item.code}' data-value=${item.key}><span class="secondaryKey">${item.second}</span>${item.key}</div>`;

    keyboard.insertAdjacentHTML("beforeend", keys);
  });
}
if (storageLanguage === "Georgian") {
  keyboard.innerHTML = "";
  geoInputs.map((item) => {
    let keys = `<div class='key' id='${item.code}' data-value=${item.key}><span class="secondaryKey">${item.second}</span>${item.key}</div>`;

    keyboard.insertAdjacentHTML("beforeend", keys);
  });
}

btns = document.querySelectorAll(".key");
keys = [...btns];
let wordsArray = [];
let keyWords;
let shiftPressed = false;
let capsLock = document.getElementById("CapsLock");

body.addEventListener("keydown", function (e) {
  keys.map((item) => {
    keyWords = item.getAttribute("data-value");
    if (item.id === e.code) {
      item.classList.add("highlited");

      if (
        item.getAttribute("data-value") === "Shift" ||
        item.getAttribute("data-value") === "შიფტი"
      ) {
        shiftPressed = true;
      }

      if (
        item.getAttribute("data-value") === "Tab" ||
        item.getAttribute("data-value") === "ტაბ"
      ) {
        keyboard.focus();
        setTimeout(function () {
          item.classList.remove("highlited");
        }, 1500);
      }

      keyInteractives(item);
    }
  });
  return;
});

body.addEventListener("keyup", function (e) {
  keys.map((item) => {
    keyWords = item.getAttribute("data-value");
    if (item.id === e.code) {
      item.classList.remove("highlited");

      if (
        item.getAttribute("data-value") === "Shift" ||
        item.getAttribute("data-value") === "შიფტი"
      ) {
        shiftPressed = false;
      }
    }
  });
  return;
});

onClickInputs(keys);

function onClickInputs(keys) {
  keys.map((item) => {
    item.addEventListener("click", function () {
      if (item) {
        item.classList.add("highlited");
        setTimeout(function () {
          item.classList.remove("highlited");
        }, 1500);
      }
      if (
        item.getAttribute("data-value") === "Shift" ||
        item.getAttribute("data-value") === "შიფტი"
      ) {
        shiftPressed = false;
        setTimeout(function () {
          shiftPressed = false;
        }, 1500);
      }
      keyInteractives(item);
    });
  });
}

function keyInteractives(item) {
  let start = textArea.selectionStart;
  keyWords = item.getAttribute("data-value");

  if (keyWords === "Caps") {
    item.classList.toggle("capsLocked");
    keyWords = "";
  }

  if (
    keyWords === "Alt" ||
    keyWords === "Win" ||
    keyWords === "Ctrl" ||
    keyWords === "Caps"
  ) {
    keyWords = "";
  }

  if (keyWords === "Backspace" || keyWords === "წაშლა") {
    keyWords = ``;
    wordsArray.splice(start - 1, 1);
  }

  if (keyWords === "Del" || keyWords === "დელ") {
    keyWords = ``;
    wordsArray.splice(start, 1);
  }

  if (keyWords === "Shift" || keyWords === "შიფტი") {
    shiftPressed = true;
    keyWords = "";
  }

  if (keyWords === "Enter" || keyWords === "ენთერ") {
    keyWords = "\n";
  }

  if (keyWords === "Tab" || keyWords === "ტაბ") {
    keyWords = "";
    for (let i = 0; i < 6; i++) {
      wordsArray.push("\xa0");
    }
    keyboard.focus();
    return;
  }

  if (keyWords === "") {
    textArea.value = wordsArray.join("");
    return;
  }

  if (capsLock.classList.contains("capsLocked")) {
    keyWords = keyWords.toUpperCase();
  }

  if (shiftPressed && item.firstElementChild.textContent != "") {
    keyWords = item.firstElementChild.textContent;
  }
  if (shiftPressed) {
    keyWords = keyWords.toUpperCase();
  }

  wordsArray.push(keyWords);
  textArea.value = wordsArray.join("");
}
