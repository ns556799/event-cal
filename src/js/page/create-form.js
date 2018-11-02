import firebase from 'firebase'
import flatpickr from 'flatpickr'

const createForm = document.querySelector('.js-create-form')
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
const date = createForm.querySelector('#date')
flatpickr(date, {dateFormat: 'd-m-Y'})

createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = createForm.querySelector('#title').value
  const location = createForm.querySelector('#location').value
  const obj = {
    'name': 'fatima',
    title
  }
  console.log(obj)
  /*ref.push(obj)*/
})
