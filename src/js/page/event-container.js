import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBK5S7EVKSV_2ES3-muFOLrO89TnnDj8QU',
  authDomain: 'events-page-2ccc5.firebaseapp.com',
  databaseURL: 'https://events-page-2ccc5.firebaseio.com',
  projectId: 'events-page-2ccc5',
  storageBucket: 'events-page-2ccc5.appspot.com',
  messagingSenderId: '894680186886'
}

firebase.initializeApp(config)
const ref = firebase.database().ref('/events')

const eventWrapper = document.querySelector('.js-container')

ref.on('value', function(snapshot) {
  const entries = snapshot.val()
  Object.keys(entries).forEach((key) => {
    const {
      title,
      location,
      date,
      enddate,
      imageURL,
      brands,
      email,
      url} = entries[key]

    CreateEvents(title, location, date, enddate, imageURL, brands, email, url)
  })
}, function (errorObject) {
  console.log('The read failed: ' + errorObject.code)
})

function CreateEvents(title, location, date, enddate, imageURL, brands, email, url) {
  const eventContainer = document.createElement('div')
  eventContainer.classList.add('event-item')

  const eventContent = document.createElement('div')
  eventContent.classList.add('event-content')

  const eventTitle = document.createElement('div')
  eventTitle.classList.add('event-item__title')
  eventTitle.innerText = title

  const eventDate = document.createElement('div')
  eventDate.classList.add('event-item__date')
  eventDate.innerText = date

  const eventImg = document.createElement('div')
  eventImg.classList.add('event-item__img')
  eventImg.style.backgroundImage = `url(${imageURL})`

  const eventLocation = document.createElement('div')
  eventLocation.classList.add('event-item__location')
  eventLocation.innerText = location

  const eventCta = document.createElement('button')
  eventCta.classList.add('event-item__cta')
  eventCta.innerText = 'Find out more'

  eventCta.addEventListener('click', (e) => {
    e.preventDefault()

    if (email) {
      window.location.href = `mailto:${email}?subject=${title}`
      eventCta.dataset.elUrl = email
    }

    if (url) {
      window.location.href = url
      eventCta.dataset.elUrl = url
    }
  })

  const eventBrands = document.createElement('div')
  eventBrands.classList.add('event-item__brands')

  Object.keys(brands).forEach((key) => {
    const eventBrandsItem = document.createElement('div')
    eventBrandsItem.classList.add(`event-item__brands-item`, `-${brands[key]}`)
    eventBrands.appendChild(eventBrandsItem)
    eventContainer.classList.add(`-${brands[key]}`)
  })

  const eventCtaContainer = document.createElement('div')
  eventCtaContainer.classList.add('event-item__cta-container')

  const eventBrandWrapper = document.createElement('div')
  eventBrandWrapper.classList.add('event-item__brands-wrapper')
  eventBrandWrapper.innerText = 'Brands'

  eventBrandWrapper.addEventListener('mouseover', (e) => {
    eventBrandWrapper.parentNode.parentNode.classList.add('-hover')
  }, false)
  eventBrandWrapper.addEventListener('mouseout', (e) => {
    eventBrandWrapper.parentNode.parentNode.classList.remove('-hover')
  }, false)

  eventCtaContainer.appendChild(eventBrandWrapper)
  eventCtaContainer.appendChild(eventCta)

  eventContent.appendChild(eventTitle)
  eventContent.appendChild(eventDate)
  eventContent.appendChild(eventLocation)
  eventContent.appendChild(eventBrands)

  eventContent.appendChild(eventCtaContainer)
  eventContainer.appendChild(eventContent)
  eventContainer.appendChild(eventImg)
  eventWrapper.appendChild(eventContainer)

  const eventBrandsOne = Array.from(document.querySelectorAll('.event-item__brands'))
  eventBrandsOne.forEach((eb) => {
    const height = eb.offsetHeight
    eb.style.bottom = `-${height}px`
  })
}
