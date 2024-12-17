function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
  }
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("light");
    } else {
      navbar.classList.remove("light"); 
    }
  });

 

let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    

    if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        navbar.classList.add('hidden');
    } else {
        // Scrolling up - show navbar
        navbar.classList.remove('hidden');
    }

    // Optional: Add blur effect when scrolling up
    if (currentScrollY < lastScrollY) {
        navbar.classList.add('blur');
    } else {
        navbar.classList.remove('blur');
    }

    lastScrollY = currentScrollY;
});


const heading = document.getElementById('banner-text-p');
const text = "Monitor, Evaluate, and Manage Your Air Quality with Precision Tools."; // Text you want to display

let index = 0;
let isDeleting = false; 

function typeText() {
    if (isDeleting) {
     
        heading.innerHTML = text.substring(0, index);
        index--;
        
        if (index === 0) {
            isDeleting = false; 
            setTimeout(typeText, 500); 
        } else {
            setTimeout(typeText, 80); 
        }
    } else {
      
        heading.innerHTML = text.substring(0, index);
        index++;

        if (index === text.length) {
            isDeleting = true; 
            setTimeout(typeText, 500); 
        } else {
            setTimeout(typeText, 50); 
        }
    }
}


window.onload = typeText;

document.getElementById("search-button").addEventListener("click", handleSearch);

document.getElementById("location-search").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

function handleSearch() {
  const location = document.getElementById("location-search").value;

  if (location.trim()) {
    getCoordinates(location);
  } else {
    alert("Please enter a valid location.");
  }
}

function getCoordinates(location) {
  const apiKey = "b87c1e99cd7f47a295c15e3101ae9fce"; 
  const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

  fetch(geocodeURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const lat = data.results[0].geometry.lat;
        const lon = data.results[0].geometry.lng;

        updateMap(lat, lon);
      } else {
        alert("Location not found. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to fetch location. Please try again later.");
    });
}

function updateMap(lat, lon) {
  const iframe = document.getElementById("windy-frame");

 
  iframe.src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=10&level=surface&overlay=pm2p5&menu=&message=&marker=true&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=${lat}&detailLon=${lon}&metricWind=default&metricTemp=default&radarRange=-1&stations`;
}










 