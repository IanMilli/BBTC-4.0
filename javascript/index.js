// Load saved theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "theme-dark";
  document.body.classList.add(savedTheme);

  const themeSelector = document.getElementById("themeSelector");
  if (themeSelector) {
    themeSelector.value = savedTheme;
  }
});

// Handle theme change from selector
function selectTheme(theme) {
  document.body.classList.remove(
    "theme-light",
    "theme-dark",
    "theme-high-contrast",
    "theme-sepia",
    "theme-night"
  );
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}
function selectTheme(theme) {
  document.body.classList.remove(
    "theme-light",
    "theme-dark",
    "theme-high-contrast",
    "theme-sepia",
    "theme-night"
  );
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}

// Typing effect
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

// Set animation duration globally
document.documentElement.style.setProperty('--animate-duration', '7s');

document.addEventListener('DOMContentLoaded', function () {
  const faders = document.querySelectorAll('.fade-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Fade in
      } else {
        entry.target.classList.remove('visible'); // Fade out
      }
    });
  }, {
    threshold: 0.1 // Adjust as needed
  });

  faders.forEach(fadeSection => {
    observer.observe(fadeSection);
  });
});