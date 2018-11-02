import enquire from 'enquire.js'
import { bp, mq, MQ } from 'util/mq'

const $html = document.querySelector('html')
let currentBreakpoint
let isDesktop

const mobileEvent = new CustomEvent('view:mobile')
enquire.register(MQ(mq.xxxs, mq.m), {
  match() {
    currentBreakpoint = 'mobile'
    isDesktop = false

    $html.dispatchEvent(mobileEvent)
  }
})

const tabletEvent = new CustomEvent('view:tablet')
enquire.register(MQ(mq.m, mq.l), {
  match() {
    currentBreakpoint = 'tablet'
    isDesktop = false

    $html.dispatchEvent(tabletEvent)
  }
})

const desktopEvent = new CustomEvent('view:desktop')
enquire.register(MQ(mq.l), {
  match() {
    currentBreakpoint = 'desktop'
    isDesktop = true

    $html.dispatchEvent(desktopEvent)
  }
})

export {
  currentBreakpoint,
  isDesktop
}
