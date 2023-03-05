// data URL: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson

// Create a map object.
var myMap = L.map("map", {
    center: [34.00, 39.00],
    zoom: 2,
    zoomSnap: 0.25
  });

  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Create an overlays object to add to the layer control.
  var layers = {
    "Magnitude": new L.LayerGroup()
  };

// Create a legend to display information about our map.
var legend = L.control({
  position: "bottomright"
});


// Perform an API call to the earthquake endpoint
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data 
d3.json(url).then(function (data) {
    //console log the json data
    let features = data.features;
    console.log('features', features);
    //loop through the data
    features.forEach(function(feature) {
        //log each earthquake's features
        console.log('feature', feature);
        //for the colors, set to 0 if subtracting the coordinate from 255 is negative
        let value = (255 - Math.floor(feature.geometry.coordinates[2]));
        if (value < 0) {
            value = 0;
        }
        //convert hex to string
        let hex = value.toString(16);
        //log the calculated hex value
        console.log('hex', hex);
        //
        let color = `${hex}${hex}${hex}`;
        //log the color
        console.log('color' , color);
        //add the circles to the map; 
        //the coordinates are served as LONG LAT
        //so add those in the proper order
        var circle = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            //border is green
            color: 'green',
            //fillColor is the calculated color bewtween white and black
            fillColor: '#'+color,
            fillOpacity: 0.75,
            //do some math on the radius so that it's easier
            //to see which quakes are larger
            radius: Math.pow(feature.properties.mag, 6)*4   
        }).addTo(myMap);
    
    });
});