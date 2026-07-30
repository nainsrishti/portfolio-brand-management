 function runSplashAnimation() {
  const body = document.body;
  body.classList.add('splash-active');

  const slider = document.querySelector('.image-slider');
  const heroDivs = document.querySelectorAll('.hero-img-div1, .hero-img-div2, .hero-img-div3, .hero-img-div4, .hero-img-div5, .hero-img-div6');
  const navbar = document.querySelector('.navbar');
  const otherContent = document.querySelectorAll('main, section');

  // Hide navbar and other content initially
  navbar.style.display = 'none';
  otherContent.forEach(el => el.style.display = 'none');

  // Clear any existing animations
  clearTimeout(window.splashAnimationTimeout);
  
  // Define all the animation states explicitly
  const PHASE = {
    INITIAL: 'initial',
    STACKING: 'stacking',
    SKEWING: 'skewing',
    SPREADING: 'spreading',
    COMPLETE: 'complete'
  };
  
  let currentPhase = PHASE.INITIAL;
  
  // Calculate center position for stacking
  const divWidth = heroDivs[0].offsetWidth;
  const divHeight = heroDivs[0].offsetHeight;
  const centerLeft = (slider.offsetWidth - divWidth) / 2;
  const centerTop = (slider.offsetHeight - divHeight) / 2;

  // Set initial state: centered, no transformation, hidden
  heroDivs.forEach(div => {
    div.style.position = 'absolute';
    div.style.left = `${centerLeft}px`;
    div.style.top = `${centerTop}px`;
    div.style.transform = 'none';
    div.style.opacity = '0';
    div.style.margin = '0';
    // Make the cards slightly larger during the stacking phase
    div.style.width = '12rem'; // Increased from default 10rem
    div.style.height = '18rem'; // Increased from default 15rem
    // Set a quick transition for opacity, but not for transform yet
    div.style.transition = 'opacity 0.2s ease';
  });

  // PHASE 1: Stack cards one by one (0-1.0s)
  currentPhase = PHASE.STACKING;
  let delay = 50; // Small initial delay
  
  // First 5 cards stack normally
  for (let i = 0; i < 5; i++) {
    window.splashAnimationTimeout = setTimeout(() => {
      heroDivs[i].style.opacity = '1';
      heroDivs[i].style.zIndex = i + 1;
    }, delay);
    delay += 200;
  }
  
  // PHASE 2: Last card comes in with skew and all others follow (at 1.1s)
  window.splashAnimationTimeout = setTimeout(() => {
    currentPhase = PHASE.SKEWING;
    console.log('Starting skew phase');
    
    // First, make the last card appear with skew - make this very noticeable
    const lastDiv = heroDivs[5];
    lastDiv.style.opacity = '1';
    lastDiv.style.zIndex = 6;
    lastDiv.style.transform = 'skewY(-40deg)'; // More extreme initial skew
    
    // After a longer delay, skew all other cards
    window.splashAnimationTimeout = setTimeout(() => {
      console.log('Skewing all cards');
      
      // Now add transition to transforms for smooth skewing with longer duration
      heroDivs.forEach(div => {
        div.style.transition = 'opacity 0.2s ease, transform 0.8s ease-in-out'; // Longer transform transition
      });
      
      // Apply skew to all other cards - first 2 cards
      for (let i = 0; i < 2; i++) {
        heroDivs[i].style.transform = 'skewY(-40deg)';
      }
      
      // Then second set of cards with a delay
      window.splashAnimationTimeout = setTimeout(() => {
        for (let i = 2; i < 5; i++) {
          heroDivs[i].style.transform = 'skewY(-40deg)';
        }
      }, 200);
      
      // After longer skewing phase, normalize to final skew angle
      window.splashAnimationTimeout = setTimeout(() => {
        console.log('Normalizing skew angle');
        // Set all cards to final skew angle
        heroDivs.forEach(div => {
          div.style.transform = 'skewY(-25deg)';
          // Don't change size yet - keep the larger size until spreading
        });
        
        // Hold this state longer before continuing - increased to 800ms
        window.splashAnimationTimeout = setTimeout(() => {
          // Show navbar
          navbar.style.display = 'flex';
          navbar.style.opacity = '0';
          window.splashAnimationTimeout = setTimeout(() => {
            navbar.style.transition = 'opacity 0.3s ease';
            navbar.style.opacity = '1';
          }, 10);
          
          // PHASE 3: Spread horizontally - delayed significantly longer to ensure skew is fully visible
          window.splashAnimationTimeout = setTimeout(() => {
            currentPhase = PHASE.SPREADING;
            console.log('Starting spread phase');
            
            // Dispatch custom event that spreading is starting - for cursor management
            window.dispatchEvent(new CustomEvent('splash-spreading-start'));
            
            // Ensure cards maintain their skew during horizontal spread
            heroDivs.forEach((div, index) => {
              // Important: Set up transition before changing position - include width and height for smooth size transition
              div.style.transition = 'transform 0.4s ease-out, margin 0.8s ease-out, left 0.8s ease-out, top 0.8s ease-out, position 0s linear, width 0.8s ease-out, height 0.8s ease-out';
              
              // Use a slight delay before changing position properties
              window.splashAnimationTimeout = setTimeout(() => {
                // Remove absolute positioning to let flow layout take over
                div.style.position = '';
                div.style.left = '';
                div.style.top = '';
                
                // Reset to original dimensions during the spread - happens simultaneously with position change
                div.style.width = '10rem';
                div.style.height = '15rem';
                
                // Apply margins for horizontal spread while maintaining skew
                if (index === 0) { // hero-img-div1
                  div.style.margin = '5rem 0.5rem 0rem -3.75rem';
                } else if (index === 1) { // hero-img-div2
                  div.style.marginTop = '5rem';
                  div.style.marginLeft = '-3.75rem';
                } else if (index === 2) { // hero-img-div3
                  div.style.marginTop = '5rem';
                  div.style.marginLeft = '-3.75rem';
                  div.style.marginBottom = '-1.25rem';
                } else if (index === 3) { // hero-img-div4
                  div.style.marginTop = '5rem';
                  div.style.marginLeft = '-3.75rem';
                  div.style.marginBottom = '-2.5rem';
                } else if (index === 4) { // hero-img-div5
                  div.style.marginTop = '5rem';
                  div.style.marginLeft = '-3.75rem';
                  div.style.marginBottom = '-3.75rem';
                } else if (index === 5) { // hero-img-div6
                  div.style.marginTop = '5rem';
                  div.style.marginLeft = '-3.75rem';
                  div.style.marginBottom = '-5rem';
                }
              }, 50); // Small delay before applying new position properties
            });
            
            // PHASE 4: Complete animation and show content
            window.splashAnimationTimeout = setTimeout(() => {
              currentPhase = PHASE.COMPLETE;
              console.log('Animation complete');
              
              // Dispatch custom event that spreading is complete - for cursor management
              window.dispatchEvent(new CustomEvent('splash-spreading-complete'));
              
              // Show other content
              otherContent.forEach(el => {
                el.style.display = 'block';
                el.style.opacity = '0';
                window.splashAnimationTimeout = setTimeout(() => {
                  el.style.transition = 'opacity 0.3s ease';
                  el.style.opacity = '1';
                }, 10);
              });
              
              // Cleanup
              body.classList.remove('splash-active');
              body.classList.add('post-splash-transition');
              
              heroDivs.forEach(div => {
                div.classList.add('post-splash');
              });
              
              // Final state
              window.splashAnimationTimeout = setTimeout(() => {
                body.classList.remove('post-splash-transition');
                
                heroDivs.forEach(div => {
                  // Clean up transitions
                  div.style.transition = '';
                  // Keep only the skew
                  div.style.transform = 'skewY(-25deg)';
                  div.classList.remove('post-splash');
                });
              }, 500);
            }, 1000); // Complete after spread is done - increased from 800ms to 1000ms
          }, 1000); // Start spreading phase - increased from 500ms to 1000ms
        }, 500); // Show navbar - increased from 300ms to 500ms
      }, 600); // Normalize skew - increased from 300ms to 600ms
    }, 500); // Skew all cards - increased from 300ms to 500ms
  }, 1100); // Last card appears with skew
}

