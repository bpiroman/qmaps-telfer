//  .. OpenStreetMap
const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 25, attribution: "" });

// Image collection obect
const imageCollection = [
  { id: "lyrTelfer2024", name: "Telfer 2024", datetime: "May 2024", pixel_size: "10cm", pngURL: "https://hel1.your-objectstorage.com/qmaps-telfer/telfer-2024/{z}/{x}/{y}.png", maxNativeZoom: 19 }
];

//Map
const map = L.map('map', {
  center: [-21.749708062334705, 122.23204945166214],
  zoom: 15,
  layers: [osm],
  attributionControl: false
});

//Add Legend
// var overlaymaps = {};

// var layerControl = L.control.layers(null, overlaymaps, { collapsed: false }).addTo(map);


let imageOverlay;

function addLatestOverlay(latestFeature) {
  if (latestFeature) {
    console.log(latestFeature[0]);
    imageOverlay = L.tileLayer(latestFeature[0].pngURL, { tms: true, maxZoom: 25, maxNativeZoom: latestFeature[0].maxNativeZoom, attribution: "" }).addTo(map);
    const title = document.getElementById('nameFeature');
    title.textContent = `${latestFeature[0].datetime}`;
    const previous = document.getElementById('previous');
    previous.setAttribute('data-position', 1);
    const next = document.getElementById('next');
    next.setAttribute('data-position', -1);
  }
}

addLatestOverlay(imageCollection);

const previousBtn = document.getElementById('previous');
previousBtn.addEventListener('click', (event) => {
  const positionString = event.currentTarget.dataset.position;
  const position = parseInt(positionString); // Convert the string to an integer
  const featuresLastPosition = imageCollection.length - 1;
  console.log("last position " + featuresLastPosition);
  console.log("features length " + imageCollection.length);
  if (position <= featuresLastPosition) {
    imageOverlay.remove();

    imageOverlay = L.tileLayer(imageCollection[position].pngURL, { tms: true, maxZoom: 25, maxNativeZoom: imageCollection[position].maxNativeZoom, attribution: "" }).addTo(map);
    const title = document.getElementById('nameFeature');
    title.textContent = `${imageCollection[position].datetime}`;

    const positionPrevious = position + 1;
    const positionNext = position - 1;

    const previous = document.getElementById('previous');
    previous.setAttribute('data-position', positionPrevious);

    const next = document.getElementById('next');
    next.setAttribute('data-position', positionNext);
  } else {
    console.log("do nothing");
  }
});

const nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', (event) => {
  const positionString = event.currentTarget.dataset.position;
  const position = parseInt(positionString); // Convert the string to an integer
  if (position >= 0) {
    imageOverlay.remove();

    imageOverlay = L.tileLayer(imageCollection[position].pngURL, { tms: true, maxZoom: 25, maxNativeZoom: imageCollection[position].maxNativeZoom, attribution: "" }).addTo(map);
    const title = document.getElementById('nameFeature');
    title.textContent = `${imageCollection[position].datetime}`;

    const positionPrevious = position + 1;
    const positionNext = position - 1;

    const previous = document.getElementById('previous');
    previous.setAttribute('data-position', positionPrevious);

    const next = document.getElementById('next');
    next.setAttribute('data-position', positionNext);
  } else {
    console.log("do nothing");
  }
});