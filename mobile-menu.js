// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Toggle mobile menu when hamburger icon is clicked
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Toggle hamburger/close icon state
      const spans = this.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when a nav link is clicked
    const navLinkElements = document.querySelectorAll('.nav-links a');
    navLinkElements.forEach(link => {
      link.addEventListener('click', function() {
        // Only perform this action on mobile
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          
          // Reset hamburger icon
          const spans = mobileMenuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }
  
  // Check for screen resize to reset mobile menu state
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      
      if (mobileMenuToggle) {
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });
});

// Ensure splash animation works correctly on mobile
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on mobile
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Adjust splash animation behavior for mobile if needed
    const heroDivs = document.querySelectorAll('.image-slider > div');
    
    // Hide some images on mobile
    for (let i = 3; i < heroDivs.length; i++) {
      heroDivs[i].style.display = 'none';
    }
    
    // Remove skew transformation on mobile
    heroDivs.forEach(div => {
      div.style.transform = 'skewY(0deg)';
    });
  }
});
