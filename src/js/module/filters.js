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
    const value = `-${filterItem.value}`
    if (!eventItem.classList.contains(value)) {
      eventItem.classList.add('-hide')
    } else {
      eventItem.classList.remove('-hide')
    }
  })
}
