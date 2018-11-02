const $html = document.querySelector('html')
const detectTouch = () => {
  $html.classList.add('-is-touch')
  $html.classList.remove('-no-touch')
  $html.removeEventListener('touchend', detectTouch)
}

$html.addEventListener('touchend', detectTouch)
