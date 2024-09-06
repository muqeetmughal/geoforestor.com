
// var wfst = new L.WFST({
//   url: 'http://localhost:8080/geoserver/geoforester/ows',
//   typeNS: 'geoforester',
//   typeName: 'roads',
//   geometryField: 'geom',
//   forceMulti: true,
//   style: {
//     color: 'red',
//     weight: 4
//   }
// });



// var wfst;

// document.getElementById('layerSelect').addEventListener('change', function(e) {
//   var selectedLayer = e.target.value; // Get the value of the selected option

//   if (wfst) {
//     // If a layer is currently selected, remove it
//     map.removeLayer(wfst);
//   }

//   wfst = new L.WFST({
//     url: 'http://localhost:8080/geoserver/geoforester/ows',
//     typeNS: 'geoforester',
//     typeName: selectedLayer,
//     geometryField: 'geom',
//     forceMulti: true,
//     style: {
//       color: 'red',
//       weight: 4
//     }
//   });

//   wfst.addTo(map);

  
// });

// function generateTableHTML(properties, propertiesToShow) {
//   var tableHTML = '<table class="attribute-table">';
//   tableHTML += '<tr><th>Attribute</th><th>Value</th></tr>';

//   propertiesToShow.forEach(function(prop) {
//     var value = properties[prop] !== null && properties[prop] !== undefined ? properties[prop] : ''; // Handle null or undefined values
//     var contentEditable = prop === 'gid' ? 'contenteditable="false"' : 'contenteditable="true"';

//     tableHTML += '<tr><td data-attribute="' + prop + '">' + prop + '</td><td ' + contentEditable + '>' + value + '</td></tr>';
//   });

//   tableHTML += '</table>';
//   return tableHTML;
// }

// // Function to create a WFS-T request based on the edited feature
// function createWFSTRequest(feature) {
//   var typeName = 'geoforester:roads'; // Replace with your GeoServer workspace and layer name
//   var fidValue =  feature.properties['gid']; // Assuming 'gid' is the feature ID

//   var xml = '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" xmlns:geoforester="geoforester">';
//   xml += '<wfs:Update typeName="' + typeName + '">';

//   for (var prop in feature.properties) {
//     if (feature.properties.hasOwnProperty(prop)) {
//       var value = feature.properties[prop];
//       xml += '<wfs:Property>';
//       xml += '<wfs:Name>' + prop + '</wfs:Name>';
//       xml += '<wfs:Value>' + value + '</wfs:Value>';
//       xml += '</wfs:Property>';
//     }
//   }

//   xml += '<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">';
//   xml += '<ogc:FeatureId fid="' + fidValue + '"/>';
//   xml += '</ogc:Filter>';
//   xml += '</wfs:Update>';
//   xml += '</wfs:Transaction>';

//   return xml;
// }


// // Event listener for showing attributes in an editable table when a feature is clicked
// wfst.on('click', function (e) {
//   var layer = e.layer;
//   var properties = layer.feature.properties;
//   var propertiesToShow = ['gid', 'name', 'highway', 'railway', 'waterway'];
  
//   var tableHTML = generateTableHTML(properties, propertiesToShow);

//   // Show the table in a popup with a Save button
//   var popupContent = tableHTML + '<br><button class="save-button" onclick="saveEdits(this)">Save</button>';
//   layer.bindPopup(popupContent, { className: 'custom-popup-style' }).openPopup();
// });

// function saveEdits(button) {

//   var popup = button.closest('.leaflet-popup-content');
//   var rows = popup.querySelectorAll('tr:not(:first-child)'); // Exclude the header row
//   var editedData = {};

//   // Extract edited data from the table
//   rows.forEach(function (row) {
//     var cells = row.querySelectorAll('td');
//     var attribute = cells[0].getAttribute('data-attribute'); // Get the attribute name from the data-attribute attribute
//     var value = cells[1].innerText;
//     editedData[attribute] = value;
//   });

//   // Update the layer's feature properties with the edited data
//   var layer = wfst.getLayers()[0]; 
//   layer.feature.properties = editedData;

//   // Create the WFS-T request XML payload
//   var wfsTRequest = createWFSTRequest(layer.feature);



//   // Send the WFS-T request to GeoServer using AJAX 
//   $.ajax({
//     type: 'POST',
//     url: 'http://localhost:8080/geoserver/wfs',
//     data: wfsTRequest,
//     contentType: 'text/xml',
//     success: function (data) {
//       // Success callback
//       console.log('WFS-T request sent successfully:', data);
//       alert('Save successful!')
      
//     },
//     error: function (error) {
//       // Error callback
//       console.error('Error sending WFS-T request:', error);
//       alert('Save Unsuccessful!')
//     }
//   });

 
// }





