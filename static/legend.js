
function updateLegend() {
    // Clear the legend container
    $('#legendContainer').empty();
    
    // Iterate over the active layer names
    activeLayerNamesArray.forEach(function(layerName) {
      
    
      // console.log(activeLayerNamesArray)
  
  
  
      // Create the legend URL for the current layer
      var legendUrl = "http://localhost:8080/geoserver/geoforester/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + layerName;
            
  
      // Fetch the legend image for the current layer
      $.ajax({
        url: legendUrl,
        type: 'GET',
        dataType: 'text',
        success: function (data) {
          // Create an image element and set its source to the legend image
          var legendImage = document.createElement('img');
          legendImage.src = legendUrl;
          legendImage.classList.add('legend-image')
          var layerLabel = document.createElement('p');
           layerLabel.textContent = layerName;
           layerLabel.classList.add('legend-label');
          // Append the image to the legend container div
          $('#legendContainer').append(layerLabel);
          $('#legendContainer').append(legendImage);
        },
        error: function (xhr, status, error) {
          console.log(error);
        }
      });
    });
  }
  
  function addActiveLayer(layer) {
    if (layer.options.layers) {
      activeLayerNamesArray.push(layer.options.layers);
      updateLegend();
    }
  }
  
  function removeActiveLayer(layer) {
    if (layer.options.layers) {
      var index = activeLayerNamesArray.indexOf(layer.options.layers);
      if (index !== -1) {
        activeLayerNamesArray.splice(index, 1);
        updateLegend();
      }
    }
  }
  
  // Bind event listeners for layer add and remove events
  map.on('layeradd', function(event) {
    var layer = event.layer;
    addActiveLayer(layer);
  });
  
  map.on('layerremove', function(event) {
    var layer = event.layer;
    removeActiveLayer(layer);
  });
  
  var activeLayerNamesArray = [];
  
  
  // Iterate over existing layers and store the layer names
  map.eachLayer(function(layer) {
    if (layer instanceof L.TileLayer.WMS) {
      activeLayerNamesArray.push(layer.options.layers);
    }
  });
  
  // Update the legend based on the initial active layers
  updateLegend();