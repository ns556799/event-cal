import 'babel-polyfill'
import 'polyfill/customEvent'

// =utils
import 'util/breakpoints'
import 'util/detectTouch'

// =layout
// if (document.querySelector('.header')) {
//   import(/* webpackChunkName: "header" */ 'layout/header')
// }

// debug mode
if (document.querySelector('body').classList.contains('-debug')) {
  import(/* webpackChunkName: "debugger" */ 'util/debugger')
}

// =modules
if (document.querySelector('.js-create-form')) {
   import(/* webpackChunkName: "createForm" */ 'page/create-form')
}

if (document.querySelector('.js-events')) {
   import(/* webpackChunkName: "events" */ 'page/event-container')
}

if (document.querySelector('.js-filters')) {
   import(/* webpackChunkName: "filters" */ 'module/filters')
}

if (document.querySelector('.event-cal__slider')) {
   import(/* webpackChunkName: "filters" */ 'module/slider')
}

// =blocks
// if (document.querySelector('.m-blockname')) {
//   import(/* webpackChunkName: "blockName" */ 'block/blockName')
// }

// =pages
// if (document.querySelector('.page-specific')) {
//   import(/* webpackChunkName: "pageSpecific" */ 'page/pageSpecific')
// }