// // wfst.once('load', function () {
// //     // Wait for the WFST layer to load completely before fitting the map to its bounds
// //     map.fitBounds(wfst.getBounds());
// // });

// // layerControl.addOverlay(wfst, 'WFST');


//     ////// draw and edit

//     var drawControl = new L.Control.Draw({ 
//     position:'topright',
//     draw:{circle:false, circlemarker:false, rectangle:false,
//           },
//     edit:{featureGroup: wfst } });

// map.addControl(drawControl);

// map.on('draw:created', function (e) {
//     var layer = e.layer;
//     wfst.addLayer(layer)});

// map.on('draw:edited', function (e) {
//     var layers = e.layers;
//     layers.eachLayer( function (layer) {
//         wfst.editLayer(layer);
//         })
        
//         });
    
//     // Save button

//     var savebutton = L.easyButton({
//         position: 'topright',
//         states: [
//           {
//             icon: '<i class="fas fa-save mt-2" style="color: white;"></i>',
//             title: 'Save changes',
//             onClick: function () {
//                 alert('Save successful!')
//                 wfst.save();
//             },
//           },
//         ],
//       }).addTo(map);
      
      

var wfst;
var geoserverURL = 'http://localhost:8080/geoserver';
var workspaceName = 'geoforester';
var featureIDFieldName = 'gid';
var featureGroup = L.featureGroup().addTo(map);

document.getElementById('layerSelect').addEventListener('change', function(e) {

  var selectedLayer = e.target.value; // Get the value of the selected option

  if (selectedLayer === '') {
    if(wfst) {
      toggleDrawToolbar();
    }
    return;
  }

  if (wfst) {
    map.removeLayer(wfst);
    wfst.off('click'); 
    if ($(".leaflet-pm-toolbar").is(":visible")) {
      toggleDrawToolbar();
    }
    featureGroup.clearLayers();
  }

  wfst = new L.WFST({
    url: geoserverURL + '/' + workspaceName + '/ows',
    typeNS: workspaceName,
    typeName: selectedLayer,
    geometryField: 'geom',
    forceMulti: true,
    opacity: 0.8,
    fillOpacity: 0.5,
    style: {
      color: 'red',
      weight: 4
    }
  });



  wfst.on('load', function() {
    featureGroup.addLayer(wfst); 
  });

  wfst.addTo(map);
  toggleDrawToolbar();


  var propertiesToShow = [];
getAttributeNames('geoforester', selectedLayer)
.then(attributes => {
  propertiesToShow = attributes.filter(attribute => attribute !== 'geom'); //not including geom
  propertiesToShow.pop(); //remove last property due to issue

})
.catch(error => console.error(error));


wfst.on('click', function (e) {

   
    var layer = e.layer;
    var properties = layer.feature.properties;
    var tableHTML = generateTableHTML(properties, propertiesToShow);
    var popupContent = tableHTML + '<br><button class="save-button" onclick="saveEdits(this)">Save</button>';
    layer.bindPopup(popupContent, { className: 'custom-popup-style' }).openPopup();
  });
});


// function generateTableHTML(properties, propertiesToShow) {
//   var tableHTML = '<table class="attribute-table">';
//   tableHTML += '<tr><th>Attribute</th><th>Value</th></tr>';

//   propertiesToShow.forEach(function(prop) {
//     var value = properties[prop] !== null && properties[prop] !== undefined ? properties[prop] : '';
//     var contentEditable = prop === featureIDFieldName ? 'contenteditable="false"' : 'contenteditable="true"';

//     tableHTML += '<tr><td data-attribute="' + prop + '">' + prop + '</td><td ' + contentEditable + '>' + value + '</td></tr>';
//   });

//   tableHTML += '</table>';
//   return tableHTML;
// }

function generateTableHTML(properties, propertiesToShow) {
  var tableHTML = '<table class="attribute-table">';
  tableHTML += '<tr><th>Attribute</th>';

  propertiesToShow.forEach(function(prop) {
    tableHTML += '<th>' + prop + '</th>';
  });

  tableHTML += '</tr>';

  tableHTML += '<tr><td>Value</td>';

  propertiesToShow.forEach(function(prop) {
    var value = properties[prop] !== null && properties[prop] !== undefined ? properties[prop] : '';
    var contentEditable = prop === featureIDFieldName ? 'contenteditable="false"' : 'contenteditable="true"';

    tableHTML += '<td ' + contentEditable + '>' + value + '</td>';
  });

  tableHTML += '</tr></table>';

  return tableHTML;
}

