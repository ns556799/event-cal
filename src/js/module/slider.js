import Swiper from 'swiper'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyBK5S7EVKSV_2ES3-muFOLrO89TnnDj8QU',
  authDomain: 'events-page-2ccc5.firebaseapp.com',
  databaseURL: 'https://events-page-2ccc5.firebaseio.com',
  projectId: 'events-page-2ccc5',
  storageBucket: 'events-page-2ccc5.appspot.com',
  messagingSenderId: '894680186886'
}

const mySwiper = new Swiper('.swiper-container', {
  speed: 400,
  slidesPerView: 3,
  spaceBetween: 40,
  // Responsive breakpoints
  breakpoints: {
    // when window width is <= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is <= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is <= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
})

firebase.initializeApp(config)
const ref = firebase.database().ref('/events')
const eventWrapper = document.querySelector('.js-container')
let calEvents = []

ref.orderByChild('date').on('value', function(snapshot) {
  console.log('helloworld')

  snapshot.forEach(function(child, i) {
    const {
      title,
      location,
      date,
      enddate,
      imageURL,
      brands,
      email,
      url} = child.val()
    console.log(title)

    const key = child.key
    mySwiper.addSlide(i, [
      `<div class="swiper-slide">
        <div class="slider-cal-el">
        <div class="slider-cal-el__img" style="background-image: url(${imageURL})">
        
</div>
<div class="slider-cal-el__content">
    <div class="slider-cal-el__title">
    ${title}
</div>
<div class="slider-cal-el__date">
    ${date}
</div>
<div class="slider-cal-el__location">
    ${location}
</div>
</div>
</div>

</div>`
    ])
  })
}, function (errorObject) {
  console.log('The read failed: ' + errorObject.code)
})
