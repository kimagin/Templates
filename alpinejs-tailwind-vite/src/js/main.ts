'use strict'

import { Alpine as AlpineType } from 'alpinejs'

//ToolBox
import { _event, _class, _select, _log, _delay } from './utils'

//Imports
import Alpine from 'alpinejs'
import Data from './modules/data'
import { Counter } from './modules/counter'

// 🗻 Alpine modules
declare global {
  var Alpine: AlpineType
}
window.Alpine = Alpine
Alpine.data('data', Data)
Alpine.data('counter', Counter)
Alpine.start()

const initApp = async () => {
  // 🚩 Dom initialized
  const mainElement = _select('.main')
  await _delay()

  _class(mainElement, 'remove', 'opacity-0')
  _event(mainElement, 'transitionend', () =>
    _log('⚡ AlpineJS Custom Template is ready...', 'info')
  )
}

_event(document, 'DOMContentLoaded', initApp)