function createWFSTRequest(feature, typeName) {
  
  var fidValue = feature.properties[featureIDFieldName];

  var xml = '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" xmlns:' + workspaceName + '="' + workspaceName + '">';
  xml += '<wfs:Update typeName="' + 'geoforester:'+ typeName + '">';

  for (var prop in feature.properties) {
    if (feature.properties.hasOwnProperty(prop)) {
      var value = feature.properties[prop];
      xml += '<wfs:Property>';
      xml += '<wfs:Name>' + prop + '</wfs:Name>';
      xml += '<wfs:Value>' + value + '</wfs:Value>';
      xml += '</wfs:Property>';
    }
  }

  xml += '<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">';
  xml += '<ogc:FeatureId fid="' + fidValue + '"/>';
  xml += '</ogc:Filter>';
  xml += '</wfs:Update>';
  xml += '</wfs:Transaction>';

  return xml;
}

function saveEdits(button) {
  var popup = button.closest('.leaflet-popup-content');
  var headers = popup.querySelectorAll('tr:first-child th:not(:first-child)');
  var values = popup.querySelectorAll('tr:nth-child(2) td:not(:first-child)');
  var editedData = {};

  headers.forEach(function (header, index) {
    var attribute = header.innerText;
    var value = values[index].innerText;
    editedData[attribute] = value;
  });

  var layer = wfst.getLayers()[0];
  layer.feature.properties = editedData;

  var wfsTRequest = createWFSTRequest(layer.feature, wfst.options.typeName);

  $.ajax({
    type: 'POST',
    url: geoserverURL + '/wfs',
    data: wfsTRequest,
    contentType: 'text/xml',
    success: function (data) {
      console.log('WFS-T request sent successfully:', data);
      alert('Save successful!')
    },
    error: function (error) {
      console.error('Error sending WFS-T request:', error);
      alert('Save Unsuccessful!')
    }
  });
}


// function saveEdits(button) {
//   var popup = button.closest('.leaflet-popup-content');
//   var rows = popup.querySelectorAll('tr:not(:first-child)');
//   var editedData = {};

//   rows.forEach(function (row) {
//     var cells = row.querySelectorAll('td');
//     var attribute = cells[0].getAttribute('data-attribute');
//     var value = cells[1].innerText;
//     editedData[attribute] = value;
//   });

//   var layer = wfst.getLayers()[0];
//   layer.feature.properties = editedData;

//   var wfsTRequest = createWFSTRequest(layer.feature, wfst.options.typeName);

//   $.ajax({
//     type: 'POST',
//     url: geoserverURL + '/wfs',
//     data: wfsTRequest,
//     contentType: 'text/xml',
//     success: function (data) {
//       console.log('WFS-T request sent successfully:', data);
//       alert('Save successful!')
//     },
//     error: function (error) {
//       console.error('Error sending WFS-T request:', error);
//       alert('Save Unsuccessful!')
//     }
//   });
// }

map.pm.addControls({
  position: 'topright', // toolbar position
  drawCircle: false,
  drawCircleMarker: false,
  drawRectangle: false,
  drawText: false,
  rotateMode: false,
  cutPolygon: false,
  edit: true, // Enable edit mode
});


// On create event
map.on('pm:create', function(e) {
  var layer = e.layer;
  wfst.addLayer(layer);
});

// On edit event
map.on('pm:update', function(e) {

  var layer = e.layer;
  wfst.editLayer(layer);
});

// On delete event
map.on('pm:remove', function(e) {
  var layer = e.layer;
  var wfstLayer = wfst.getLayers().filter(wfstLayer => wfstLayer.feature.properties.gid === layer.feature.properties.gid)[0];
  if (wfstLayer) {
    wfst.removeLayer(wfstLayer);
  }
});

var savebutton = L.easyButton({
    className: 'save-button',
    position: 'topright',
    states: [
      {
        icon: '<i class="fas fa-save mt-2" style="color: white;"></i>',
        title: 'Save changes',
        onClick: function () {
            alert('Save successful!')
            wfst.save();
        },
      },
    ],
}).addTo(map);

function toggleDrawToolbar() {
  if (map.hasLayer(wfst)) {
      map.removeLayer(wfst);
    } else {
      map.addLayer(wfst);  
    }
  $(".leaflet-pm-toolbar").fadeToggle("fast", "linear");
  $(".leaflet-bar button").fadeToggle("fast", "linear");
  this.blur();
  return false;
}


async function getAttributeNames(workspace, layer) {
  const geoserverUrl = `http://localhost:8080/geoserver/${workspace}/wfs?service=wfs&version=2.0.0&request=DescribeFeatureType&typeName=${layer}`;
  let attributes = [];

  try {
    const response = await fetch(geoserverUrl);
    const text = await response.text();
    const schema = (new window.DOMParser()).parseFromString(text, "text/xml");

    const elements = schema.getElementsByTagName('xsd:element');
    for(let i=0; i<elements.length; i++) {
      attributes.push(elements[i].getAttribute('name'));
    }
    
    return attributes;
  } catch(error) {
    console.error('Error:', error);
  }
}


  
  