document.addEventListener('DOMContentLoaded', () => {
  // Skip splash animation on mobile devices
  if (window.innerWidth <= 768) {
    skipSplash();
  } else {
    runSplashAnimation();
  }

  // Home nav link triggers splash
  const homeLink = document.querySelector('.nav-links a[href="#home"]');
  if (homeLink) {
    homeLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Hard reset all animation elements
      const slider = document.querySelector('.image-slider');
      const heroDivs = document.querySelectorAll('.hero-img-div1, .hero-img-div2, .hero-img-div3, .hero-img-div4, .hero-img-div5, .hero-img-div6');
      const navbar = document.querySelector('.navbar');
      const otherContent = document.querySelectorAll('main, section');

      // Reset body classes
      document.body.classList.remove('post-splash-transition');
      document.body.classList.remove('splash-active');
      
      // Reset all elements
      heroDivs.forEach(div => {
        // Remove all classes and inline styles
        div.classList.remove('post-splash');
        div.removeAttribute('style');
      });
      
      // Force browser to acknowledge style changes before starting new animation
      const forceReflow = heroDivs[0].offsetHeight;
      
      // Scroll to top immediately to ensure animation is visible
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Skip animation on mobile devices
      if (window.innerWidth <= 768) {
        skipSplash();
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
      } else {
        // On desktop, run animation after a short delay to ensure reset is complete
        setTimeout(() => {
          runSplashAnimation();
        }, 150);
      }
    });
  }
});

// Tilt Effect for Image Slider Cards
const sliderCards = document.querySelectorAll('.image-slider > div');
const body = document.body;

// Define the tilt function
function applyTilt(card) {
  return function (e) {
    // Skip tilt during animations
    if (body.classList.contains('splash-active') || body.classList.contains('post-splash-transition')) {
      return;
    }
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / rect.height) * -15;
    const rotateY = (mouseX / rect.width) * 15;

    // Add perspective and maintain skew
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) skewY(-25deg)`;
  };
}

function resetTilt(card) {
  return function () {
    // Skip reset during animations
    if (body.classList.contains('splash-active') || body.classList.contains('post-splash-transition')) {
      return;
    }
    
    // Return to skewed state
    card.style.transform = 'skewY(-25deg)';
  };
}

// Re-enable tilt effect after splash ends
setTimeout(() => {
  sliderCards.forEach(card => {
    const tiltHandler = applyTilt(card);
    const resetHandler = resetTilt(card);
    
    card.addEventListener('mousemove', tiltHandler);
    card.addEventListener('mouseleave', resetHandler);
  });
}, 3000); // Increased delay to ensure animation is complete

