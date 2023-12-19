'use strict'
//ToolBox
import { _class, _select, _log, _event, _delay } from './utils'

const initApp = async () => {
  const mainElement = _select('section')
  await _delay()
  _class(mainElement, 'remove', 'opacity-0')
  _event(
    mainElement,
    'transitionend',
    () => _log('⚡ TailwindCSS Template is ready...', 'info'),
    { once: true }
  )
}
_event(document, 'DOMContentLoaded', initApp)
