// //Map Options
var mapOptions2 = {
    zoom: 13,
    zoomControl: false,
    attributionControl: false,
    
  };

//   //Render Main Map
  
var map2 = L.map('map2', mapOptions2).setView([49.69131152290053, -124.99368134388499], 13);


var scale2 = L.control.scale({position:"topright"}).addTo(map2);
  
  // Define the bounds for Canada
  var bounds2 = [
    [49.61724722230896, -125.1627224643956], // Southwest coordinates
    [49.75031106093214, -124.73522915196966]    // Northeast coordinates
  ];
  // // Set the bounds of the map to Canada
  // map2.fitBounds(bounds2);
 

var mouseCoordinatesBox2 = L.control({ position: 'topright' });
mouseCoordinatesBox2.onAdd = function () {
    this._div = L.DomUtil.create('div', 'mouse-coordinates-box2');
    this.update();
    return this._div;
};

mouseCoordinatesBox2.update = function (latlng) {
    this._div.innerHTML = latlng ? 'Lat: ' + latlng.lat.toFixed(5) + '<br>Lng: ' + latlng.lng.toFixed(5) : '';
};

mouseCoordinatesBox2.addTo(map2);

map.on('mousemove', function (e) {
    mouseCoordinatesBox2.update(e.latlng);
});

L.Control.CustomButton = L.Control.extend({
  options: {
    position: 'topleft'
  },

  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'custom-button-control');
    container.innerHTML = '<button id="customButton" title="Calibrate"><i class="fas fa-sync"></i></button>';
    
    L.DomEvent.on(container, 'click', function() {
      map2.invalidateSize(false);
    });

    return container;
  }
});

var customButton = new L.Control.CustomButton();
map2.addControl(customButton);



