
import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';


document.addEventListener( 'DOMContentLoaded', function () {

  const thumbsRecomended = document.querySelector('.thumbs-recomended__slider');
  const mainRecomended = document.querySelector('.main-recomended__slider');
  if (thumbsRecomended&&mainRecomended) {
    var main = new Splide(mainRecomended, {
      type      : 'fade',
      rewind    : true,
      pagination: false,
      arrows    : false,
    } );
  
    var thumbnails = new Splide(thumbsRecomended, {
      direction: 'ttb',
      heightRatio: 3.5,
      fixedWidth  : 140,
      fixedHeight : 140,
      gap         : 10,
      perPage: 'auto',
      autoplay: true,
      rewind      : true,
      pagination  : false,
      isNavigation: true,
      breakpoints : {
        992: {
          height: '100vw - 11.875rem'
        },
        767: {
          heightRatio: 1,
          fixedWidth : 100,
          fixedHeight: 100,
          direction: 'ltr',
        },
      },
    } );

    
    thumbnails.on('move', (newIndex, prevIndex, destIndex)=>{
      let destination = thumbnails.length - 1;
      destIndex === destination ? thumbsRecomended.classList.add('_ended') : thumbsRecomended.classList.remove('_ended');
      destIndex > 0 ? thumbsRecomended.classList.add('_started') : thumbsRecomended.classList.remove('_started');
    })
  
    main.sync( thumbnails );
    main.mount();
    thumbnails.mount();
  }

  if (document.querySelector('.like-recomended__slider')) {
    new Splide('.like-recomended__slider', {
      type: 'loop',
      perPage: 4,
      perMove: 1,
      gap: 20,
      autoplay: true,
      breakpoints: {
        992: {
          perPage: 3,
        },
        767: {
          perPage: 2,
        },
        480: {
          perPage: 1,
        },
      }
    } ).mount();
  }
} );