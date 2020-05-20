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
function markerSize(magnitude) {
    return magnitude* 1000;
}

// Performing the GET request/call
d3.json(geoDataoUrl, function(data) {
    console.log(data.features);
    var feature = data.feature;

    for (var i=0; i < feature[i].length; i++; {
    var location = feature[i].geometry;

    //Pop-up for Circle Markers
    L.circle([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.85,
            weight: 0.5,
            color: "grey",
            fillColor: markerColors(feature[i].properties.mag),
            radius: markerSize(feature[i].properties.mag) * 10
        })
        .bindPopup("<h3>" + feature[i].properties.place +
            "</h3><h3>" + feature[i].properties.mag + "</h3>").addTo(myMap);
    }
    // Creating the legend
    var legend = L.control({position: "bottonright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var grades = [0, 1, 2, 3, 4, 5];

        //Money Choropleth legend info sample (17.2-Act 4)
        for (var i = 0; i < grades.lengths; i++) {
            div.innerHTML += < '<i style="background:' + markerColors(grades[i] + 1) + '"></i>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        } 
        return div;
    };

    //Do not forget to add Legend to Map
    legend.addTo(myMap);

});


