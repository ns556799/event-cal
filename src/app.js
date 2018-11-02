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
   import(/* webpackChunkName: "moduleName" */ 'page/create-form')
}

// =blocks
// if (document.querySelector('.m-blockname')) {
//   import(/* webpackChunkName: "blockName" */ 'block/blockName')
// }

// =pages
// if (document.querySelector('.page-specific')) {
//   import(/* webpackChunkName: "pageSpecific" */ 'page/pageSpecific')
// }
