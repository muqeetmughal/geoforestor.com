//Map Options
var mapOptions = {
    zoomControl: false,
    attributionControl: false,
  };

  //Render Main Map
  
  var map = L.map('map', mapOptions).setView([49.68648609030914, -124.98800356842885], 13);

  var scale = L.control.scale({position:"topright"}).addTo(map);
  
  // // Define the bounds for Canada
  var bounds = [
    [49.61724722230896, -125.1627224643956], // Southwest coordinates
    [49.75031106093214, -124.73522915196966]    // Northeast coordinates
  ];
  // // Set the bounds of the map to Canada
  // map.fitBounds(bounds);
 

var mouseCoordinatesBox = L.control({ position: 'topright' });
mouseCoordinatesBox.onAdd = function () {
    this._div = L.DomUtil.create('div', 'mouse-coordinates-box');
    this.update();
    return this._div;
};

mouseCoordinatesBox.update = function (latlng) {
    this._div.innerHTML = latlng ? 'Lat: ' + latlng.lat.toFixed(5) + '<br>Lng: ' + latlng.lng.toFixed(5) : '';
};

mouseCoordinatesBox.addTo(map);

map.on('mousemove', function (e) {
    mouseCoordinatesBox.update(e.latlng);
});