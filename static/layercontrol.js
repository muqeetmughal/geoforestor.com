

var editableLayerControl = L.control.layers(null, null, {
  position: "topleft",
  collapsed: false
}).addTo(map);

var backgroundLayerControl = L.control.layers(null, null, {
  position: "topleft",
  collapsed: false
}).addTo(map);
  
  //Layers

  var roads =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'roads',
    overlay:true,
    name: 'Roads',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var block =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'block',
    overlay:true,
    name: 'Blocks',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var bridges =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'bridges',
    overlay:true,
    name: 'Bridges',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var carto_lines =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'carto_lines',
    overlay:true,
    name: 'Carto Lines',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var carto_points =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'carto_points',
    overlay:true,
    name: 'Carto Points',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var culverts =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'culverts',
    overlay:true,
    name: 'Culverts',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var falling_corners =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'falling_corners',
    overlay:true,
    name: 'Falling Corners',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

var ftenroads =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'ften_roads',
    overlay:true,
    name: 'FTEN Roads',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

var visuallandscape =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'visual_landscape_inventory',
    overlay:true,
    name: 'Visual Landscape Inventory',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

var constraints =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
  layers: 'Constraints',
  overlay:true,
  name: 'Constrasints',
  maxZoom:24,
  format: 'image/png',
  transparent: true,
  attribution: 'Map data ©',
});

var beczones=  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
  layers: 'BECzones',
  overlay:true,
  name: 'BEC Zones',
  maxZoom:24,
  format: 'image/png',
  transparent: true,
  attribution: 'Map data ©',
});

var resultsreserves=  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
  layers: 'results_reserves',
  overlay:true,
  name: 'Results Reserves',
  maxZoom:24,
  format: 'image/png',
  transparent: true,
  attribution: 'Map data ©',
});

var indianreserves=  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
  layers: 'indian_reserves',
  overlay:true,
  name: 'Indian Reserves',
  maxZoom:24,
  format: 'image/png',
  transparent: true,
  attribution: 'Map data ©',
});


//Editable Layers
editableLayerControl.addOverlay(block, 'block');
editableLayerControl.addOverlay(bridges, 'bridges');
editableLayerControl.addOverlay(carto_lines, 'carto lines');
editableLayerControl.addOverlay(carto_points, 'carto points');
editableLayerControl.addOverlay(culverts, 'culverts');
editableLayerControl.addOverlay(falling_corners, 'falling corners');
editableLayerControl.addOverlay(roads, 'roads');

//Background Layers
backgroundLayerControl.addOverlay(ftenroads, 'FTEN Roads');
backgroundLayerControl.addOverlay(visuallandscape, 'Visual Landscape Inventory');
backgroundLayerControl.addOverlay(beczones, 'BEC Zones');
backgroundLayerControl.addOverlay(constraints, 'Constraints');
backgroundLayerControl.addOverlay(resultsreserves, 'Results Reserves');
backgroundLayerControl.addOverlay(indianreserves, 'Indian Reserves');

// Append layer controls to a specific divs
var oldEditableLayerControl = editableLayerControl.getContainer();
var oldBackgroundLayerControl = backgroundLayerControl.getContainer();

var editableLayerControlDiv = document.getElementById("editableLayerControl");  // Replace with your div's id
var backgroundLayerControlDiv = document.getElementById("backgroundLayerControl");  // Replace with your div's id

// Create titles for layer controls
var editableTitle = document.createElement("h4");
editableTitle.innerHTML = "Editable Layers";
editableTitle.style.marginBottom = "5px";
editableTitle.style.marginTop = "10px";
editableTitle.style.color = "#08a159"
editableLayerControlDiv.appendChild(editableTitle);
editableLayerControlDiv.appendChild(oldEditableLayerControl);

var backgroundTitle = document.createElement("h4");
backgroundTitle.innerHTML = "Background Layers";
backgroundTitle.style.marginBottom = "5px";
backgroundTitle.style.marginTop = "100px";
backgroundTitle.style.color = "#08a159"
backgroundLayerControlDiv.appendChild(backgroundTitle);
backgroundLayerControlDiv.appendChild(oldBackgroundLayerControl);


