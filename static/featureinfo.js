

var wfs;
var geoserverURL = 'http://localhost:8080/geoserver';
var workspaceName = 'geoforester';
var featureGroup = L.featureGroup().addTo(map);


document.getElementById('layerInfoSelect').addEventListener('change', function(e) {

    var selectedLayer = e.target.value; // Get the value of the selected option
  
    if (selectedLayer === '') {
      if(wfs) {
        toggleLayer();
      }
      return;
    }
  
    if (wfs) {
      map.removeLayer(wfs);
      wfs.off('click'); 
      featureGroup.clearLayers();
    }
  
    wfs = new L.WFS({
      url: geoserverURL + '/' + workspaceName + '/ows',
      typeNS: workspaceName,
      typeName: selectedLayer,
      geometryField: 'geom',
      forceMulti: true,
      opacity: 0,
      fillOpacity: 0,
      style: {
        color: 'red',
        weight: 4
      }
    });
  
  
  
    wfs.on('load', function() {
      featureGroup.addLayer(wfs); 
    });
  
    wfs.addTo(map);
   
  
  
    var propertiesToShow = [];
  getAttributeNamesInfo('geoforester', selectedLayer)
  .then(attributes => {
    propertiesToShow = attributes.filter(attribute => attribute !== 'geom'); //not including geom
    propertiesToShow.pop(); //remove last property due to issue
  
  })
  .catch(error => console.error(error));
  
  
  wfs.on('click', function (e) {
  
     
      var layer = e.layer;
      var properties = layer.feature.properties;
      var tableHTML = generateInfoTableHTML(properties, propertiesToShow);
      var popupContent = tableHTML;
      layer.bindPopup(popupContent, { className: 'custom-popup-style' }).openPopup();
    });
  });


  function generateInfoTableHTML(properties, propertiesToShow) {
    var tableHTML = '<table class="attribute-table">';
    tableHTML += '<tr><th>Attribute</th>';
  
    propertiesToShow.forEach(function(prop) {
      tableHTML += '<th>' + prop + '</th>';
    });
  
    tableHTML += '</tr>';
  
    tableHTML += '<tr><td>Value</td>';
  
    propertiesToShow.forEach(function(prop) {
      var value = properties[prop] !== null && properties[prop] !== undefined ? properties[prop] : '';
      tableHTML += '<td>' + value + '</td>';
    });
  
    tableHTML += '</tr></table>';
  
    return tableHTML;
  }
  

  function toggleLayer() {
    
    if (map.hasLayer(wfs)) {
        map.removeLayer(wfs);
      } else {
        map.addLayer(wfs);  
      }
    return false;
  }

  
async function getAttributeNamesInfo(workspace, layer) {
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
  