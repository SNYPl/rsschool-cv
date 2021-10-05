const keyboardData = [
  { key: "`", code: "Backquote", KeyCode: 96, second: "~" },
  { key: "1", code: "Digit1", KeyCode: 49, second: "!" },
  { key: "2", code: "Digit2", KeyCode: 50, second: "@" },
  { key: "3", code: "Digit3", KeyCode: 51, second: "#" },
  { key: "4", code: "Digit4", KeyCode: 52, second: "$" },
  { key: "5", code: "Digit5", KeyCode: 53, second: "%" },
  { key: "6", code: "Digit6", KeyCode: 54, second: ":" },
  { key: "7", code: "Digit7", KeyCode: 55, second: "?" },
  { key: "8", code: "Digit8", KeyCode: 56, second: "*" },
  { key: "9", code: "Digit9", KeyCode: 57, second: "(" },
  { key: "0", code: "Digit0", KeyCode: 48, second: ")" },
  { key: "-", code: "Minus", KeyCode: 45, second: "_" },
  { key: "=", code: "Equal", KeyCode: 61, second: "+" },
  { key: "Backspace", code: "Backspace", KeyCode: 8, second: "" },
  { key: "Tab", code: "Tab", KeyCode: 9, second: "" },
  { key: "q", code: "KeyQ", KeyCode: 81, second: "" },
  { key: "w", code: "KeyW", KeyCode: 87, second: "" },
  { key: "e", code: "KeyE", KeyCode: 69, second: "" },
  { key: "r", code: "KeyR", KeyCode: 82, second: "" },
  { key: "t", code: "KeyT", KeyCode: 84, second: "" },
  { key: "y", code: "KeyY", KeyCode: 89, second: "" },
  { key: "u", code: "KeyU", KeyCode: 85, second: "" },
  { key: "i", code: "KeyI", KeyCode: 73, second: "" },
  { key: "o", code: "KeyO", KeyCode: 79, second: "" },
  { key: "p", code: "KeyP", KeyCode: 80, second: "" },
  { key: "[", code: "BracketLeft", KeyCode: 219, second: "" },
  { key: "]", code: "BracketRight", KeyCode: 221, second: "" },
  { key: "\\", code: "Backslash", KeyCode: 220, second: "|" },
  { key: "Del", code: "Delete", KeyCode: 46, second: "" },
  { key: "Caps Lock", code: "CapsLock", KeyCode: 20, second: "" },
  { key: "a", code: "KeyA", KeyCode: 65, second: "" },
  { key: "s", code: "KeyS", KeyCode: 83, second: "" },
  { key: "d", code: "KeyD", KeyCode: 68, second: "" },
  { key: "f", code: "KeyF", KeyCode: 70, second: "" },
  { key: "g", code: "KeyG", KeyCode: 71, second: "" },
  { key: "h", code: "KeyH", KeyCode: 72, second: "" },
  { key: "j", code: "KeyJ", KeyCode: 74, second: "" },
  { key: "k", code: "KeyK", KeyCode: 75, second: "" },
  { key: "l", code: "KeyL", KeyCode: 76, second: "" },
  { key: ";", code: "Semicolon", KeyCode: 186, second: "" },
  { key: "'", code: "Quote", KeyCode: 222, second: "" },
  { key: "Enter", code: "Enter", KeyCode: 13, second: "" },
  { key: "Shift", code: "ShiftLeft", KeyCode: 16, second: "" },
  { key: "\\", code: "Slash", KeyCode: 191, second: "" },
  { key: "z", code: "KeyZ", KeyCode: 90, second: "" },
  { key: "x", code: "KeyX", KeyCode: 88, second: "" },
  { key: "c", code: "KeyC", KeyCode: 67, second: "" },
  { key: "v", code: "KeyV", KeyCode: 86, second: "" },
  { key: "b", code: "KeyB", KeyCode: 66, second: "" },
  { key: "n", code: "KeyN", KeyCode: 78, second: "" },
  { key: "m", code: "KeyM", KeyCode: 77, second: "" },
  { key: ".", code: "Period", KeyCode: 190, second: "" },
  { key: ",", code: "Comma", KeyCode: 188, second: "" },
  { key: "/", code: "Slash", KeyCode: 191, second: "" },
  { key: "▲", code: "ArrowUp", KeyCode: 38, second: "" },
  { key: "Shift", code: "ShiftRight", KeyCode: 16, second: "" },
  { key: "Ctrl", code: "ControlLeft", KeyCode: 17, second: "" },
  { key: "Win", code: "MetaLeft", KeyCode: 91, second: "" },
  { key: "Alt", code: "AltLeft", KeyCode: 18, second: "" },
  { key: `\xa0`, code: "Space", KeyCode: 32, second: "" },
  { key: "Alt", code: "AltRight", KeyCode: 18, second: "" },
  { key: "Ctrl", code: "ControlRight", KeyCode: 17, second: "" },
  { key: "◄", code: "ArrowLeft", KeyCode: 37, second: "" },
  { key: "▼", code: "ArrowDown", KeyCode: 40, second: "" },
  { key: "►", code: "ArrowRight", KeyCode: 39, second: "" },
];

const body = document.getElementById("body");
const container = document.createElement("div");
const textArea = document.createElement("textarea");
const keyboard = document.createElement("div");

container.classList.add("container");
textArea.classList.add("container-textarea");
keyboard.classList.add("container-keyboard");

body.insertAdjacentElement("afterbegin", container);

container.insertAdjacentElement("afterbegin", textArea);

container.insertAdjacentElement("beforeend", keyboard);

textArea.disabled = "true";

keyboardData.map((item) => {
  let keys = `<div class='key' id='${item.code}' data-value=${item.key}>${item.key}</div>`;

  keyboard.insertAdjacentHTML("beforeend", keys);
});

let btns = document.querySelectorAll(".key");
let keys = [...btns];
let wordsArray = [];
let keyWords;

body.addEventListener("keydown", function (e) {
  keys.map((item) => {
    if (item.id === e.code) {
      item.classList.add("highlited");

      setTimeout(function () {
        item.classList.remove("highlited");
      }, 2000);

      keyInteractives(item);
    }
  });
  return;
});

keys.map((item) => {
  item.addEventListener("click", function () {
    if (item) {
      item.classList.add("highlited");
      setTimeout(function () {
        item.classList.remove("highlited");
      }, 2000);
    }

    keyInteractives(item);
  });
});

function keyInteractives(item) {
  let start = textArea.selectionStart;
  keyWords = item.getAttribute("data-value");
  if (keyWords === "Backspace") {
    keyWords = ``;
    wordsArray.splice(start - 1, 1);
  } else if (keyWords === "Del") {
    keyWords = ``;
    wordsArray.splice(start, 1);
  }

  if (keyWords === "Alt") {
    keyWords = ``;
    textArea.focus();
  }

  if (keyWords === "") {
    textArea.value = wordsArray.join("");
    textArea.focus();
    return;
  }

  if (keyWords === "Enter") {
    keyWords = "\n";
  }

  if (keyWords === "Tab") {
    keyWords = "\t";
    for (var i = 0; i < keys.length; i++) {
      if (document.activeElement.id == keys[i].id && i + 1 < keys.length) {
        keys[i + 1].focus();
        break;
      }
    }
  }

  wordsArray.push(keyWords);

  textArea.value = wordsArray.join("");
  // textArea.focus();
  return;
}
