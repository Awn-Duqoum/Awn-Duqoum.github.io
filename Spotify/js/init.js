$('.slickClass').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  pauseOnHover: false,
  swipeToSlide:true,
  speed: 1000,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		pauseOnHover: false,
		swipeToSlide:true,
		speed: 1000,
		adaptiveHeight: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		pauseOnHover: false,
		swipeToSlide:true,
		speed: 1000,
		adaptiveHeight: true,
      }
    }
  ]
});
	