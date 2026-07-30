// Enhanced Custom Cursor Management
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("custom-cursor");
  const body = document.body;
  let timeout;
  
  // Initial cursor state - hidden during page load and splash animation
  cursor.style.display = 'none';
  
  // Cursor management variables
  let initialLoadTime = Date.now();
  let cursorInitiallyDisabled = true;
  
  // Create a function to check if we're in splash mode
  function isSplashActive() {
    return body.classList.contains('splash-active');
  }
  
  // Set a timer to enable the cursor after initial 7 second delay
  setTimeout(() => {
    cursorInitiallyDisabled = false;
    // Only show cursor if not in splash mode
    if (!isSplashActive()) {
      cursor.style.display = 'block';
    }
  }, 7000); // Initial 7 second delay
  
  // Function to handle cursor movement and state
  function handleCursorMovement(e) {
    // Calculate time elapsed since page load
    const timeElapsed = Date.now() - initialLoadTime;
    
    // Don't show cursor during following conditions:
    // 1. During splash animation
    // 2. During initial page load delay (7 seconds)
    if (isSplashActive() || timeElapsed < 7000) {
      cursor.style.display = 'none';
      return;
    }
    
    // If cursor should be enabled after initial delay
    if (cursorInitiallyDisabled && timeElapsed >= 7000) {
      cursorInitiallyDisabled = false;
    }
    
    const x = e.clientX;
    const y = e.clientY;
    
    // Check if hovering over text or interactive elements
    const element = document.elementFromPoint(x, y);
    
    // Check for footer links in about.html
    const isFooterLink = element && element.closest && (
      element.closest('footer a') || 
      element.closest('.footer-links a') ||
      (window.location.pathname.includes('about.html') && element.closest('footer'))
    );
    
    const isTextOrInput = element && (
      element.tagName === 'P' || 
      element.tagName === 'H1' || 
      element.tagName === 'H2' || 
      element.tagName === 'H3' || 
      element.tagName === 'H4' || 
      element.tagName === 'H5' || 
      element.tagName === 'H6' || 
      element.tagName === 'SPAN' ||
      element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT' ||
      isFooterLink
    );
    const isProjectImage = element && element.closest && element.closest('.project-image');
    
    if (!isTextOrInput) {
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
      cursor.style.display = "flex";
      
      if (isProjectImage) {
        cursor.classList.add('arrow-cursor');
      } else {
        cursor.classList.remove('arrow-cursor');
      }
    } else {
      cursor.style.display = "none";
      cursor.classList.remove('arrow-cursor');
    }
    
    // Hide cursor when mouse stops moving
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cursor.style.display = "none";
      cursor.classList.remove('arrow-cursor');
    }, 1000);
  }
  
  // Add event listener for mouse movement
  document.addEventListener("mousemove", handleCursorMovement);
  
  // Show cursor when mouse enters the window (but not during splash)
  document.addEventListener("mouseenter", () => {
    if (!isSplashActive()) {
      cursor.style.display = "flex";
    }
  });
  
  // Hide cursor when mouse leaves the window
  document.addEventListener("mouseleave", () => {
    cursor.style.display = "none";
    cursor.classList.remove('arrow-cursor');
  });
  
  // Modify your splash animation to handle cursor properly
  // At the end of the splash animation, show the cursor
  const splashEnd = () => {
    body.classList.remove('splash-active');
    // Only show cursor if mouse is moving
    document.dispatchEvent(new MouseEvent('mousemove', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    }));
  };
  
  // Override the existing splash animation end
  const originalRunSplashAnimation = window.runSplashAnimation;
  if (typeof originalRunSplashAnimation === 'function') {
    window.runSplashAnimation = function() {
      // Call original splash animation
      originalRunSplashAnimation();
      
      // Ensure cursor stays hidden during splash
      cursor.style.display = 'none';
      
      // Enable cursor after splash animation completes
      setTimeout(splashEnd, 3000); // Adjust this to match your animation duration
    };
  } else {
    // If the splash function isn't defined yet, handle by observing class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const classList = mutation.target.classList;
          if (!classList.contains('splash-active') && mutation.oldValue?.includes('splash-active')) {
            // Splash was active but now it's not
            setTimeout(() => {
              document.dispatchEvent(new MouseEvent('mousemove', {
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight / 2
              }));
            }, 100);
          }
        }
      });
    });
    
    // Start observing body class changes
    observer.observe(body, { 
      attributes: true, 
      attributeFilter: ['class'],
      attributeOldValue: true
    });
    
    // For safety, enable cursor after 3 seconds if splash hasn't ended
    setTimeout(() => {
      if (!isSplashActive()) {
        document.dispatchEvent(new MouseEvent('mousemove', {
          clientX: window.innerWidth / 2,
          clientY: window.innerHeight / 2
        }));
      }
    }, 3000);
  }
});

//disable cursor for 1st 10 seconds
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("custom-cursor");

  // 1) Hide all cursors immediately
  document.documentElement.style.cursor = "none";
  if (cursor) cursor.style.display = "none";

  // 2) After 7 seconds, restore normal cursor and your custom cursor logic
  setTimeout(() => {
    // restore browser cursor
    document.documentElement.style.cursor = "";

    // show your custom cursor (or re-attach your mousemove handler here)
    if (cursor) cursor.style.display = "flex";

    // now you can start listening for mousemove, etc.
    // document.addEventListener("mousemove", handleCursorMovement);
  }, 9000);
});
