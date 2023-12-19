'use strict'
//ToolBox

import Sketch from './three-setup'

// Setup before DOM loads
const initApp = async () => {
  new Sketch({
    // To which DOM element to append the canvas
    dom: document.getElementById('container'),
  })
}
document.addEventListener('DOMContentLoaded', initApp)
