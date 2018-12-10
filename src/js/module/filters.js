/*
const filterContainer = document.querySelector('.js-filters')
const filterItems = Array.from(filterContainer.querySelectorAll('.calender-filter__brands-item input'))

filterItems.forEach((filterItem) => {
  filterItem.addEventListener('change', (e) => {
    FilterEvents(filterItem)
  })
})

function FilterEvents(filterItem) {
  const eventItems = Array.from(document.querySelectorAll('.event-item'))
  eventItems.forEach((eventItem) => {
    if (filterItem.checked === true) {
      const value = `-${filterItem.value}`
      if (!eventItem.classList.contains(value)) {
        eventItem.classList.add('-hide')
      } else {
        eventItem.classList.remove('-hide')
      }
    } else {
      eventItem.classList.remove('-hide')
    }
  })
}
*/

// Click the checkbox

// Hide all events

// Get all nodes into array that dont have hide

//check to see if the values within array = checkbox value

const filterContainer = document.querySelector('.js-filters')
const filterItems = Array.from(filterContainer.querySelectorAll('.calender-filter__brands-item input'))
let filterArr = []

filterItems.forEach((fe) => {
  fe.addEventListener('click', (e) => {
    if (fe.checked === true) {
      const val = fe.value
      filterArr.push(val)
      FilterEvents(filterArr)
    } else {
      filterArr = filterArr.filter(item => item !== e.target.value)
      FilterEvents(filterArr)
    }
  })
})

function FilterEvents(filterArr) {
  const eventItems = Array.from(document.querySelectorAll('.event-item'))
  eventItems.forEach((item) => {
    item.style.display = 'none'
  })
  if (filterArr.length === 0) {
    eventItems.forEach((item) => {
      item.style.display = 'flex'
    })
  } else {
    filterArr.forEach((val, i, arr) => {
      if (val === 'all') {
        eventItems.forEach((eitem) => {
          eitem.style.display = 'flex'
        })
      } else {
        eventItems.forEach((eitem) => {
          if (arr.length === 0) {
            eitem.style.display = 'flex'
          }
          if (eitem.classList.contains(`-${val}`)) {
            eitem.style.display = 'flex'
          } else {
            eitem.style.display = 'none'
          }
        })
      }
    })
  }
}
