const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// unsplash api
const count = 10;
const apiKey = config.MY_KEY;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links and photos and to DOM
function displayPhotos() {
  // run function for each object in photo array
  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // put <img> inside <a>, then put both inside image container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// GET photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// on load
getPhotos();
