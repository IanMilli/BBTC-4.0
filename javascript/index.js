// =======================================================
// THEME HANDLING
// =======================================================

// Load saved theme from localStorage when the page is ready
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "theme-dark"; // Default to dark theme
  document.body.classList.add(savedTheme); // Apply saved theme class to body

  const themeSelector = document.getElementById("themeSelector");
  if (themeSelector) {
    themeSelector.value = savedTheme; // Ensure dropdown matches saved theme
  }
});

// Change theme based on selector input and save to localStorage
function selectTheme(theme) {
  // Remove all possible theme classes
  document.body.classList.remove(
    "theme-light",
    "theme-dark",
    "theme-high-contrast",
    "theme-sepia",
    "theme-night"
  );
  // Apply new theme
  document.body.classList.add(theme);
  // Save choice for future visits
  localStorage.setItem("theme", theme);
}

// =======================================================
// TYPING EFFECT
// =======================================================

// Constructor for typing animation
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate; // Array of words/phrases to type
  this.el = el; // Target HTML element
  this.loopNum = 0; // Current index in toRotate
  this.period = parseInt(period, 10) || 2000; // Delay between full word displays
  this.txt = ''; // Current text being displayed
  this.tick(); // Start typing
  this.isDeleting = false; // Whether we are deleting characters
};

// Core typing effect logic
TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length; // Loop over phrases
  var fullTxt = this.toRotate[i]; // Current phrase

  // Either add or remove a character
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Display text in span
  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  // Adjust typing speed randomly for a more human feel
  var that = this;
  var delta = 200 - Math.random() * 100;
  if (this.isDeleting) { delta /= 2; } // Faster when deleting

  // Pause before starting to delete
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  }
  // Finished deleting, move to next word
  else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  // Continue loop
  setTimeout(function () {
    that.tick();
  }, delta);
};

// Initialize typing effect on window load
window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // Inject CSS for typing cursor
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

// =======================================================
// GLOBAL ANIMATION SETTINGS
// =======================================================

// Set default duration for CSS animations
document.documentElement.style.setProperty('--animate-duration', '7s');

// =======================================================
// FADE-IN SECTIONS ON SCROLL
// =======================================================

document.addEventListener('DOMContentLoaded', function () {
  const faders = document.querySelectorAll('.fade-section');

  // IntersectionObserver triggers fade in/out when sections enter/exit viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Fade in
      } else {
        entry.target.classList.remove('visible'); // Fade out
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of element is visible
  });

  faders.forEach(fadeSection => {
    observer.observe(fadeSection);
  });
});

// =======================================================
// FONT SIZE ADJUSTMENT (MOBILE-FRIENDLY + RESIZE-AWARE)
// =======================================================

// Adjusts body font size and updates screen reader live region
function adjustFontSize(size) { 
  document.body.style.fontSize = size + 'px';

  // Update accessibility live region so screen readers announce the change
  document.getElementById("screenReaderOutput").textContent =
    `Font size adjusted to ${size} pixels`;

  // Force reflow to ensure smaller font sizes apply instantly on mobile browsers
  document.body.style.display = 'none';
  document.body.offsetHeight; // Trigger reflow
  document.body.style.display = '';
}

// Applies the correct default font size based on screen width
function applyDefaultFontSizeForScreen() {
  const slider = document.getElementById("fontSizeSlider");
  const minSize = parseInt(slider.min, 10);

  if (window.matchMedia("(max-width: 768px)").matches) {
    // Mobile: set to smallest font size
    adjustFontSize(minSize);
    slider.value = minSize;
  } else {
    // Desktop: keep whatever slider says
    adjustFontSize(parseInt(slider.value, 10));
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", function () {
  adjustFontSize();
    slider.value = 7;

  // Live update when slider changes
  document.getElementById("fontSizeSlider").addEventListener("input", function () {
    adjustFontSize(this.value);
  });
});

// Also run whenever the window is resized or device orientation changes
window.addEventListener("resize", applyDefaultFontSizeForScreen);

//adjustnavbar to remove dropup class
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbarSupportedContent");

  function updateNavbarClass() {
    if (window.innerWidth <= 768) {
      navbar.classList.remove("dropup"); // Replace with the class you want removed
    } else {
      navbar.classList.add("dropup"); // Optional: Add back on desktop
    }
  }

  // Run on load and on resize
  updateNavbarClass();
  window.addEventListener("resize", updateNavbarClass);
});