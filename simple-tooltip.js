// Simple standalone tooltip implementation
document.addEventListener('DOMContentLoaded', () => {
  // Create a floating tooltip element that follows the cursor
  const floatingTooltip = document.createElement('div');
  floatingTooltip.id = 'floating-tooltip';
  floatingTooltip.style.position = 'fixed';
  floatingTooltip.style.background = 'rgba(26, 26, 26, 0.9)';
  floatingTooltip.style.color = '#f7f7f7';
  floatingTooltip.style.padding = '0.5rem 1rem';
  floatingTooltip.style.borderRadius = '8px';
  floatingTooltip.style.fontSize = '0.8rem';
  floatingTooltip.style.fontWeight = '500';
  floatingTooltip.style.whiteSpace = 'normal'; // Allow text wrapping
  floatingTooltip.style.zIndex = '999999';
  floatingTooltip.style.pointerEvents = 'none';
  floatingTooltip.style.opacity = '0';
  floatingTooltip.style.transition = 'opacity 0.3s ease';
  floatingTooltip.style.backdropFilter = 'blur(5px)';
  floatingTooltip.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
  document.body.appendChild(floatingTooltip);

  // Get all hero image divs
  const heroImgDivs = document.querySelectorAll('.hero-img-div1, .hero-img-div2, .hero-img-div3, .hero-img-div4, .hero-img-div5, .hero-img-div6');
  
  // Add event listeners to each div
  heroImgDivs.forEach(div => {
    // Show tooltip on mouseenter
    div.addEventListener('mouseenter', (e) => {
      if (document.body.classList.contains('splash-active')) return;
      
      const tooltipText = div.getAttribute('title') || div.getAttribute('data-alt');
      if (!tooltipText) return;
      
      // Store original title and remove it to prevent default browser tooltip
      div.dataset.originalTitle = tooltipText;
      div.removeAttribute('title');
      
      // Position tooltip below the card with matching width
      const divRect = div.getBoundingClientRect();
      
      // Format tooltip text to balance words across lines with specific handling
      const balanceText = (text) => {
        // Special case for "Doing my fav work, Public Speaking"
        if (text.includes("Public Speaking")) {
          return "Doing my fav work,<br>Public Speaking";
        }
        
        const words = text.split(' ');
        if (words.length <= 3) return text; // For short text, no need to balance
        
        const midpoint = Math.ceil(words.length / 2);
        const firstLine = words.slice(0, midpoint).join(' ');
        const secondLine = words.slice(midpoint).join(' ');
        return `${firstLine}<br>${secondLine}`;
      };
      
      floatingTooltip.innerHTML = balanceText(tooltipText);
      floatingTooltip.style.width = `${divRect.width}px`;
      floatingTooltip.style.maxWidth = `${divRect.width}px`;
      floatingTooltip.style.left = `${divRect.left + divRect.width/2}px`;
      floatingTooltip.style.top = `${divRect.bottom + 20}px`;
      floatingTooltip.style.transform = 'translateX(-50%)';
      floatingTooltip.style.opacity = '1';
      floatingTooltip.style.textAlign = 'center';
    });
    
    // Hide tooltip on mouseleave
    div.addEventListener('mouseleave', () => {
      floatingTooltip.style.opacity = '0';
      
      // Restore original title
      if (div.dataset.originalTitle) {
        div.setAttribute('title', div.dataset.originalTitle);
        div.removeAttribute('data-originalTitle');
      }
    });
    
    // Update tooltip position on mousemove
    div.addEventListener('mousemove', (e) => {
      if (document.body.classList.contains('splash-active')) return;
      if (floatingTooltip.style.opacity !== '1') return;
      
      // Get current tooltip text if we need to update it
      const tooltipText = div.getAttribute('data-alt') || div.dataset.originalTitle;
      
      const divRect = div.getBoundingClientRect();
      // Maintain consistent width and positioning
      floatingTooltip.style.width = `${divRect.width}px`;
      floatingTooltip.style.maxWidth = `${divRect.width}px`;
      floatingTooltip.style.left = `${divRect.left + divRect.width/2}px`;
      floatingTooltip.style.top = `${divRect.bottom + 20}px`;
      floatingTooltip.style.transform = 'translateX(-50%)';
    });
  });
});
