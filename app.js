const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log('entry');
    if (entry.isIntersecting) {
      entry.target.classList.add('title-show');
    } else {
      entry.target.classList.remove('title-show');
    }
  });
}, { root: null, threshold: 1 });

const hiddenElements = document.querySelectorAll('.title-hidden');
hiddenElements.forEach((el) => observer.observe(el));

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log('entry');
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('weather-button-show');
      }, 2000); 
    } else {
      entry.target.classList.remove('weather-button-show');
    }
  });
}, { root: null, threshold: 1 });

const hiddenElements1 = document.querySelectorAll('.weather-button-hidden');
hiddenElements1.forEach((el) => observer1.observe(el));
