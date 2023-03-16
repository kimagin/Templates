// JS Utilities

// ⌛ Promise delay
const delay = (time) => {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error("delay requires a valid number in ms!"));
    }
    return setTimeout(resolve, time);
  });
};

// 🗒️ Capitalize
const capitalize = (string) => {
  const words = string.split(" ");
  const capitalized = [];
  words.forEach((word) => {
    capitalized.push(`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`);
  });
  return capitalized.join(" ");
};

// 📰 Log (instead of console.log())
const log = (content) => {
  console.log(content);
};

// 🧩 Query selector
const select = (selector, all = false) => {
  if (!all) {
    return document.querySelector(selector);
  } else {
    return document.querySelectorAll(selector);
  }
};

// Event Listener
const event = (target, event, callback, capture = false) => {
  return target.addEventListener(event, callback, !!capture);
};

// Text Sanitizer

const sanitizeInput = (inputValue) => {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
};

//Class Manipulation ["+","-","x"]

const classlist = (element, action, className) => {
  const classes = typeof className === "string" ? [className] : [...className];

  if (action === "remove" || action === "-") {
    return element.classList.remove(...classes);
  } else if (action === "add" || action === "+") {
    return element.classList.add(...classes);
  } else if (action === "toggle" || action === "x") {
    return element.classList.toggle(...classes);
  }
};

export { delay, capitalize, log, select, event, classlist };
