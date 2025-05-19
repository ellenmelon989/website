const images = [
    'images/waterlilies.jpg',
    'images/waterlilies3.jpg',
    'images/wl4.jpg',
    'images/wl6.jpg',
    'images/wl7.jpg'
  ];
  const fontColors = [
  '#f4ecd8', // ivory
  '#c8f2ff', // light blue
  '#f9d1c0',  // rose
  '#fffa9e', // pastel yellow
  '#e7d5ef', // purple
  ];
  const darkFontColors = [
    '#3c3324', // dark ivory (taupe)
    '#1e3f4f', // dark blue
    '#b05a4e', // deep rose
    '#a49329', // antique gold
    '#7c5c8a', // dark lavender
  ];

  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Preload all images
  const preloaded = images.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });

  function generateWaveSVG(color, direction) {
    // Choose path based on wave direction
    const pathD = direction === 'up'
      ? 'M0 3 Q5 0 10 3 T20 3 T30 3 T40 3'
      : 'M0 3 Q5 6 10 3 T20 3 T30 3 T40 3';
  
    // Create the SVG string with dynamic stroke color
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 6'>
        <path d='${pathD}' fill='none' stroke='${color}' stroke-width='1.5' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round'/>
      </svg>
    `;
  
    // URL-encode and format it as a data URI
    const encoded = encodeURIComponent(svg.trim());
    return `url("data:image/svg+xml,${encoded}")`;
  }

  let index = 0;
  let wave = true;

  function changeBackground() {
    // const bg = document.getElementById('background');
    const current = images[index];
    const currentColor = fontColors[index];

    // if (!document.body.classList.contains("proj")){
    document.body.style.backgroundImage = `url('${current}')`;
    // }
    document.body.style.backgroundSize = '100% 100%';
    document.body.style.backgroundColor = '';
    
    const pover = document.querySelector('.poverlay');
    if (pover){
      pover.style.backgroundColor = hexToRGBA(currentColor, 0.5);
    }
    const overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.style.color = currentColor;
      }

    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.style.color = currentColor;
    });
  //   if (document.body.classList.contains("proj")){
  //     navLinks.forEach(link => {
  //       link.style.color = darkFontColors[index];
  //   });
  // }

    const waveColor = fontColors[index]; // or dynamically based on image index
    const waveDirection = wave ? 'up' : 'down';
    wave = !wave;

    const waveImage = generateWaveSVG(waveColor, waveDirection);

    // Apply to each link's ::after pseudo-element
    navLinks.forEach(link => {
        link.style.setProperty('--wave-image', waveImage);
        // link.style.color = currentColor;
    });

    const heading = document.querySelector('.about h1');
    if (heading){
      heading.style.color = darkFontColors[index];
      heading.style.backgroundColor = hexToRGBA(currentColor, 0.5);
    }

    // const navLinks = document.querySelectorAll('nav a');

    // navLinks.forEach(link => {
    //     link.style.color = currentColor;
    // });

    index = (index + 1) % images.length;
  }

  // function button(){
  //   const gallery = document.querySelector('.gallery');
  //   const scrollAmount = 300; // Adjust this value based on the width of your gallery items

  //   // Add event listeners for navigation buttons
  //   const prevButton = document.querySelector('.prev');
  //   const nextButton = document.querySelector('.next');

  //   if (prevButton && nextButton) {
  //     prevButton.addEventListener('click', () => {
  //       gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  //     });

  //     nextButton.addEventListener('click', () => {
  //       gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  //     });
  //   }
    // // Ensure the gallery scrolls smoothly
    // gallery.style.scrollBehavior = 'smooth';
  // }
  let currentSection = 0;
  const gal = document.querySelector('.gallery');
  const totalSections = document.querySelectorAll('.gallery-item').length;
  
  document.addEventListener('click', (e) => {
    const clickX = e.clientX;
    const half = window.innerWidth / 2;
  
    if (clickX > half && currentSection < totalSections - 1) {
      currentSection++;
    } else if (clickX < half && currentSection > 0) {
      currentSection--;
    }
  
    gal.style.transform = `translateX(-${currentSection * 100}vw)`;
  });

  // Initial call
  changeBackground();
  setInterval(changeBackground, 1000);
  // button();