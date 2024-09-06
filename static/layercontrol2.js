var LayerControl2 = L.control.layers(null, null, {
    position: "topleft",
    collapsed: true
  }).addTo(map2);



//Layers Map2

var roads2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'roads',
    overlay:true,
    name: 'Roads',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var block2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'block',
    overlay:true,
    name: 'Blocks',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var bridges2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'bridges',
    overlay:true,
    name: 'Bridges',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var carto_lines2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'carto_lines',
    overlay:true,
    name: 'Carto Lines',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var carto_points2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'carto_points',
    overlay:true,
    name: 'Carto Points',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var culverts2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'culverts',
    overlay:true,
    name: 'Culverts',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

  var falling_corners2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'falling_corners',
    overlay:true,
    name: 'Falling Corners',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

var ftenroads2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'ften_roads',
    overlay:true,
    name: 'FTEN Roads',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

var visuallandscape2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
    layers: 'visual_landscape_inventory',
    overlay:true,
    name: 'Visual Landscape Inventory',
    maxZoom:24,
    format: 'image/png',
    transparent: true,
    attribution: 'Map data ©',
  });

var constraints2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
  layers: 'Constraints',
  overlay:true,
  name: 'Constrasints',
  maxZoom:24,
  format: 'image/png',
  transparent: true,
  attribution: 'Map data ©',
});

var beczones2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
  layers: 'BECzones',
  overlay:true,
  name: 'BEC Zones',
  maxZoom:24,
  format: 'image/png',
  transparent: true,
  attribution: 'Map data ©',
});

var resultsreserves2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
  layers: 'results_reserves',
  overlay:true,
  name: 'Results Reserves',
  maxZoom:24,
  format: 'image/png',
  transparent: true,
  attribution: 'Map data ©',
});

var indianreserves2 =  L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', {
  layers: 'indian_reserves',
  overlay:true,
  name: 'Indian Reserves',
  maxZoom:24,
  format: 'image/png',
  transparent: true,
  attribution: 'Map data ©',
});


//Editable Layers
LayerControl2.addOverlay(block2, 'block');
LayerControl2.addOverlay(bridges2, 'bridges');
LayerControl2.addOverlay(carto_lines2, 'carto lines');
LayerControl2.addOverlay(carto_points2, 'carto points');
LayerControl2.addOverlay(culverts2, 'culverts');
LayerControl2.addOverlay(falling_corners2, 'falling corners');
LayerControl2.addOverlay(roads2, 'roads');

//Background Layers
LayerControl2.addOverlay(ftenroads2, 'FTEN Roads');
LayerControl2.addOverlay(visuallandscape2, 'Visual Landscape Inventory');
LayerControl2.addOverlay(beczones2, 'BEC Zones');
LayerControl2.addOverlay(constraints2, 'Constraints');
LayerControl2.addOverlay(resultsreserves2, 'Results Reserves');
LayerControl2.addOverlay(indianreserves2, 'Indian Reserves');

