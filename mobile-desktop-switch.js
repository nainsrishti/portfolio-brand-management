// Script to handle switching between mobile and desktop views
document.addEventListener('DOMContentLoaded', function() {
  // Check viewport size
  const isMobileDevice = window.innerWidth <= 768;
  
  // Check if user already has a preference stored
  const viewPreference = localStorage.getItem('siteViewPreference');
  
  // Set up initial view based on preference
  if (viewPreference === 'desktop' && isMobileDevice) {
    // Apply desktop view if that was user's preference
    switchToDesktopView();
  } else if (viewPreference === 'mobile' || viewPreference === null) {
    // Apply mobile view by default or based on preference
    switchToMobileView();
    
    // On mobile devices, show the desktop view switch popup after a delay
    if (isMobileDevice) {
      setTimeout(function() {
        createViewSwitchPopup();
      }, 3000); // Show after 3 seconds
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    // Reapply the appropriate view on resize
    const currentViewPreference = localStorage.getItem('siteViewPreference');
    const updatedIsMobileDevice = window.innerWidth <= 768;
    
    // Remove popups when window size changes
    const existingPopup = document.getElementById('desktop-view-popup');
    if (existingPopup) {
      existingPopup.remove();
    }
    
    // Make sure the right button is displayed
    if (currentViewPreference === 'desktop' && updatedIsMobileDevice) {
      // Make sure mobile view button exists
      if (!document.getElementById('back-to-mobile-btn')) {
        createMobileViewButton();
      }
    } else {
      // Remove mobile view button if not needed
      const mobileViewButton = document.getElementById('back-to-mobile-btn');
      if (mobileViewButton) {
        mobileViewButton.remove();
      }
    }
  });
});

// Function to create the popup
function createViewSwitchPopup() {
  // Check if popup already exists
  if (document.getElementById('desktop-view-popup')) {
    return;
  }
  
  // Check if the user has already dismissed this popup in this session
  if (sessionStorage.getItem('desktop-popup-dismissed') === 'true') {
    return;
  }
  
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'desktop-view-popup';
  
  // Create popup content
  popup.innerHTML = `
    <div class="popup-content">
      <p>Would you like to switch to desktop view for a better experience?</p>
      <div class="popup-buttons">
        <button id="switch-to-desktop">Switch to Desktop View</button>
        <button id="close-popup">Continue on Mobile</button>
      </div>
    </div>
  `;
  
  // Add popup to the body
  document.body.appendChild(popup);
  
  // Handle switch to desktop button
  document.getElementById('switch-to-desktop').addEventListener('click', function() {
    switchToDesktopView();
    
    // Close the popup
    popup.classList.add('popup-hide');
    setTimeout(() => {
      popup.remove();
    }, 500);
  });
  
  // Handle close button
  document.getElementById('close-popup').addEventListener('click', function() {
    // Close the popup with fade
    popup.classList.add('popup-hide');
    setTimeout(() => {
      popup.remove();
    }, 500);
    
    // Store in session that user has dismissed the popup
    sessionStorage.setItem('desktop-popup-dismissed', 'true');
  });
  
  // Show popup with animation
  setTimeout(() => {
    popup.classList.add('popup-show');
  }, 100);
}

// Function to switch to desktop view
function switchToDesktopView() {
  // Save user preference
  localStorage.setItem('siteViewPreference', 'desktop');
  
  // Set viewport to desktop width (1280px)
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=1280, initial-scale=1.0');
  } else {
    // If viewport meta tag doesn't exist, create one
    const metaTag = document.createElement('meta');
    metaTag.name = 'viewport';
    metaTag.content = 'width=1280, initial-scale=1.0';
    document.head.appendChild(metaTag);
  }
  
  // Add desktop view styles
  document.body.classList.add('desktop-view-on-mobile');
  
  // Create back to mobile button if we're on a mobile device
  if (window.innerWidth <= 768) {
    createMobileViewButton();
  }
}

// Function to switch back to mobile view
function switchToMobileView() {
  // Save user preference
  localStorage.setItem('siteViewPreference', 'mobile');
  
  // Set viewport for mobile - still using 1280 width but with a different scale
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
  }
  
  // Remove desktop view styles
  document.body.classList.remove('desktop-view-on-mobile');
  
  // Remove the back to mobile button if it exists
  const mobileViewButton = document.getElementById('back-to-mobile-btn');
  if (mobileViewButton) {
    mobileViewButton.remove();
  }
}

// Function to create a confirmation popup after switching to desktop view
function createDesktopConfirmationPopup(currentUrl) {
  // Check if popup already exists
  if (document.getElementById('desktop-confirmation-popup')) {
    return;
  }
  
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'desktop-confirmation-popup';
  
  // Create popup content
  popup.innerHTML = `
    <div class="popup-content">
      <p>Would you like to open the desktop version of this site in a new tab?</p>
      <div class="popup-buttons">
        <button id="continue-desktop" class="primary-btn">Continue to Desktop Site</button>
        <button id="switch-back-mobile">Stay on Mobile View</button>
      </div>
    </div>
  `;
  
  // Add popup to the body
  document.body.appendChild(popup);
  
  // Handle continue to desktop button
  document.getElementById('continue-desktop').addEventListener('click', function() {
    // Open the current URL in a new tab with desktop user agent
    window.open(currentUrl, "_blank", "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    
    // Close the popup with fade
    popup.classList.add('popup-hide');
    setTimeout(() => {
      popup.remove();
    }, 500);
  });
  
  // Handle stay on mobile button
  document.getElementById('switch-back-mobile').addEventListener('click', function() {
    // Simply close the popup
    popup.classList.add('popup-hide');
    setTimeout(() => {
      popup.remove();
    }, 500);
  });
  
  // Show popup with animation
  setTimeout(() => {
    popup.classList.add('popup-show');
  }, 100);
}

// Function to create a button to switch back to mobile view
function createMobileViewButton() {
  // Check if button already exists
  if (document.getElementById('back-to-mobile-btn')) {
    return;
  }
  
  // Create the button
  const mobileBtn = document.createElement('button');
  mobileBtn.id = 'back-to-mobile-btn';
  mobileBtn.innerHTML = '<span class="mobile-icon">📱</span> Switch to Mobile View';
  mobileBtn.addEventListener('click', switchToMobileView);
  
  // Add button to the page
  document.body.appendChild(mobileBtn);
  
  // Fade the button in
  setTimeout(() => {
    mobileBtn.classList.add('visible');
  }, 100);
}
