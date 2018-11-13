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
    console.log(entries[key])
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
    console.log(title, location)
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

  eventContent.appendChild(eventTitle)
  eventContent.appendChild(eventDate)
  eventContent.appendChild(eventLocation)

  eventContainer.appendChild(eventContent)
  eventContainer.appendChild(eventImg)
  eventWrapper.appendChild(eventContainer)
}
