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
flatpickr(date, {dateFormat: 'Y-m-d'})

const radioButtons = Array.from(document.querySelectorAll('.radio input'))
const endDate = document.querySelector('.end-date')

radioButtons.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    console.log(radio.value)
    console.log(endDate)
    if (radio.value === 2) {
      e.preventDefault()
      radio.classList.toggle('-hide')
    }
  })
})

let selectedFile

(document.querySelector('.file-select')).addEventListener('change', (e) => {
  console.log(e)
  selectedFile = e.target.files[0]
})

var fileButton = document.getElementById('fileButton')
let imageURL

fileButton.addEventListener('change', function(e) {
  var file = e.target.files[0]
  var storageRef = firebase.storage().ref(file.name)
  const uploadTask = storageRef.put(file)
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused')
          break
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running')
          break
      }
    }, function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break
        case 'storage/canceled':
          // User canceled the upload
          break
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL)
        imageURL = downloadURL
      })
    })
})

createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = createForm.querySelector('#title').value
  const location = createForm.querySelector('#location').value
  let date = createForm.querySelector('#date').value
  date = date.split('-').join(',')
  date = new Date(date)

  const obj = {
    title,
    location,
    date,
    imageURL
  }
  console.log(obj)
  /*ref.push(obj)*/
})
