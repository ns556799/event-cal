export const mq = {
  xxxs: '0',
  xxs: '200',
  xs: '320',
  s: '400',
  sl: '480',
  sl2: '580',
  m: '768',
  ml: '992',
  l: '1100',
  xl: '1200',
  xxl: '1300',
  xxxl: '1400',
  xxxxl: '1500',
  xxxxxl: '1600',
  xxxxxxl: '1700'
}

export const bp = [
  1700, 1600, 1500, 1400, 1300, 1200, 1100, 992, 768, 580, 480, 400, 320, 200, 0
]

export const MQ = (min, max) => {
  if (!min && !max) {
    return ''
  } else if (min && !max) {
    return 'only screen and (min-width: ' + min + 'px)'
  } else if (!min && max) {
    return 'only screen and (max-width: ' + (max - 1) + 'px)'
  } else {
    return 'only screen and (min-width: ' + min + 'px) and (max-width: ' + (max - 1) + 'px)'
  }
}
