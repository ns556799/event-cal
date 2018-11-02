const debugCss = () => {
  const $body = document.querySelector('body')

  // create fake debug DOM element and check
  // if it has a css property
  const $debug = document.createElement('div')
  $debug.className = 'debug-true'
  $debug.style.display = 'none'
  $body.appendChild($debug)
  const debugClasses = window.getComputedStyle($debug)

  if (debugClasses.position === 'relative') {
    // media queries debugger
    const debuggerEl = document.createElement('div')
    debuggerEl.className = 'debugger'
    $body.appendChild(debuggerEl)
  }
  $body.removeChild($debug)
}
debugCss()

const debugBlocks = () => {
  const $modules = document.querySelectorAll('section')
  Array.from($modules).forEach(($module) => {
    const dataM = $module.dataset.m
    if (!dataM) return
    const debuggerEl = document.createElement('div')
    debuggerEl.className = 'debugger-block'
    debuggerEl.innerHTML = dataM
    $module.appendChild(debuggerEl)
  })
}
debugBlocks()
