// JS Utilities

// ⌛ Promise delay
const delay = (time) => {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error('delay requires a valid number in ms!'))
    }
    return setTimeout(resolve, time)
  })
}

// 🗒️ Capitalize
const capitalize = (string) => {
  const words = string.split(' ')
  const capitalized = []
  words.forEach((word) => {
    capitalized.push(`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
  })
  return capitalized.join(' ')
}

// 📰 Log (instead of console.log())
const log = (content) => {
  console.log(content)
}

// 🧩 Query selector
const select = (selector, all = false) => {
  if (!all) {
    return document.querySelector(selector)
  } else {
    return document.querySelectorAll(selector)
  }
}

// Event Listener
const event = (target, event, callback, options = {}) => {
  //Window Events: {load, resize, scroll, unload, beforeunload},
  //Document Events: {DOMContentLoaded, load, resize, scroll, unload},
  //Pointer Events: {pointerdown, pointerup, pointermove, pointerover, pointerout, pointerenter, pointerleave,pointercancel},
  //Touch Events: {touchstart, touchend, touchmove, touchcancel}
  //Mouse Events: {mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave}
  //Keyboard Events: {keydown, keyup, keypress}
  //Animation Events: {animationstart, animationend, animationiteration}
  //Transition Events: {transitionstart, transitionend, transitioniteration},
  //Input Events: {input, change, focus, blur},
  //form Events: {submit, reset, keydown, keyup, keypress, change, focus},
  //Drag Events: {dragstart, dragend, dragover, dragenter, dragleave, drop},
  //Media Events: {canplay, canplaythrough, durationchange, emptied, ended},
  //Clipboard Events: {copy, cut, paste},
  //Other Events: {online, offline},
  //Options: {passive: true,once: true,},
  return target.addEventListener(event, callback, options)
}

// Text Sanitizer

const sanitizeInput = (inputValue) => {
  const div = document.createElement('div')
  div.textContent = inputValue
  return div.innerHTML
}

//Class Manipulation ["+","-","x"]

const classlist = (selector, action, ...classNames) => {
  //claslist(selector[element], action['+','-','x'],...classNames(string or array of strings))
  const classes = Array.isArray(classNames[0]) ? classNames[0] : classNames

  const actions = {
    remove: () => selector.classList.remove(...classes),
    '-': () => selector.classList.remove(...classes),
    add: () => selector.classList.add(...classes),
    '+': () => selector.classList.add(...classes),
    toggle: () => selector.classList.toggle(...classes),
    x: () => selector.classList.toggle(...classes),
  }

  const actionFn = actions[action]
  if (!actionFn) {
    throw new Error(`Invalid action: ${action}`)
  }

  actionFn()
}

export { delay, capitalize, log, select, event, classlist }
