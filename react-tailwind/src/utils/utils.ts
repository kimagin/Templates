// JS Utilities

// ⌛ Promise delay
const delay = async (timeInMs: number) => {
  if (isNaN(timeInMs)) {
    throw new Error('delay requires a valid number in ms!')
  }
  await new Promise((resolve) => setTimeout(resolve, timeInMs))
}

// 🗒️ Capitalize
const capitalize = (string: string) => {
  const words = string.split(' ')
  const capitalized: string[] = []
  words.forEach((word: string) => {
    capitalized.push(`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
  })
  return capitalized.join(' ')
}

// 📰 Log (instead of console.log())
type Level = 'debug' | 'info' | 'warn' | 'error'
type Levels = Record<
  Level,
  { method: (...args: unknown[]) => void; color: string }
>
const log = (
  content: void | string | unknown,
  label = '',
  level: Level = 'info'
) => {
  const timestamp = new Date().toLocaleTimeString()
  const levels: Levels = {
    debug: { method: console.debug, color: '#A9A9A9' },
    info: { method: console.info, color: '#87CEFA' },
    warn: { method: console.warn, color: '#FFD700' },
    error: { method: console.error, color: '#FFA07A' },
  }
  const { method, color } = levels[level] || levels.info
  const style = `color: ${color}; font-weight: bold; font-style: italic;`
  const formattedLabel = label ? `[${label}]` : ''
  method(`%c${timestamp} ${formattedLabel}:`, style, content)
}

// 🧩 Query selector
const select = (selector: string, all = false): Element | Element[] | null => {
  if (typeof selector !== 'string') {
    throw new Error('The selector argument must be a string.')
  }
  if (all !== false && all !== true && all !== 'all') {
    throw new Error('The all argument must be a boolean.')
  }
  const elements: Element | Element[] | null = all
    ? Array.from(document.querySelectorAll(selector))
    : document.querySelector(selector)
  return elements
}

// Event Listener
const event = (
  target: EventTarget,
  event: string,
  callback: EventListenerOrEventListenerObject,
  options = {}
) => {
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

const sanitizeInput = (inputValue: string) => {
  const div = document.createElement('div')
  div.textContent = inputValue
  return div.innerHTML
}

//Class Manipulation ["+","-","x"]

const classlist = (
  selector: Element | null,
  action: 'remove' | 'add' | 'toggle' | '-' | '+' | 'x',
  ...classNames: string[]
) => {
  //claslist(selector[element], action['+','-','x'],...classNames(string or array of strings))
  // const selector: Element | null = document.querySelector(query)
  const classes = Array.isArray(classNames[0])
    ? classNames[0]
    : (classNames as string[])

  const actions: Record<string, () => void> = {
    remove: () => selector?.classList.remove(...classes),
    '-': () => selector?.classList.remove(...classes),
    add: () => selector?.classList.add(...classes),
    '+': () => selector?.classList.add(...classes),
    toggle: () => selector?.classList.toggle(classNames.join(' ')),
    x: () => selector?.classList.toggle(classNames.join(' ')),
  }

  const actionFn = actions[action]
  if (!actionFn) {
    throw new Error(`Invalid action: ${action}`)
  }

  actionFn()
}

// ⚾ Debounce
// Will prevent running the function until the time has passed
const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timerId: ReturnType<typeof setTimeout> | null

  return (...args: Array<unknown>) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      func(...args)
      timerId = null
    }, delay)
  }
}

// ⚙️ Throttle
// Will run the function, once per specified delay
const throttle = <T extends unknown[]>(
  func: (...args: T) => void,
  limit: number
) => {
  let inThrottle: ReturnType<typeof setTimeout> | undefined

  return function (this: unknown, ...args: T) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = setTimeout(() => (inThrottle = undefined), limit)
    }
  }
}

//Random Number Generator
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//Exports
export {
  delay,
  capitalize,
  log,
  select,
  event,
  classlist,
  debounce,
  throttle,
  random,
  sanitizeInput,
}
