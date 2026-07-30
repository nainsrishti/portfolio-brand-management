// Modal Gallery
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.modal-close');
const prevButton = document.querySelector('.modal-prev');
const nextButton = document.querySelector('.modal-next');
const sliderImages = document.querySelectorAll('.image-slider > div');
let currentIndex = 0;

sliderImages.forEach((div, index) => {
  div.addEventListener('click', () => {
    currentIndex = parseInt(div.getAttribute('data-index'));
    updateModalImage();
    modal.classList.add('active');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
  updateModalImage();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % sliderImages.length;
  updateModalImage();
});

function updateModalImage() {
  const img = sliderImages[currentIndex].querySelector('img');
  modalImage.src = img.src;
  modalImage.alt = img.alt;
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});

// Smooth Scrolling
document.querySelectorAll('.nav-links a:not([href="#home"])').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});

// Global cursor management
let globalCursor = null;

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const cursor = document.getElementById('custom-cursor');
  globalCursor = cursor;
  
  // Hide cursor during splash animation
  if (cursor) {
    cursor.style.display = 'none';
    setTimeout(() => {
      cursor.style.display = 'block';
    }, 3000); // Show cursor after 3 seconds
  }

  const slider = document.querySelector('.image-slider');
  if (!slider) return;

  // --- Hero image dimming logic ---
  const heroDivs = slider.querySelectorAll('.hero-img-div1, .hero-img-div2, .hero-img-div3, .hero-img-div4, .hero-img-div5, .hero-img-div6');
  heroDivs.forEach(div => {
    div.addEventListener('mouseenter', () => {
      if (body.classList.contains('splash-active')) return;
      heroDivs.forEach(sib => {
        sib.style.opacity = sib === div ? '1' : '0.1';
      });
    });
  });
  slider.addEventListener('mouseleave', () => {
    if (body.classList.contains('splash-active')) return;
    heroDivs.forEach(sib => {
      sib.style.opacity = '1';
    });
  });

  // Remove splash active class after animation
  setTimeout(() => {
    body.classList.remove('splash-active');
  }, 2500);
});

// --- Custom Cursor for Project Cards ---
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('custom-cursor');
  const projectCards = document.querySelectorAll('.project-card');
  const body = document.body;

  function moveCursor(e) {
    if (body.classList.contains('splash-active')) return;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (body.classList.contains('splash-active')) return;
      cursor.classList.add('active');
    });
    card.addEventListener('mouseleave', () => {
      if (body.classList.contains('splash-active')) return;
      cursor.classList.remove('active');
    });
    card.addEventListener('mousemove', moveCursor);
  });

  // Hide cursor when not on a project card
  document.body.addEventListener('mousemove', (e) => {
    if (body.classList.contains('splash-active')) return;
    if (![...projectCards].some(card => card.matches(':hover'))) {
      cursor.classList.remove('active');
    }
  });
});

//button - resume
document.addEventListener('DOMContentLoaded', () => {
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function () {
      window.open('assets/resume.pdf', '_blank');
    });
  }
});

// Smooth scroll for "Read More"
document.querySelector('.read-more').addEventListener('click', function() {
  document.querySelector('.bio-section').scrollIntoView({ 
      behavior: 'smooth' 
  });
});

