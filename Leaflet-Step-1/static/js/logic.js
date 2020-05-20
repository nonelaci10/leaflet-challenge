//Create Map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap);

// Loading API and GEOJSON Data
var geoDataoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Marker Coloring or ColorSet
function markerColors(magnitude){
    if (magnitude > 5) {
        var color = "red";
    }
    else if (magnitude > 4) {
        var color = "orange";
    }
    else if (magnitude > 3) {
        var color = "yelloworange";
    }
    else if (magnitude > 2) {
        var color = "yellow";
    }
    else if (magnitude > 1) {
        var color = "yellowgreen";
    }
    else {
        var color = "limegreen";
    }
    return color;
}

// Setting Marker Sizing


// Performing the GET response/call




