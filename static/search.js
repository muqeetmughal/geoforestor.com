//Search Filter


// var originalParamsblock = block.options; 

// function handleFormSubmitSearch(event) {
//     event.preventDefault();

//     // Get the input value from the form
//     var inputValue = document.getElementById("search-input").value;

//     // Assign the input value to a variable
//     var searchString = inputValue;

//     if (searchString) {
//     var cqlFilterExpression = searchString;
  
//     var queriedLayer = L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', Object.assign({}, originalParamsblock, { cql_filter: cqlFilterExpression }));

//     map.removeLayer(block);
//     layerControl.removeLayer(block);

//     // Add the queried layer to the layer control and map
//     block = queriedLayer.addTo(map);
//     layerControl.addOverlay(block, 'Blocks');

//     // layer order 
//     block.setZIndex(5);

//     // Fetch the bounds of the queried layer
//     var boundsUrl = 'http://localhost:8080/geoserver/geoforester/wms' +
//       '?service=WFS' +
//       '&version=1.0.0' +
//       '&request=GetFeature' +
//       '&typeName=block' +
//       '&outputFormat=application/json' +
//       '&cql_filter=' + encodeURIComponent(cqlFilterExpression);
 
//     $.ajax({
//       url: boundsUrl,
//       dataType: 'json',
//       success: function (data) {
//         var bounds = L.geoJSON(data).getBounds();
//         map.fitBounds(bounds);
//       },
//       error: function (error) {
//         console.error('Error fetching queried layer bounds:', error);
//       }
//     });
//   } else {

//     map.removeLayer(block);
//     layerControl.removeLayer(block);
//     block = L.tileLayer.wms('http://localhost:8080/geoserver/geoforester/wms', originalParamsblock).addTo(map);
//     layerControl.addOverlay(block, 'Block');

//     //layer order
//     block.setZIndex(5);
//   }

//   }


function handleFormSubmitSearch(event) {
    event.preventDefault();

    // Get the selected layer from the form
    var selectedLayer = document.getElementById("searchSelect").value;

    // Get the input value from the form
    var inputValue = document.getElementById("search-input").value;

    var originalParams = Object.assign({}, window[selectedLayer].options);

    // Create new layer parameters with the CQL filter if there is an input value
    if (inputValue !== "") {
        originalParams.cql_filter = inputValue;
    } else {
        if('cql_filter' in originalParams) {
            delete originalParams.cql_filter;
        }
    }

    var queriedLayer = L.tileLayer.wms(`http://localhost:8080/geoserver/geoforester/wms`, originalParams);

    map.removeLayer(window[selectedLayer]);
    editableLayerControl.removeLayer(window[selectedLayer]);

    // Add the queried layer to the layer control and map
    window[selectedLayer] = queriedLayer.addTo(map);
    editableLayerControl.addOverlay(window[selectedLayer], selectedLayer);

    // layer order 
    window[selectedLayer].setZIndex(5);

    // Only fetch the bounds of the queried layer if there is an input value
    if (inputValue !== "") {
        var boundsUrl = `http://localhost:8080/geoserver/geoforester/wms?service=WFS&version=1.0.0&request=GetFeature&typeName=${selectedLayer}&outputFormat=application/json&cql_filter=` + encodeURIComponent(inputValue) + `&srsName=EPSG:4326`;
        $.ajax({
          url: boundsUrl,
          dataType: 'json',
          success: function (data) {
            var bounds = L.geoJSON(data).getBounds();
            window[selectedLayer].once('load', function() {
              map.fitBounds(bounds);
            });
          },
          error: function (error) {
            console.error('Error fetching queried layer bounds:', error);
          }
        });
    }
}
